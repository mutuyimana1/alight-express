import express from "express"
import authRouter from "./authRoute.js"
import CategoryRouter from "./categoryRouter.js"

const router = express.Router()

router.use("/auth",authRouter)
router.use("/catogory",CategoryRouter)
export default router