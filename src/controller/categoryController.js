import Category from "../models/categoryModel.js";
import { StatusCodes } from "http-status-codes";

class CategoryController{
  static createCategory = async(req,res)=>{
     try {
        const category = await Category.create(req.body)
        return res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Category succesfuly created",
            data:category
        })
     } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:`Error is ${error}`
        })
     }
  }
}
export default CategoryController