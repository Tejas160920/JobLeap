import React, { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaArrowUp, 
  FaFilter, 
  FaLocationArrow,
  FaPlay,
  FaStar,
  FaUsers,
  FaBuilding,
  FaChevronRight,
  FaGlobe,
  FaChartLine,
  FaClock,
  FaFire
} from "react-icons/fa";

const Hero = ({ onSearch, onViewAllJobs, showCompactMode, onCompanyClick }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  // Helper functions for dynamic classes (fix for Tailwind)
  const getQuickFilterClasses = (color) => {
    const baseClasses = "px-4 py-2 bg-white border-2 rounded-full transition-all duration-300 hover:shadow-md transform hover:scale-105 flex items-center space-x-2 font-medium";
    
    switch (color) {
      case 'blue':
        return `${baseClasses} border-blue-200 text-blue-700 hover:border-blue-400 hover:bg-blue-50`;
      case 'green':
        return `${baseClasses} border-green-200 text-green-700 hover:border-green-400 hover:bg-green-50`;
      case 'purple':
        return `${baseClasses} border-purple-200 text-purple-700 hover:border-purple-400 hover:bg-purple-50`;
      case 'orange':
        return `${baseClasses} border-orange-200 text-orange-700 hover:border-orange-400 hover:bg-orange-50`;
      default:
        return `${baseClasses} border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-gray-50`;
    }
  };

  const getIconColorClass = (color) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      case 'purple':
        return 'text-purple-600';
      case 'orange':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  const popularSearches = [
    "Software Engineer", "Data Scientist", "Product Manager", "Designer", "Marketing", "Sales Manager"
  ];

  const quickFilters = [
    { label: "Remote", value: "remote", icon: <FaGlobe />, color: "blue" },
    { label: "Full-time", value: "full-time", icon: <FaClock />, color: "green" },
    { label: "Senior Level", value: "senior", icon: <FaChartLine />, color: "purple" },
    { label: "Startup", value: "startup", icon: <FaFire />, color: "orange" },
  ];

  const trendingItems = [
    "🔥 Remote positions up 40% this month",
    "⚡ AI/ML jobs increased 60% this week", 
    "🚀 Startup hiring surge continues",
    "💼 Tech salaries reach new highs"
  ];

  const featuredCompanies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Tesla_T_symbol.svg/1200px-Tesla_T_symbol.svg.png" },
    { name: "Salesforce", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png" },
    { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png" },
    { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" },
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png" },
    { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png" },
    { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTrendingIndex((prev) => (prev + 1) % trendingItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (onSearch) {
      onSearch({ title, location, jobType, salaryRange });
    }
    setTimeout(() => {
      setIsLoading(false);
      // Scroll to jobs section after search
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
          // In a real app, you'd reverse geocode these coordinates
          setLocation("Current Location");
        },
        (error) => {
          console.log("Location access denied");
        }
      );
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-bounce delay-300"></div>
      <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-700"></div>
      <div className="absolute bottom-32 right-20 w-5 h-5 bg-green-400 rounded-full animate-bounce delay-1000"></div>
      
      <div className={`relative max-w-7xl mx-auto px-6 ${showCompactMode ? 'pt-20 pb-8 lg:pt-24 lg:pb-12' : 'pt-24 pb-20 lg:pt-32 lg:pb-28'}`}>
        <div className="text-center">
          {/* Main headline with typing animation effect */}
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Find your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent relative">
                dream job
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-lg -z-10 rounded-lg"></div>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
              Discover job opportunities from top companies worldwide
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Find the perfect role that matches your skills and ambitions
            </p>
          </div>

          {/* Enhanced Search form */}
          <div className="max-w-5xl mx-auto mb-16 fade-in">
            <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-3">
              <div className="flex flex-col lg:flex-row gap-3">
                <div className="flex-1 relative group">
                  <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Job title, skills, or company"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 outline-none placeholder-gray-500 rounded-xl bg-transparent"
                  />
                </div>
                
                <div className="flex-1 relative group">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="City, state, or remote"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-12 pr-12 py-4 text-lg border-0 focus:ring-0 outline-none placeholder-gray-500 rounded-xl bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Use current location"
                  >
                    <FaLocationArrow />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                    className="px-4 py-4 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 rounded-xl transition-all duration-300 flex items-center"
                  >
                    <FaFilter className="mr-2" />
                    Filters
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-lift flex items-center justify-center min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={jobType}
                      onChange={(e) => setJobType(e.target.value)}
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
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
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      <option value="">Any salary</option>
                      <option value="50000-75000">$50k - $75k</option>
                      <option value="75000-100000">$75k - $100k</option>
                      <option value="100000-150000">$100k - $150k</option>
                      <option value="150000+">$150k+</option>
                    </select>
                  </div>
                </div>
              )}
            </form>

            {/* Quick Filters */}
            <div className="mt-6">
              <p className="text-gray-600 mb-4 font-medium">Quick filters:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {quickFilters.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (filter.value === 'remote') {
                        setLocation('Remote');
                      } else if (filter.value === 'full-time') {
                        setJobType('full-time');
                      }
                    }}
                    className={getQuickFilterClasses(filter.color)}
                  >
                    <span className={getIconColorClass(filter.color)}>{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular searches */}
            <div className="mt-8">
              <p className="text-gray-600 mb-4 font-medium">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setTitle(search);
                      onSearch({ title: search, location, jobType, salaryRange });
                    }}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 hover:shadow-md transform hover:scale-105 font-medium"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!showCompactMode && (
            <>
              {/* Platform Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16 fade-in">
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaGlobe className="mx-auto" />
                  </div>
                  <div className="text-gray-600 font-medium">Remote Jobs</div>
                  <div className="text-xs text-gray-500 mt-1">Work from anywhere</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaBuilding className="mx-auto" />
                  </div>
                  <div className="text-gray-600 font-medium">Top Companies</div>
                  <div className="text-xs text-gray-500 mt-1">Industry leaders</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaChartLine className="mx-auto" />
                  </div>
                  <div className="text-gray-600 font-medium">Career Growth</div>
                  <div className="text-xs text-gray-500 mt-1">Level up your career</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <FaClock className="mx-auto" />
                  </div>
                  <div className="text-gray-600 font-medium">Daily Updates</div>
                  <div className="text-xs text-gray-500 mt-1">Fresh opportunities</div>
                </div>
              </div>

              {/* Animated trending indicator */}
              <div className="mb-16 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200 shadow-lg">
                  <div className="flex items-center text-gray-700">
                    <FaArrowUp className="mr-2 text-green-500 animate-pulse" />
                    <span className="font-medium transition-all duration-500">
                      {trendingItems[currentTrendingIndex]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Companies */}
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Hiring now</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {featuredCompanies.map((company, index) => (
                    <div
                      key={index}
                      onClick={() => onCompanyClick && onCompanyClick(company.name)}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 card-hover cursor-pointer transform hover:scale-105"
                      title={`Search jobs at ${company.name}`}
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center p-1">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-contain"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {company.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Section for Browse Jobs */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to find your dream job?
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Browse opportunities from top companies worldwide
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={onViewAllJobs}
                      className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <FaBriefcase className="mr-2" />
                      Browse All Jobs
                    </button>
                    <button 
                      onClick={() => window.location.href = '/resume-builder'}
                      className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
                    >
                      Build Resume
                    </button>
                  </div>
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
