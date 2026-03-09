import React from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './components/Login.jsx'
import Signup from './components/SignUp.jsx'
import Home from './components/Home.jsx'
import { AuthProvider } from './auth.context.jsx'
import Travel from './components/Travel.jsx'
import Protected from './components/Protected.jsx'
import AddTravel from './components/AddTravel.jsx'
import ChatBot from './components/chatBot.jsx'
const App = () => {
  return (
    <AuthProvider>
    <div className='min-h-screen bg-black'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<Protected />}>
            <Route path='/travel' element={
              <>
              <Travel />
              <ChatBot />
              </>
              } />
            <Route path='/add-travel' element={
              <>
              <AddTravel />
              <ChatBot />
              </>
              } />

        </Route>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
    </div>
    </AuthProvider>
  )
}

export default App