import mongoose from "mongoose";

let isConnected=false;

export const dbConnect=async()=>{
    if(isConnected) return;

    if(!process.env.MONGO_URI){
        throw new Error("Missing MONGO_URI in .env")
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        isConnected=true
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
}