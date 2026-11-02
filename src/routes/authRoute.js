import express from "express";
import User from "../models/userModel.js";
const router=express.Router()

router.post("/signup",async(req,res)=>{
    try{
const user=new User(req.body);
// const existingUser=await User.findOne({email:req.body.email});
// if(existingUser){
//     return errorResponse(res,"User already exists",400)
// }
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
            message:"Failed to create user",
            error:error.message
        })
    }
}
)
//get all users 

router.get("/users",async(req,res)=>{
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
})

//get one user by id

router.get("/users/:id",async(req,res)=>{
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
})

//update user by id
router.patch("/users/:id",async(req,res)=>{
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
})

router.delete("/users/:id",async(req,res)=>{
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
})


export default router;

