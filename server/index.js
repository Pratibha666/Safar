import dotenv from "dotenv"
dotenv.config()
import app from "./src/app.js";
import connectDB from './config/db.js'

const PORT=process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server listening on PORT ${PORT}`)
    })
})