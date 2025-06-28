import { useState } from "react";
import "./login.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Google login handler
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/google`, {
          accessToken: res.access_token,
        })
        .then((res) => {
          toast.success("Login Success");
          const user = res.data.user;
          localStorage.setItem("token", res.data.token);
          if (user.role === "admin") {
            navigate("/admin/");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Google login failed.");
        });
    },
  });

  // Handle form submission
  function handleOnSubmit() {
    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoading(true); // Set loading to true when submitting

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success("Login Success");
        const user = res.data.user;
        localStorage.setItem("token", res.data.token);
        if (user.emailVerified === false) {
          navigate("/verify-email");
          return;
        }
        if (user.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "An error occurred during login.");
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  }

  return (
    <div className="bg-picture h-screen flex justify-center items-center">
      <div className="w-[400px] h-[500px] backdrop-blur-sm rounded-2xl flex flex-col items-center overflow-y-auto py-4">
        <img
          src="/kv_logo.png"
          alt="logo"
          className=" object-cover mb-6 bg-amber-100  rounded-full mx-auto w-[80px] h-[80px] border-[3px]"
        />
        <h2 className="text-2xl text-white font-semibold mb-6">Login to Your Account</h2>

        {/* Input Fields */}
        <input
          type="email"
          placeholder="Email"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="mt-3 w-[300px] h-[40px] bg-transparent border-b-2 border-white text-white text-xl outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          className={`w-[300px] h-[45px] text-xl text-white rounded-lg bg-[#efac38] mt-6 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleOnSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Google Login */}
        <div
          className="w-[300px] h-[45px] text-xl text-white rounded-lg bg-gradient-to-r from-blue-500 to-green-500 my-4 text-center cursor-pointer"
          onClick={googleLogin}
        >
          Login with Google
        </div>

        {/* Footer Text */}
        <div className="mt-4 text-white">
          <span>Don't have an account?</span>
          <a href="/register" className="text-blue-500 hover:underline ml-2">
            Sign Up
          </a>
        </div>

        {/* Button to Go to Home Page */}
        <button
          className="mt-4 text-white bg-blue-600 hover:bg-blue-700 w-[300px] h-[45px] rounded-lg"
          onClick={() => navigate("/")}
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}
