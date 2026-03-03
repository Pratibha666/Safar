import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const { handleLogin } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false) // <-- new state
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // start loading
    try {
      await handleLogin({ email, password })
      navigate("/travel")
    } catch (err) {
      console.log("error", err)
      setLoading(false) // stop loading if error
    }
  }

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center">
      <div className="absolute top-6 left-6">
        <Link
          to="/"
          className="px-8 py-2 rounded-md bg-lime-400 hover:bg-lime-500 text-black font-bold shadow-md"
        >
          Back
        </Link>
      </div>

      <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wide">Safar</h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Your personal travel diary
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-lime-300 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 text-lime-300 placeholder-zinc-500 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-lime-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            onClick={(e) => loading && e.preventDefault()}
            className={`w-full py-3 rounded-xl font-semibold text-black bg-linear-to-r from-lime-400 via-lime-500 to-green-400 transition-all
              ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:from-lime-500 hover:to-green-500 "}`}
          >
            {loading ? "Please Wait..." : "Enter Safar"}
          </button>
        </form>

        <p className="text-center text-zinc-500 text-xs mt-6">
          Start documenting your journeys with Safar!
        </p>

        <p className="text-center mt-4 text-sm text-zinc-400">
          New to Safar?{" "}
          <Link to="/signup" className="text-lime-400 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login