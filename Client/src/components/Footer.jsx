import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaGithub,
  FaEnvelope
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop();
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-[#0d6d6e] rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold text-white">JobLeap</span>
            </Link>
            <p className="text-gray-500 text-sm mb-4">
              Your gateway to finding the perfect remote job. Connect with top companies worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Tejas160920/JobLeap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="mailto:jobleap.work@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-lg" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Browse Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/company-reviews')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Company Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/career-advice')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Career Advice
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/h1b-sponsors')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  H1B Sponsors
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/resume-builder')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Resume Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/my-applications')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  My Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/settings')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Account Settings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/add-job')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Post a Job
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/privacy')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/terms')}
                  className="text-gray-500 hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href="mailto:jobleap.work@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500">
            &copy; {currentYear} JobLeap. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 mt-3 md:mt-0">
            Built for job seekers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
