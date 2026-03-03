import { useAuth } from "../hooks/useAuth"
import { ThreeDots } from "react-loader-spinner"
import { Navigate, Outlet } from "react-router-dom"

const Protected = () => {
  const { authInitialized,user } = useAuth()

  //Show loader while auth state is resolving
  if (!authInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      </div>
    )
  }

  //Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" />
  }

  //Render protected routes
  return <Outlet />
}

export default Protected