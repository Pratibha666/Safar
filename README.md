# 🌍 Safar - Personal Travel Diary (MERN Stack)

Safar is a full-stack MERN-based **personal travel diary application** where users can document their travel experiences. Users can write where they went, upload photos, add descriptions, and enhance their content using **AI-powered text generation**.

Safar also includes an **AI chatbot** that helps users discover destinations, get travel recommendations, and explore the best places to visit.

The project follows a clean **client–server architecture** with separate frontend and backend folders.

---

## ✨ Features

### 🧳 Travel Diary
- Create travel entries with destination details
- Upload travel photos
- Write personal travel descriptions 
- View and manage all travel memories

### 🤖 AI Capabilities
- AI-powered text generation for improving travel descriptions
- AI chatbot for travel suggestions and destination ideas

### 🔐 Authentication & Security
- User Signup, Login, and Logout
- JWT-based authentication
- Secure cookie handling
- Protected routes
- Forgot Password functionality using OTP verification
- Password reset via email OTP

### ✉️ Email Integration
- Email service using Brevo
- OTP-based email verification for password recovery

### 🎨 User Interface
- Clean, modern, and professional UI
- Designed for a smooth user experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Context API
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer (File Uploads)
- Cloudinary (Image Storage)
- Gemini AI
- Brevo (Email Service)

### Deployment & Tools
- Frontend Deployment: Vercel
- Backend Deployment: Render
- Database: MongoDB Atlas
- Version Control: Git & GitHub

---

## 📂 Project Structure

```
Safar/
│── README.md
│── .gitignore
│
│── client/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTravel.jsx
│   │   │   ├── ChatBot.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Protected.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Travel.jsx
│   │   │   └── VerifyForgotPassword.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   │
│   │   ├── services/
│   │   │   └── auth.api.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── auth.context.js
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   └── package.json
│
│── server/
│   ├── node_modules/
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   ├── forgotPasswordTemplate.js
│   │   ├── gemini.js
│   │   ├── generateOtp.js
│   │   └── sendEmail.js
│   │
│   ├── controllers/
│   │   ├── ai.controllers.js
│   │   ├── auth.controller.js
│   │   ├── password.controller.js
│   │   └── travel.controller.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   │
│   ├── models/
│   │   ├── blacklist.model.js
│   │   ├── travel.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── ai.routes.js
│   │   ├── auth.routes.js
│   │   ├── password.routes.js
│   │   └── travel.routes.js
│   │
│   ├── src/
│   │   └── app.js
│   │
│   ├── .env
│   ├── index.js
│   ├── package.json
│   └── test-list-models.js

```
---

## ⚙️ Installation & Setup

### 1️. Clone the Repository

```bash
git clone https://github.com/your-username/Safar.git
cd Safar
```

### 2️. Backend Setup

```bash
cd server
npm install
npm run dev
```
---

### Create a .env file inside the server folder:
```
PORT=8080
FRONTEND_URL=http://localhost:5173
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret 
GEMINI_API_KEY=your_gemini_api_key
ADMIN_EMAIL=your_email
APP_PASSWORD=your_app_password
BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_brevo_sender_email
BREVO_SENDER_NAME=Safar
```
---
### Create a .env file inside the client folder:
```
VITE_API_URL=your_vite_api_url
```
---

### 3️. Frontend Setup
```
cd client
npm install
npm run dev
```
---

### 🌐 Deployment
Frontend deployed on Vercel
Backend deployed on Render
Database hosted on MongoDB Atlas

All environment variables must be configured on the deployment platforms.

---

### 🔗 Live Application
https://safar-frontend-eta.vercel.app/

---

### Project Overview

Safar was built as a personal travel diary to combine full-stack development, secure authentication, AI-powered content generation, and clean project architecture. The project demonstrates real-world MERN stack usage with modern integrations like AI and email services.

---

## 👤 Author
Pratibha Yadav