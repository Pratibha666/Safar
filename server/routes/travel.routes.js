import express from "express";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { createTravel, deleteTravel, getTravel } from "../controllers/travel.controller.js";
import upload from "../middlewares/multer.middleware.js";

const travelRouter = express.Router();

travelRouter.post("/add-travel",authenticateToken,upload.single("image"),createTravel);
travelRouter.get("/get-travel", authenticateToken, getTravel);
travelRouter.delete("/delete-travel/:id", authenticateToken, deleteTravel)
export default travelRouter;