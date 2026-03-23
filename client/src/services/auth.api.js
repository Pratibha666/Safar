import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL
const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
})
export const signup = async ({ username, email, password, confirmPassword }) => {
  try {
    const res = await api.post("/auth/signup", {
      username,
      email,
      password,
      confirmPassword,
    })
    return res.data
  } catch (error) {
    console.error("Signup API error:", error)
    throw error
  }
}

export const login = async ({ email, password }) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    })
    return res.data
  } catch (error) {
    console.error("Login API error:", error)
    throw error
  }
}

export const logout = async () => {
  try {
    const res = await api.post("/auth/logout")
    return res.data
  } catch (error) {
    throw error
  }
}

export const getMe = async () => {
  try {
    const res = await api.get("/auth/get-me")
    return res.data
  } catch (error) {
    console.error("GetMe API error:", error)
    throw error
  }
}