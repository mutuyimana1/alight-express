import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import {hashPassword,comparePassword} from "../utils/passwordUtils.js"
import jwt from "jsonwebtoken"


class Controller{

   static signup =async(req,res)=>{
       const {fullName,email,password}=req.body
          try{
              const encryptedPassword = await hashPassword(password)
      const user=new User({fullName,email,password:encryptedPassword});
      
      const savedUser=await user.save();
      return res.status(201).json({
          success:true,
          message:"User created successfully",
          data:savedUser
      })
          }catch(error){
              console.log(error)
              return res.status(500).json({
                  success:false,
                  message:"Login Failed",
                  error:error.message
              })
          }
    }

    static login = async (req,res)=>{
        try {
            const user = await User.findOne({email:req.body.email})
            if(!user){
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success:false,
                    message:"Invalid email or password"
                })
            }else{
                
                const verfiedPassword = await comparePassword(req.body.password,user.password)
                if(!verfiedPassword){
                   return res.status(StatusCodes.UNAUTHORIZED).json({
                    success:false,
                    message:"Invalid email or password"
                }) 
                }else{
                    const userInfo={
                        id:user._id,
                        role:user.role
                    }
                
                    const token = jwt.sign(userInfo,process.env.SCRET_KEY,{expiresIn:'1d'})

                    return res.status(StatusCodes.OK).json({
                        success:true,
                        message:"Login successfuly",
                        token:token
                    })
                } 
            }
        } catch (error) {
             console.log(error)
              return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                  success:false,
                  message:"Failed to create user",
                  error:error.message
              })
        }
    }



    //get all users 

    static getAllUsers = async (req,res)=>{
         try{
        const users=await User.find();
        if(!users.length){
            return res.status(404).json({success:false,message:"no users found"})
        }
        return res.status(200).json({success:true,message:"users found successfully",data:users})
            }
            catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Failed to get users",error:error.message})
            }
    }

//get one user by id

    static getOneUser = async (req,res)=>{
            try{
        const user=await User.findById(req.params.id);
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        return res.status(200).json({success:true,message:"user found successfully",data:user})
            }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Failed to get user",error:error.message})
            }
    }

   //update user by id 

   static updateUser = async (req,res)=>{
     try{
    const user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!user){
        return res.status(404).json({success:false,message:"user not found"})
    }
    return res.status(200).json({success:true,message:"user updated successfuly",data:user})
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false,message:"Failed to update user",error:error.message  })
    
        }
   }

   static deleteUser= async (req,res) =>{
     try{
        const user=await User.findByIdAndDelete(req.params.id);
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        return res.status(200).json({success:true,message:"user deleted successfully",data:user})
    }catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:"Failed to delete user",error:error.message})
    }
   }
 
}
export default Controller

