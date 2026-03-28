import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8080;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
    process.exit(1);
  });