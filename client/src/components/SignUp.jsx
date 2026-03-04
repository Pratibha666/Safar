import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Signup = () => {
  const {handleSignup}=useAuth()
  const [username,setUsername]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()


  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await handleSignup({username,email,password,confirmPassword})
      navigate("/travel")
    } catch (error) {
      console.log("error ",error)
      setLoading(false)
    }
  };

  
  
  return (
    <div className="w-full h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black overflow-hidden">
      
      {/* Back to Home */}
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="px-8 py-2 rounded-md bg-lime-400 hover:bg-lime-500 text-black font-bold shadow-md"
        >
            Back
        </Link>
      </div>

      <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            Safar
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Create your travel diary
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-lime-300 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder="you@safar.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-lime-300 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              placeholder="Create password"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-lime-300 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e)=>{setConfirmPassword(e.target.value)}}
              placeholder="Re-enter password"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-lime-300 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            onClick={(e) => loading && e.preventDefault()}
            className={`w-full py-3 rounded-xl font-semibold text-black bg-linear-to-r from-lime-400 via-lime-500 to-green-400 transition-all
              ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:from-lime-500 hover:to-green-500 "}`}
          >
            {loading ? "Please Wait..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="block text-center mt-4 text-sm text-zinc-400">
          Already have an account? <Link to='/login' className="text-lime-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;