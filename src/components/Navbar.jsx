// src/components/Navbar.jsx
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ activeTab, setActiveTab }) => {
  const navLinkClass = (tab) =>
    `relative pb-2 cursor-pointer transition-colors duration-200 ${
      activeTab === tab
        ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-10 py-3 w-full">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">JobLeap</div>

        {/* Center Nav */}
        <ul className="hidden md:flex gap-8 font-medium relative">
          <li
            className={navLinkClass("jobs")}
            onClick={() => setActiveTab("jobs")}
          >
            Find Jobs
          </li>
          <li
            className={navLinkClass("reviews")}
            onClick={() => setActiveTab("reviews")}
          >
            Company Reviews
          </li>
          <li
            className={navLinkClass("salaries")}
            onClick={() => setActiveTab("salaries")}
          >
            Salaries
          </li>
        </ul>

        {/* Right Side: User Icon */}
        <div
  onClick={() => setActiveTab("login")}
  title="Login"
  className="text-blue-600 hover:text-blue-800 text-2xl cursor-pointer"
>
  <FaUserCircle />
</div>

      </div>
    </nav>
  );
};

export default Navbar;
