import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaHeart
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
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" onClick={scrollToTop} className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-white">JobLeap</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your gateway to finding the perfect remote job. Connect with top companies worldwide.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="mailto:support@jobleap.com"
                className="hover:text-blue-400 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/')}
                  className="hover:text-white transition-colors text-left"
                >
                  Browse Jobs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/company-reviews')}
                  className="hover:text-white transition-colors text-left"
                >
                  Company Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/salaries')}
                  className="hover:text-white transition-colors text-left"
                >
                  Salary Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/resume-builder')}
                  className="hover:text-white transition-colors text-left"
                >
                  Resume Builder
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/career-advice')}
                  className="hover:text-white transition-colors text-left"
                >
                  Career Advice
                </button>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/add-job')}
                  className="hover:text-white transition-colors text-left"
                >
                  Post a Job
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/my-applications')}
                  className="hover:text-white transition-colors text-left"
                >
                  My Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/settings')}
                  className="hover:text-white transition-colors text-left"
                >
                  Account Settings
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation('/privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation('/terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@jobleap.com"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} JobLeap. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 flex items-center mt-4 md:mt-0">
            Made with <FaHeart className="text-red-500 mx-1" /> for job seekers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
