import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import authRouter from './src/routes/authRoute.js';
import mongoose from 'mongoose';

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

app.use("/api/v1",authRouter)
