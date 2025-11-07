import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import signupImage from "../assets/si.jpg";

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "nadia.rajpoot@example.com",
    password: "SecurePass123!",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // ✅ Use backend base URL (change this according to your backend)
      const BASE_URL = "http://localhost:5000/api/auth";

      const endpoint = isLoginPage ? `${BASE_URL}/login` : `${BASE_URL}/signup`;
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      setMessage(res.data.msg || (isLoginPage ? "Login successful!" : "User registered successfully!"));

      if (!isLoginPage) {
        // clear form fields on successful signup
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        // Redirect to login page after short delay
       navigate("/login")
      } else {
        // Redirect to dashboard or home page
        setTimeout(() => navigate("/homepage"), 1500);
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message); 
     
      setMessage(err.response?.data?.message|| "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
      <div className="bg-white shadow-2xl rounded-3xl flex overflow-hidden max-w-5xl w-full">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            {isLoginPage ? "Welcome Back!" : "Create Account"}
          </h2>

          {message && (
            <div
              className={`p-3 mb-4 rounded text-center ${
                message.toLowerCase().includes("success")
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLoginPage && (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2a61eb]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2a61eb]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2a61eb]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2a61eb]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2a61eb] hover:bg-[#234dcc] text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : isLoginPage ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-5">
            {isLoginPage ? (
              <>
                Don’t have an account?{" "}
                <a href="/" className="text-[#2a61eb] font-semibold hover:underline">
                  Sign Up
                </a>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-[#2a61eb] font-semibold hover:underline">
                  Login
                </a>
              </>
            )}
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block w-1/2 bg-[#2a61eb]">
          <img
            src={signupImage}
            alt="Sign Up Illustration"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
