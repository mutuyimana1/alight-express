import express from "express";
import Controller from "../controller/authController.js";
import userExist from "../middleware/existingUser.js";

const router=express.Router()

router.post("/signup",userExist,Controller.signup)
router.get("/users",Controller.getAllUsers)
router.get("/users/:id",Controller.getOneUser)
router.patch("/users/:id",Controller.updateUser)
router.delete("/users/:id",Controller.deleteUser)

export default router;

