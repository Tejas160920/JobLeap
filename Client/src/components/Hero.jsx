import React, { useState } from "react";
import SEO from "./SEO";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaFilter,
  FaLocationArrow,
  FaGlobe,
  FaClock,
  FaPassport
} from "react-icons/fa";

const Hero = ({ onSearch, onViewAllJobs, showCompactMode, onCompanyClick }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [visaSponsorship, setVisaSponsorship] = useState("");

  const popularSearches = [
    "Software Engineer", "Data Scientist", "Product Manager", "Designer", "Marketing", "Sales Manager"
  ];

  const quickFilters = [
    { label: "Remote", value: "remote", icon: <FaGlobe /> },
    { label: "Full-time", value: "full-time", icon: <FaClock /> },
    { label: "Visa Sponsors", value: "visa", icon: <FaPassport /> },
    { label: "Senior Level", value: "senior", icon: <FaBriefcase /> },
  ];

  const featuredCompanies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1200px-Tesla_T_symbol.svg.png" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (onSearch) {
      onSearch({ title, location, jobType, salaryRange, visaSponsorship });
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
    <section className="relative bg-white">
      <div className={`max-w-7xl mx-auto px-6 ${showCompactMode ? 'pt-20 pb-8 lg:pt-24 lg:pb-10' : 'pt-24 pb-16 lg:pt-28 lg:pb-20'}`}>
        <div className="text-center">
          {/* Main headline */}
          <div className="fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Find your{" "}
              <span className="text-[#0d6d6e]">dream job</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-3 max-w-2xl mx-auto">
              Discover job opportunities from top companies worldwide
            </p>
            <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto">
              Find the perfect role that matches your skills and ambitions
            </p>
          </div>

          {/* Search form */}
          <div className="max-w-4xl mx-auto mb-10 fade-in">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-gray-200 p-2">
              <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex-1 relative">
                  <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-base border border-gray-200 focus:border-[#0d6d6e] focus:ring-1 focus:ring-[#0d6d6e] outline-none rounded-lg"
                  />
                </div>

                <div className="flex-1 relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 text-base border border-gray-200 focus:border-[#0d6d6e] focus:ring-1 focus:ring-[#0d6d6e] outline-none rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#0d6d6e] transition-colors cursor-pointer"
                    title="Use current location"
                  >
                    <FaLocationArrow />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="px-4 py-3.5 bg-gray-50 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center border border-gray-200 cursor-pointer"
                  >
                    <FaFilter className="mr-2" />
                    Filters
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#0d6d6e] text-white px-6 py-3.5 rounded-lg font-medium hover:bg-[#095555] transition-colors flex items-center justify-center min-w-[120px] disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaSearch className="mr-2" />
                        Search
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Advanced Search Options */}
              {showAdvancedSearch && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-gray-700"
                    >
                      <option value="">Any job type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="remote">Remote</option>
                    </select>
                    <select
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-gray-700"
                    >
                      <option value="">Any salary</option>
                      <option value="50000-75000">$50k - $75k</option>
                      <option value="75000-100000">$75k - $100k</option>
                      <option value="100000-150000">$100k - $150k</option>
                      <option value="150000+">$150k+</option>
                    </select>
                    <select
                      value={visaSponsorship}
                      onChange={(e) => setVisaSponsorship(e.target.value)}
                      className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-gray-700"
                    >
                      <option value="">Any visa status</option>
                      <option value="sponsors">Sponsors H1B/Visa</option>
                      <option value="no-requirement">No visa required</option>
                    </select>
                  </div>
                </div>
              )}
            </form>

            {/* Quick Filters */}
            <div className="mt-6">
              <p className="text-gray-500 mb-3 text-sm">Quick filters:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickFilters.map((filter, index) => {
                  const isActive =
                    (filter.value === 'visa' && visaSponsorship === 'sponsors') ||
                    (filter.value === 'remote' && location.toLowerCase() === 'remote') ||
                    (filter.value === 'full-time' && jobType === 'full-time') ||
                    (filter.value === 'senior' && title.toLowerCase().includes('senior'));

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (filter.value === 'remote') {
                          // Toggle remote
                          setLocation(location.toLowerCase() === 'remote' ? '' : 'Remote');
                        } else if (filter.value === 'full-time') {
                          // Toggle full-time
                          setJobType(jobType === 'full-time' ? '' : 'full-time');
                        } else if (filter.value === 'visa') {
                          // Toggle visa sponsorship
                          setVisaSponsorship(visaSponsorship === 'sponsors' ? '' : 'sponsors');
                          if (visaSponsorship !== 'sponsors') {
                            setShowAdvancedSearch(true);
                          }
                        } else if (filter.value === 'senior') {
                          // Toggle senior level
                          setTitle(title.toLowerCase().includes('senior') ? '' : 'Senior');
                        }
                      }}
                      className={`px-4 py-2 bg-white border rounded-lg text-sm transition-colors flex items-center space-x-2 cursor-pointer ${
                        isActive
                          ? 'border-[#0d6d6e] text-[#0d6d6e] bg-[#e6f3f3]'
                          : 'border-gray-200 text-gray-600 hover:border-[#0d6d6e] hover:text-[#0d6d6e]'
                      }`}
                    >
                      <span className={isActive ? 'text-[#0d6d6e]' : 'text-gray-400'}>
                        {filter.icon}
                      </span>
                      <span>{filter.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Popular searches */}
            <div className="mt-6">
              <p className="text-gray-500 mb-3 text-sm">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((search, index) => {
                  const isSelected = title === search;
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isSelected) {
                          // Deselect - clear the filter
                          setTitle("");
                          onSearch({ title: "", location, jobType, salaryRange, visaSponsorship });
                        } else {
                          // Select this search
                          setTitle(search);
                          onSearch({ title: search, location, jobType, salaryRange, visaSponsorship });
                        }
                      }}
                      className={`px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#0d6d6e] text-white border border-[#0d6d6e]"
                          : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      {search}
                      {isSelected && <span className="ml-2">×</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {!showCompactMode && (
            <>
              {/* Featured Companies */}
              <div className="mt-16 mb-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Trusted by leading companies</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                  {featuredCompanies.map((company, index) => (
                    <div
                      key={index}
                      onClick={() => onCompanyClick && onCompanyClick(company.name)}
                      className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                      title={`Search jobs at ${company.name}`}
                    >
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-6 md:h-8 object-contain grayscale hover:grayscale-0 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-12 py-12 px-8 bg-[#0d6d6e] rounded-xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Ready to find your next opportunity?
                </h2>
                <p className="text-lg text-white/80 mb-6 max-w-xl mx-auto">
                  Browse thousands of jobs from top companies
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={onViewAllJobs}
                    className="bg-white text-[#0d6d6e] px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer"
                  >
                    <FaBriefcase className="mr-2" />
                    Browse All Jobs
                  </button>
                  <button
                    onClick={() => window.location.href = '/resume-builder'}
                    className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Build Resume
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
