import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const db=process.env.DATABASE_URL

export const connectDb=async()=>{
    try{
await mongoose.connect(db);
console.log("Database connected successfully");  
}catch(error){
console.error("MongoDB Connection error:",error);
process.exit(1);
    }
}