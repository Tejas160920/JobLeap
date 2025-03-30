import React from "react";
import { FaGoogle, FaApple } from "react-icons/fa";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4 overflow-hidden">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-4">Ready to take the next step?</h1>
        <p className="text-sm text-gray-600 mb-6">Create an account or sign in.</p>

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

        <form className="space-y-4">
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
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
