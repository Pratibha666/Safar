import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Enter email and OTP");
      return;
    }

    try {
      setLoading(true);
      // console.log("VERIFY OTP DATA:", { email, otp });
      const { data } = await axios.put(
        "http://localhost:8080/api/password/verify-forgot-password",
        {
          email,
          otp,
        }
      );

      toast.success(data.message || "OTP verified successfully");

      navigate("/password/reset-password", { state: { email } });

    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-black text-white flex items-center justify-center">

      <div className="absolute top-6 left-6">
        <Link
          to="/password/forgot-password"
          className="px-8 py-2 rounded-md bg-lime-400 hover:bg-lime-500 text-black font-bold shadow-md"
        >
          Back
        </Link>
      </div>

      <div className="max-w-md w-full bg-zinc-900/80 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center">OTP Verification</h2>

        <form onSubmit={handleVerifyOtp} className="mt-8 space-y-5">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl placeholder-zinc-500 text-lime-300 focus:ring-2 focus:ring-lime-400 outline-none"
          />

          <input
            type="number"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl placeholder-zinc-500 text-lime-300 focus:ring-2 focus:ring-lime-400 outline-none"
          />

            <p className="text-end text-sm text-zinc-400">
          OTP expired?{" "}
          <Link to="/password/forgot-password" className="text-lime-400 hover:underline">
            Send OTP again
          </Link>
        </p>
          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-black bg-linear-to-r from-lime-400 to-green-400 ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:from-lime-500 hover:to-green-500 cursor-pointer"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyForgotPassword;