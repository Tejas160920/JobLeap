import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  // 🔥 Read directly from localStorage on each render
  const userRole = localStorage.getItem("userRole");

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `relative pb-2 transition duration-200 ${
      isActive(path)
        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="w-full flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          JobLeap
        </Link>

        {/* Center: Tabs */}
        <ul className="flex-1 flex justify-center gap-10 font-medium text-center">
          <li className={navLinkClass("/")}>
            <Link to="/">Find Jobs</Link>
          </li>
          <li className={navLinkClass("/company-reviews")}>
            <Link to="/company-reviews">Company Reviews</Link>
          </li>
          <li className={navLinkClass("/salaries")}>
            <Link to="/salaries">Salaries</Link>
          </li>
        </ul>

        {/* Right: Post Job (only for hiring) + Login */}
        <div className="flex items-center gap-4">
          {userRole === "hiring" && (
            <Link to="/add-job">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Post a Job
              </button>
            </Link>
          )}
          <Link to="/login" title="Login" className="text-blue-600 hover:text-blue-800 text-2xl">
            <FaUserCircle />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
