import express from "express";
import { chatWithAI, generateEngagingStory } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/generate-story", generateEngagingStory);
aiRouter.post("/chat", chatWithAI);
export default aiRouter;