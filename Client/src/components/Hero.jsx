import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaLocationArrow
} from "react-icons/fa";

const Hero = ({ onSearch, onViewAllJobs, showCompactMode, onCompanyClick }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const popularSearches = [
    "Customer Service",
    "Data Entry",
    "Marketing",
    "Software Engineer",
    "Project Manager",
    "Data Analyst"
  ];

  const featuredCompanies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (onSearch) {
      onSearch({ title, location });
    }
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        const jobsSection = document.getElementById('jobs-section');
        if (jobsSection) {
          jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }, 500);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation("Current Location");
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  };

  return (
    <section className="bg-white border-b border-gray-100">
      <div className={`max-w-3xl mx-auto px-6 ${showCompactMode ? 'pt-20 pb-10' : 'pt-24 pb-16'}`}>
        <div className="text-center">
          {/* Main headline */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Find a job with JobLeap
          </h1>
          <p className="text-gray-500 mb-8">
            Search thousands of job openings from global companies hiring right now.
          </p>

          {/* Search form - Stacked like Workable */}
          <div className="max-w-lg mx-auto mb-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or keyword"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-base border border-gray-300 rounded-lg focus:border-[#0d6d6e] focus:ring-1 focus:ring-[#0d6d6e] outline-none"
                />
              </div>

              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="City, state, or 'Remote'"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:border-[#0d6d6e] focus:ring-1 focus:ring-[#0d6d6e] outline-none"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0d6d6e] transition-colors"
                  title="Use current location"
                >
                  <FaLocationArrow className="text-sm" />
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0d6d6e] text-white py-3 rounded-lg font-medium hover:bg-[#095555] transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  "Search jobs"
                )}
              </button>
            </form>
          </div>

          {/* Popular searches - Underlined links like Workable */}
          <div className="mb-10">
            <span className="text-gray-500 text-sm">Popular: </span>
            {popularSearches.map((search, index) => (
              <span key={index}>
                <button
                  onClick={() => {
                    setTitle(search);
                    onSearch({ title: search, location });
                  }}
                  className="text-gray-700 text-sm underline hover:text-[#0d6d6e] transition-colors"
                >
                  {search}
                </button>
                {index < popularSearches.length - 1 && <span className="text-gray-400 mx-2">·</span>}
              </span>
            ))}
          </div>

          {!showCompactMode && (
            <>
              {/* Featured Companies */}
              <div className="py-10 border-t border-gray-100">
                <p className="text-gray-400 text-sm mb-6">Trusted by leading companies</p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {featuredCompanies.map((company, index) => (
                    <div
                      key={index}
                      onClick={() => onCompanyClick && onCompanyClick(company.name)}
                      className="cursor-pointer opacity-30 hover:opacity-70 transition-opacity"
                      title={`Search jobs at ${company.name}`}
                    >
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-5 md:h-6 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onViewAllJobs}
                  className="bg-[#0d6d6e] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#095555] transition-colors flex items-center justify-center"
                >
                  <FaBriefcase className="mr-2" />
                  Browse All Jobs
                </button>
                <button
                  onClick={() => window.location.href = '/resume-builder'}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Build Your Resume
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
