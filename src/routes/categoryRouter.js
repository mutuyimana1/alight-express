import express from "express"
import CategoryExist from "../middleware/categoryExist.js"
import CategoryController from "../controller/categoryController.js"

const CategoryRouter = express.Router()

CategoryRouter.post("/create",CategoryExist,CategoryController.createCategory)

export default CategoryRouter