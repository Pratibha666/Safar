import jwt from 'jsonwebtoken'
import blacklistTokenModel from '../models/blacklist.model.js'
export const authenticateToken=async(req,res,next)=>{
    try {
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({message:'No token found'})
        }   
        const blacklistedToken=await blacklistTokenModel.findOne({token})
        if(blacklistedToken){
            return res.status(401).json({message:'Invalid token'})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.id
        next()
    } catch (error) {
        return res.status(401).json({message:'Invalid token',error:error.message})
    }
}