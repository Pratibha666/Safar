import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"Account already exists"],
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

export default mongoose.model("User",userSchema)