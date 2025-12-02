import React, { useState } from "react";
import { FaTimes, FaBriefcase, FaUser, FaBuilding } from "react-icons/fa";
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FaBriefcase className="text-white text-2xl" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to JobLeap!
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of professionals finding their dream jobs
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelection("seeking")}
              className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
            >
              <FaUser className="text-blue-600 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">I'm looking for a job</div>
                <div className="text-sm text-gray-600">Find your next opportunity</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleSelection("hiring")}
              className="w-full flex items-center justify-center space-x-3 p-4 border-2 border-purple-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 group"
            >
              <FaBuilding className="text-purple-600 group-hover:scale-110 transition-transform" />
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
                className="text-blue-600 hover:text-blue-800 font-medium"
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