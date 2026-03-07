import mongoose from "mongoose"

const travelSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    imageurl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    public_id:{
        type:String
    }
},{timestamps:true})

export default mongoose.model("Travel",travelSchema)