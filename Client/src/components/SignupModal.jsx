import React, { useState } from "react";
import { FaTimes, FaUser, FaBuilding } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SignupModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleSelection = (role) => {
    setSelectedRole(role);
    localStorage.setItem("hasSeenWelcome", "true");
    navigate(`/signup?role=${role}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8 text-center">
          <img
            src="/logo-icon.png"
            alt="JobLeap"
            className="w-16 h-16 mx-auto mb-6"
          />

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to JobLeap!
          </h2>
          <p className="text-gray-600 mb-8">
            Start your journey to finding your dream job
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelection("seeking")}
              className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-[#0d6d6e]/20 rounded-xl hover:border-[#0d6d6e] hover:bg-[#e6f3f3] transition-all duration-300 group"
            >
              <FaUser className="text-[#0d6d6e] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">I'm looking for a job</div>
                <div className="text-sm text-gray-600">Find your next opportunity</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelection("hiring")}
              className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-[#0d6d6e]/20 rounded-xl hover:border-[#0d6d6e] hover:bg-[#e6f3f3] transition-all duration-300 group"
            >
              <FaBuilding className="text-[#0d6d6e] group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">I'm hiring talent</div>
                <div className="text-sm text-gray-600">Post jobs and find candidates</div>
              </div>
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <button
                onClick={() => {
                  localStorage.setItem("hasSeenWelcome", "true");
                  navigate("/login");
                  onClose();
                }}
                className="text-[#0d6d6e] hover:text-[#095555] font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;