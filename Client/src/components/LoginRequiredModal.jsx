import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaTimes, FaUser, FaArrowRight } from "react-icons/fa";

const LoginRequiredModal = ({ isOpen, onClose, feature = "this feature" }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = () => {
    onClose();
    navigate("/login");
  };

  const handleSignup = () => {
    onClose();
    navigate("/signup");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#0d6d6e] to-[#0a5555] p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <FaTimes className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaLock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-center">Sign in Required</h2>
          <p className="text-white/80 text-center mt-2">
            Create a free account to access {feature}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-3 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-600 text-sm">Save and autofill your job applications</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-600 text-sm">Track your job applications in one place</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-600 text-sm">Get personalized job recommendations</p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-600 text-sm">✓</span>
              </div>
              <p className="text-gray-600 text-sm">Access ATS optimizer and cover letter generator</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleSignup}
              className="w-full flex items-center justify-center space-x-2 bg-[#0d6d6e] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0a5555] transition-colors"
            >
              <FaUser className="w-4 h-4" />
              <span>Create Free Account</span>
              <FaArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogin}
              className="w-full py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            By signing up, you agree to our{" "}
            <a href="/terms" className="text-[#0d6d6e] hover:underline">Terms</a>
            {" "}and{" "}
            <a href="/privacy" className="text-[#0d6d6e] hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
