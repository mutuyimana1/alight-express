import express from "express"
import CategoryExist from "../middleware/categoryExist.js"
import CategoryController from "../controller/categoryController.js"

const CategoryRouter = express.Router()

CategoryRouter.post("/create",CategoryExist,CategoryController.createCategory)
CategoryRouter.get("/created",CategoryController.getCategory)
CategoryRouter.get("/get/:id",CategoryController.getOnecategory)
CategoryRouter.put("/update/:id",CategoryController.updateCategory)

export default CategoryRouter