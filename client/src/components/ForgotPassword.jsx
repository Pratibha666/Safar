import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put(
        "http://localhost:8080/api/password/forgot-password",
        { email }
      );

      toast.success(data.message || "OTP sent to your email");
      navigate("/password/verify-forgot-password", { state: { email } });

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-br from-black via-zinc-900 to-black text-white flex items-center justify-center">
      <div className="absolute top-6 left-6">
        <Link
          to="/login"
          className="px-8 py-2 rounded-md bg-lime-400 text-black font-bold hover:bg-lime-500"
        >
          Back
        </Link>
      </div>

      <div className="w-full max-w-md bg-zinc-900/70 backdrop-blur-xl border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-center">Safar</h1>

        <form onSubmit={handleSendOtp} className="mt-8 space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter registered email"
            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 placeholder-zinc-500 text-lime-400 focus:ring-2 focus:ring-lime-400 outline-none"
          />

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-black bg-linear-to-r from-lime-400 to-green-400 ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:from-lime-500 hover:to-green-500 cursor-pointer"
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;