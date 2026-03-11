import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendEmail = async ({ to, subject, html, text = '' }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Safar" <${process.env.ADMIN_EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; 
  }
};

export default sendEmail;