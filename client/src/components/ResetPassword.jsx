import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const email = state?.email;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true)
      const { data } = await axios.put(
        "http://localhost:8080/api/password/reset-password",
        { email, password, confirmPassword }
      );

      toast.success(data.message || "Password updated");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="max-w-md w-full bg-zinc-900/80 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center">Reset Password</h2>

        <form onSubmit={handleResetPassword} className="mt-8 space-y-5">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-zinc-500 text-lime-400 focus:ring-2 focus:ring-lime-400 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-zinc-500 text-lime-400 focus:ring-2 focus:ring-lime-400 outline-none"
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-black bg-linear-to-r from-lime-400 to-green-400 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-lime-500 hover:to-green-500 cursor-pointer"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;