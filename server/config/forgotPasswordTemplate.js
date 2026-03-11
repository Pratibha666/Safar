const forgotPasswordTemplate = ({ name, otp }) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #ffffff; color: #333333;">
      
      <h2 style="color: #555555; margin-bottom: 10px;">Hello, ${name}</h2>
      
      <p style="font-size: 16px; color: #555555;">
        You requested to reset your password for <strong>Safar</strong>. Use the OTP below to proceed:
      </p>
      
      <div style="
        margin: 25px 0; 
        padding: 20px; 
        background-color: #555555; 
        border: 2px dashed #a3ff00; 
        border-radius: 10px; 
        text-align: center; 
        font-size: 28px; 
        color: #a3ff00; 
        font-weight: bold;
        letter-spacing: 3px;
      ">
        ${otp}
      </div>
      
      <p style="font-size: 15px; color: #555555;">
        This OTP is valid for <strong>5 minutes</strong>. Enter it on the <strong>Safar</strong> website to reset your password.
      </p>

      <p style="font-size: 15px; color: #888888; margin-top: 30px;">
        Thank you,<br/>
        The Safar Team
      </p>

      <hr style="border-color: #dddddd; margin-top: 30px;" />
      <p style="font-size: 12px; color: #aaaaaa;">
        If you did not request this, please ignore this email.
      </p>
    </div>
  `;
};

export default forgotPasswordTemplate;