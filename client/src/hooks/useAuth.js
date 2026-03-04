import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContext } from "../auth.context.jsx"
import { signup, login, logout, getMe } from "../services/auth.api.js"

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext)
  const [authInitialized, setAuthInitialized] = useState(false) // NEW
  const navigate = useNavigate()

  // LOGIN
  const handleLogin = async ({ email, password }) => {
    setLoading(true)
    try {
      const data = await login({ email, password })
      setUser(data?.user)
      toast.success(data?.message || "Login successful!")
      return data?.user
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Login failed"
      toast.error(errorMsg)
      console.error("Login error:", errorMsg)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // SIGNUP
  const handleSignup = async ({ username, email, password, confirmPassword }) => {
  setLoading(true)
  try {
    const data = await signup({ username, email, password, confirmPassword })
    setUser(data?.user)
    toast.success(data?.message || "Account created successfully!")
    return data?.user
  } catch (error) {
    const errorMsg =
      error.response?.data?.message || error.message || "Signup failed"

    toast.error(errorMsg)
    console.error("Signup error:", errorMsg)

    throw error  
  } finally {
    setLoading(false)
  }
}

  // LOGOUT
  const handleLogout = async () => {
    setLoading(true)
    try {
      const data = await logout()
      setUser(null)
      toast.success(data?.message || "Logout successful!")
      navigate("/")
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Logout failed"
      toast.error(errorMsg)
      console.error("Logout error:", errorMsg)
      setUser(null)
      navigate("/")
    } finally {
      setLoading(false)
    }
  }

  // AUTO LOGIN
  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe()
        setUser(data?.user)
      } catch (error) {
        setUser(null)
      } finally {
        setAuthInitialized(true) 
      }
    }
    getAndSetUser()
  }, [])

  return {
    user,
    loading,
    authInitialized, 
    handleLogin,
    handleSignup,
    handleLogout,
  }
}