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
    },
    forgot_password_otp:{
        type: String,
    },
    forgot_password_expiry:{
        type: Date,
    },
},{timestamps:true})

export default mongoose.model("User",userSchema)