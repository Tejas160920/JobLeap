import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaBriefcase, FaUser, FaSignOutAlt, FaEdit, FaCog, FaFileAlt, FaChartBar, FaBell } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [authState, setAuthState] = useState({
    token: localStorage.getItem("token"),
    userRole: localStorage.getItem("userRole"),
    userEmail: localStorage.getItem("userEmail"),
    profileCompleted: localStorage.getItem("profileCompleted")
  });

  // Re-check auth state on route changes and storage events
  useEffect(() => {
    const checkAuth = () => {
      setAuthState({
        token: localStorage.getItem("token"),
        userRole: localStorage.getItem("userRole"),
        userEmail: localStorage.getItem("userEmail"),
        profileCompleted: localStorage.getItem("profileCompleted")
      });
    };

    // Check on route change
    checkAuth();

    // Listen for storage changes (from other tabs)
    window.addEventListener('storage', checkAuth);

    // Custom event for same-tab updates
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, [location.pathname]);

  const { token, userRole, userEmail, profileCompleted } = authState;

  const isActive = (path) => location.pathname === path;

  const getRoleDisplayName = (role) => {
    if (role === "seeking") return "Job Seeker";
    if (role === "hiring") return "Employer";
    return role;
  };

  const navLinkClass = (path) =>
    `py-2 px-3 text-sm font-medium transition-colors ${
      isActive(path)
        ? "text-[#0d6d6e] border-b-2 border-[#0d6d6e]"
        : "text-gray-600 hover:text-[#0d6d6e]"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("profileCompleted");
    window.dispatchEvent(new Event('authChange'));
    navigate("/");
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm w-full fixed top-0 left-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo-icon.png" alt="" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-gray-900">
              JobLeap
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={navLinkClass("/")}>
              Find Jobs
            </Link>
            <Link to="/career-advice" className={navLinkClass("/career-advice")}>
              Career Advice
            </Link>
            <Link to="/resume-builder" className={navLinkClass("/resume-builder")}>
              Resume Builder
            </Link>
            <Link to="/h1b-sponsors" className={navLinkClass("/h1b-sponsors")}>
              H1B Sponsors
            </Link>
            <Link to="/ats-optimizer" className={navLinkClass("/ats-optimizer")}>
              ATS Optimizer
            </Link>
            <Link to="/cover-letter" className={navLinkClass("/cover-letter")}>
              Cover Letter
            </Link>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {userRole === "hiring" && (
              <Link to="/add-job">
                <button className="bg-[#0d6d6e] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#095555] transition-colors">
                  Post a Job
                </button>
              </Link>
            )}

            {/* Notification Bell */}
            {token && <NotificationBell />}

            {token ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="w-8 h-8 bg-[#0d6d6e] rounded-full flex items-center justify-center">
                    <FaUser className="text-white text-xs" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{getRoleDisplayName(userRole)}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">Signed in as</p>
                      <p className="text-sm text-gray-500 truncate">{userEmail || getRoleDisplayName(userRole)}</p>
                      {!profileCompleted && userRole === "seeking" && (
                        <span className="inline-block mt-1 text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded">
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
                        <FaEdit className="text-gray-400" />
                        <span>{profileCompleted ? 'Edit Profile' : 'Complete Profile'}</span>
                      </Link>

                      {userRole === "seeking" && (
                        <Link
                          to="/my-applications"
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaFileAlt className="text-gray-400" />
                          <span>My Applications</span>
                        </Link>
                      )}

                      {userRole === "hiring" && (
                        <Link
                          to="/my-jobs"
                          className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FaBriefcase className="text-gray-400" />
                          <span>My Job Postings</span>
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          navigate('/settings');
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaCog className="text-gray-400" />
                        <span>Settings</span>
                      </button>
                    </div>

                    <div className="border-t border-gray-100 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <FaSignOutAlt className="text-gray-400" />
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
                  className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors px-4 py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#0d6d6e] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#095555] transition-colors"
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
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/') ? 'text-[#0d6d6e] bg-[#e6f3f3]' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Find Jobs
              </Link>
              <Link
                to="/career-advice"
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/career-advice') ? 'text-[#0d6d6e] bg-[#e6f3f3]' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Career Advice
              </Link>
              <Link
                to="/resume-builder"
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/resume-builder') ? 'text-[#0d6d6e] bg-[#e6f3f3]' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume Builder
              </Link>
              <Link
                to="/h1b-sponsors"
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/h1b-sponsors') ? 'text-[#0d6d6e] bg-[#e6f3f3]' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                H1B Sponsors
              </Link>
              <Link
                to="/ats-optimizer"
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/ats-optimizer') ? 'text-[#0d6d6e] bg-[#e6f3f3]' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ATS Optimizer
              </Link>
              <Link
                to="/cover-letter"
                className={`block px-3 py-2 text-sm font-medium rounded-lg ${isActive('/cover-letter') ? 'text-[#0d6d6e] bg-[#e6f3f3]' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cover Letter
              </Link>

              {userRole === "hiring" && (
                <Link
                  to="/add-job"
                  className="block bg-[#0d6d6e] text-white px-3 py-2 rounded-lg text-sm font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Post a Job
                </Link>
              )}

              {!token ? (
                <div className="pt-2 space-y-2 border-t border-gray-100 mt-2">
                  <Link
                    to="/login"
                    className="block text-center text-gray-600 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center bg-[#0d6d6e] text-white px-3 py-2 rounded-lg text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="pt-2 border-t border-gray-200 space-y-1">
                  <div className="px-3 py-2 text-sm font-medium text-gray-900">
                    {userEmail || getRoleDisplayName(userRole)}
                    {!profileCompleted && userRole === "seeking" && (
                      <span className="block text-xs text-amber-600 mt-1">Profile incomplete</span>
                    )}
                  </div>
                  <Link
                    to="/notifications"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaBell className="text-xs text-gray-400" />
                    <span>Notifications</span>
                  </Link>
                  <Link
                    to="/job-alerts"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaBriefcase className="text-xs text-gray-400" />
                    <span>Job Alerts</span>
                  </Link>
                  <Link
                    to="/complete-profile"
                    className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaEdit className="text-xs text-gray-400" />
                    <span>{profileCompleted ? 'Edit Profile' : 'Complete Profile'}</span>
                  </Link>
                  {userRole === "seeking" && (
                    <Link
                      to="/my-applications"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaFileAlt className="text-xs text-gray-400" />
                      <span>My Applications</span>
                    </Link>
                  )}
                  {userRole === "hiring" && (
                    <Link
                      to="/my-jobs"
                      className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaBriefcase className="text-xs text-gray-400" />
                      <span>My Job Postings</span>
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      navigate('/settings');
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                  >
                    <FaCog className="text-xs text-gray-400" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-left text-gray-600 hover:bg-gray-50 rounded-lg text-sm"
                  >
                    <FaSignOutAlt className="text-xs text-gray-400" />
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
