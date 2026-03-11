import express from "express";
import { forgotPassword, resetPassword, verifyForgotPassword } from "../controllers/password.controller.js";

const passwordRouter = express.Router();

passwordRouter.put("/forgot-password",forgotPassword);
passwordRouter.put("/verify-forgot-password",verifyForgotPassword)
passwordRouter.put("/reset-password",resetPassword)

export default passwordRouter