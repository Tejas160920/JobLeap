import React from "react";
import { Link } from "react-router-dom";
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

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-white">JobLeap</span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your gateway to finding the perfect job. Connect with top companies worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="LinkedIn">
                <FaLinkedin className="text-xl" />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors" aria-label="GitHub">
                <FaGithub className="text-xl" />
              </a>
              <a href="mailto:support@jobleap.com" className="hover:text-blue-400 transition-colors" aria-label="Email">
                <FaEnvelope className="text-xl" />
              </a>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/company-reviews" className="hover:text-white transition-colors">Company Reviews</Link>
              </li>
              <li>
                <Link to="/salaries" className="hover:text-white transition-colors">Salary Guide</Link>
              </li>
              <li>
                <Link to="/resume-builder" className="hover:text-white transition-colors">Resume Builder</Link>
              </li>
              <li>
                <Link to="/career-advice" className="hover:text-white transition-colors">Career Advice</Link>
              </li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/add-job" className="hover:text-white transition-colors">Post a Job</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Pricing</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Recruiting Solutions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Employer Branding</a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
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
