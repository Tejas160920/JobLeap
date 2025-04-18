import React, { useState } from "react";
import { FaGoogle, FaApple } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // Local state for form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  // ✅ Now capturing password too
  const [error, setError] = useState("");

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),  // ✅ Use user's password input
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);           // Save token in browser
        localStorage.setItem("userRole", data.user.role);    // Save role for permissions
        navigate("/");                                       // Redirect to homepage
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 overflow-hidden">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Ready to take the next step?</h1>
        <p className="text-sm text-gray-600 mb-6">Create an account or sign in.</p>

        <p className="text-sm text-gray-600 mb-4 text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md mb-3 hover:bg-gray-50">
          <FaGoogle className="mr-2 text-lg" />
          Continue with Google
        </button>

        <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-md mb-3 hover:bg-gray-50">
          <FaApple className="mr-2 text-lg" />
          Continue with Apple
        </button>

        <div className="relative my-4">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-gray-500 text-sm">
            or
          </span>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Continue →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
