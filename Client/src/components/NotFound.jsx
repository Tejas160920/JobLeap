import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBriefcase } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#0d6d6e]">
            404
          </h1>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mb-8 text-lg">
          Oops! The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center space-x-2 bg-[#0d6d6e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
          >
            <FaHome />
            <span>Go Home</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center space-x-2 border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-medium hover:border-[#0d6d6e] hover:text-[#0d6d6e] transition-colors"
          >
            <FaBriefcase />
            <span>Browse Jobs</span>
          </button>
        </div>

        <div className="mt-12 text-gray-500">
          <p>Need help? <a href="mailto:support@jobleap.com" className="text-[#0d6d6e] hover:underline">Contact Support</a></p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
