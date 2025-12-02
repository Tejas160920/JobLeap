import React, { useState } from "react";
import { FaUserCircle, FaBars, FaTimes, FaBriefcase, FaUser, FaSignOutAlt, FaEdit, FaCog, FaFileAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("token");
  const profileCompleted = localStorage.getItem("profileCompleted");

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `relative py-2 px-3 rounded-lg transition-all duration-300 font-medium ${
      isActive(path)
        ? "text-blue-600 bg-blue-50"
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    navigate("/");
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-lg w-full fixed top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FaBriefcase className="text-white text-sm" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JobLeap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className={navLinkClass("/")}>
              Find Jobs
            </Link>
            <Link to="/company-reviews" className={navLinkClass("/company-reviews")}>
              Companies
            </Link>
            <Link to="/salaries" className={navLinkClass("/salaries")}>
              Salaries
            </Link>
            <Link to="/career-advice" className={navLinkClass("/career-advice")}>
              Career Advice
            </Link>
            <Link to="/resume-builder" className={navLinkClass("/resume-builder")}>
              Resume Builder
            </Link>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {userRole === "hiring" && (
              <Link to="/add-job">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-lift">
                  Post a Job
                </button>
              </Link>
            )}
            
            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="relative w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                    {!profileCompleted && userRole === "seeking" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{userRole}</span>
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Signed in as</p>
                      <p className="text-sm text-gray-600 truncate">{userEmail || `${userRole} user`}</p>
                      {!profileCompleted && userRole === "seeking" && (
                        <span className="inline-block mt-1 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Profile incomplete
                        </span>
                      )}
                    </div>
                    
                    <div className="py-1">
                      <Link
                        to="/complete-profile"
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FaEdit />
                        <span>{profileCompleted ? 'Edit Profile' : 'Complete Profile'}</span>
                      </Link>
                      
                      <Link
                        to="/my-applications"
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FaFileAlt />
                        <span>My Applications</span>
                      </Link>
                      
                      <button
                        onClick={() => {
                          navigate('/settings');
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaCog />
                        <span>Settings</span>
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <FaSignOutAlt />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-gray-600" />
              ) : (
                <FaBars className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className={`block ${navLinkClass("/")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                to="/company-reviews"
                className={`block ${navLinkClass("/company-reviews")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Companies
              </Link>
              <Link
                to="/salaries"
                className={`block ${navLinkClass("/salaries")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Salaries
              </Link>
              <Link
                to="/career-advice"
                className={`block ${navLinkClass("/career-advice")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Career Advice
              </Link>
              <Link
                to="/resume-builder"
                className={`block ${navLinkClass("/resume-builder")}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume Builder
              </Link>
              
              {userRole === "hiring" && (
                <Link
                  to="/add-job"
                  className="block bg-blue-600 text-white px-3 py-2 rounded-lg font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Post a Job
                </Link>
              )}
              
              {!token ? (
                <div className="pt-2 space-y-2">
                  <Link
                    to="/login"
                    className="block text-center bg-gray-100 text-gray-700 px-3 py-2 rounded-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center bg-blue-600 text-white px-3 py-2 rounded-lg font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200 space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-900">
                    {userEmail || `${userRole} user`}
                    {!profileCompleted && userRole === "seeking" && (
                      <span className="block text-xs text-yellow-600 mt-1">Profile incomplete</span>
                    )}
                  </div>
                  <Link
                    to="/complete-profile"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaEdit className="text-sm" />
                    <span>{profileCompleted ? 'Edit Profile' : 'Complete Profile'}</span>
                  </Link>
                  <Link
                    to="/my-applications"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaFileAlt className="text-sm" />
                    <span>My Applications</span>
                  </Link>
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <FaCog className="text-sm" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
