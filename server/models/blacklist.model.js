import mongoose from "mongoose";

const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,'Token is required']
    }
},{timestamps:true})

const blacklistToken=mongoose.model('blacklistToken',blacklistTokenSchema)

export default blacklistToken