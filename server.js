import dotenv from 'dotenv';
dotenv.config();
import { connectDb } from './src/database/db.js';

import express from 'express';
import router from "./src/routes/index.js"
import { StatusCodes } from 'http-status-codes';

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Hello World')
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
connectDb();

app.use("/api/v1",router)

app.use((req,res)=>{
    res.status(StatusCodes.BAD_GATEWAY).json({
        success:false,
        message:"Router not found"
    })
})
