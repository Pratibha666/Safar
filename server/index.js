import app from "./src/app.js";
import dotenv from "dotenv"
import connectDB from '../server/config/db.js'
dotenv.config()

const PORT=process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server listening on PORT ${PORT}`)
    })
})