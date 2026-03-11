import forgotPasswordTemplate from "../config/forgotPasswordTemplate.js"
import generateOtp from "../config/generateOtp.js"
import sendEmail from "../config/sendEmail.js"
import userModel from "../models/user.model.js"
import bcryptjs from "bcryptjs"

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required", success: false });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found", success: false });

    const otp = generateOtp();
    const otpExpireTime = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await userModel.findByIdAndUpdate(user._id, {
      forgot_password_otp: otp,
      forgot_password_expiry: otpExpireTime,
    });

    await sendEmail({
      to: email,
      subject: "Safar - Forgot Password OTP",
      html: forgotPasswordTemplate({ name: user.username, otp }),
    });

    return res.status(200).json({ message: "OTP sent successfully !!", success: true });

  } catch (error) {
    console.error("Forgot Password Error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message, success: false });
  }
};

export const verifyForgotPassword = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // console.log("VERIFY OTP BODY:", req.body);
    if (!email || !otp) {
      return res.status(400).json({
        message: "Provide all the fields",
        error: true,
        success: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not available",
        error: true,
        success: false,
      });
    }
    if (!user.forgot_password_otp || !user.forgot_password_expiry) {
      return res.status(400).json({
      message: "OTP not requested! Please request OTP again.",
      success: false,
      }); 
    }
    
    if (new Date(user.forgot_password_expiry) < new Date()) {
      return res.status(400).json({
        message: "OTP is expired",
        error: true,
        success: false,
      });
    }

    if (String(otp).trim() !== String(user.forgot_password_otp).trim()) {
      return res.status(400).json({
        message: "Invalid OTP",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "OTP verified successfully",
      error: false,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
      success: false,
    });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Provide all the fields",
        error: true,
        success: false,
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and Confirm Password must be same",
        error: true,
        success: false,
      });
    }

    const hashPass = await bcryptjs.hash(password, 12);

    const update = await userModel.findOneAndUpdate(
      { email },
      { password: hashPass }
    );

    if (!update) {
      return res.status(400).json({
        message: "Couldn't update password",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Password updated successfully",
      error: false,
      success: true,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
      success: false,
    });
  }
};