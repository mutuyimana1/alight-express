import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/userModel.js"

dotenv.config()

function VerifyAccessToken (passRole) {

    return async(req,res,next)=>{
        try {
           const token = req.headers.authorization
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success:false,
                message:"Missing token"
            })
        }

        const decoded = await jwt.verify(token,process.env.SCRET_KEY)
         if(!decoded.id){
             return res.status(StatusCodes.UNAUTHORIZED).json({
                success:false,
                message:"Imvalid token"
            })
         } 

        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(StatusCodes.NOT_FOUND).json({
                success:false,
                message:"User not found"
            })
        }
        req.user = user
        req.token = token

        return next()
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.UNAUTHORIZED).json({

        success: false,
        message: "Invalid or expired token"
    });
        }
        
    }

}
export default VerifyAccessToken