import express from 'express'
import { getMe, loginUser, logoutUser, registerUser } from '../controllers/auth.controller.js'
import { authenticateToken } from '../middlewares/auth.middleware.js'

const authRouter=express.Router()

// Register route
authRouter.post('/signup',registerUser)

// Login route
authRouter.post('/login',loginUser)

// Logout route
authRouter.post('/logout',logoutUser)

// @get user details route
authRouter.get('/get-me',authenticateToken,getMe)

export default authRouter