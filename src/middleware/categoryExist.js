import { StatusCodes } from "http-status-codes";
import Category from "../models/categoryModel.js";

async function CategoryExist(req,res,next) {
    try {
        const category = await Category.findOne({categoryName:req.body.categoryName})
        if(category){
            return res.status(StatusCodes.CONFLICT).json({
                success:false,
                message:"category is already exist"
        })
        }
        return next()
    } catch (error) {
         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:`Error is ${error}`
        })
    }
} 

export default CategoryExist