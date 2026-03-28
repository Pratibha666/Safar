import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("error while connecting to mongoose ",error.message)
        throw error
    }
}

export default connectDB