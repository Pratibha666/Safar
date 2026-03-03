import userModel from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import blacklistTokenModel from '../models/blacklist.model.js'

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const registerUser=async(req,res)=>{
    try {
        const {username,email,password,confirmPassword}=req.body
    if(!username || !email || !password || !confirmPassword){
        return res.status(400).json({message:'All fields are required'})
    }
    const existingUser=await userModel.findOne({email})
    if(existingUser){
        return res.status(400).json({message:'Account already exists. Please login'})
    }
    if(password.length<8){
        return res.status(400).json({message:'Password must be at least 8 characters'})
    }
    if(password!==confirmPassword){
        return res.status(400).json({message:'Passwords do not match'})
    }
    const hashedPassword=await bcryptjs.hash(password,16)
    const newUser=new userModel({
        username,
        email,
        password:hashedPassword
    })
    await newUser.save()

    const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    res.cookie("token",token)
    return res.status(201).json({message:'User registered successfully',
        user:{
            id:newUser._id,
            username:newUser.username,
            email:newUser.email
    }
    })
    } catch (error) {
        return res.status(500).json({message:'Server error',error:error.message})   
    }
    
}

// @desc Login user and return JWT token
// @route POST /api/auth/login
// @access Public
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:'Invalid email or password'})
        }
        const isPasswordValid=await bcryptjs.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(400).json({message:'Invalid email or password'})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1h'})
        res.cookie("token",token)
        return res.status(200).json({message:'Login successful',
        user:{
            id:user._id,
            username:user.username,
            email:user.email
            }
        })
    }
    catch (error) {
        return res.status(500).json({message:'Server error',error:error.message})   
    }
}

// @desc Logout user by blacklisting the token
// @route POST /api/auth/logout
// @access Private
export const logoutUser=async(req,res)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(400).json({message:'No token found'})
        }
        blacklistTokenModel.create({token})
        res.clearCookie("token")
        return res.status(200).json({message:'Logout successful'})
    } catch (error) {
        return res.status(500).json({message:'Server error',error:error.message})
    }
}


// @desc Get user details
// @route GET /api/auth/get-me
// @access Private
export const getMe=async(req,res)=>{
    try {
        const user=await userModel.findById(req.userId).select('-password') 
        if(!user){
            return res.status(404).json({message:'User not found'})
        }
        return res.status(200).json({
            message:'User details fetched successfully',
            user:{
                id:user._id,
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        return res.status(500).json({message:'Server error',error:error.message})
    }
}
