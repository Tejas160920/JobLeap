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

const Hero = ({ onSearch, onViewAllJobs, showCompactMode }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [jobType, setJobType] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

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
    { name: "Google", logo: "https://logo.clearbit.com/google.com", openJobs: 1234 },
    { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", openJobs: 867 },
    { name: "Apple", logo: "https://logo.clearbit.com/apple.com", openJobs: 543 },
    { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", openJobs: 321 },
    { name: "Meta", logo: "https://logo.clearbit.com/meta.com", openJobs: 456 },
    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", openJobs: 789 }
  ];

  const successStories = [
    { name: "Sarah Chen", role: "Software Engineer", company: "Google", avatar: "👩‍💻" },
    { name: "Mike Johnson", role: "Product Manager", company: "Netflix", avatar: "👨‍💼" },
    { name: "Lisa Zhang", role: "Designer", company: "Apple", avatar: "👩‍🎨" }
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
      
      <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showCompactMode ? 'py-8 lg:py-12' : 'py-16 lg:py-24'}`}>
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
              Discover thousands of job opportunities from top companies worldwide
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Join millions of job seekers and find the perfect role that matches your skills and ambitions
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
                    className={`px-4 py-2 bg-white border-2 border-${filter.color}-200 text-${filter.color}-700 rounded-full hover:border-${filter.color}-400 hover:bg-${filter.color}-50 transition-all duration-300 hover:shadow-md transform hover:scale-105 flex items-center space-x-2 font-medium`}
                  >
                    <span className={`text-${filter.color}-600`}>{filter.icon}</span>
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
              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mb-16 fade-in">
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">1M+</div>
                  <div className="text-gray-600 font-medium">Active Jobs</div>
                  <div className="text-xs text-gray-500 mt-1">Updated daily</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">50K+</div>
                  <div className="text-gray-600 font-medium">Companies</div>
                  <div className="text-xs text-gray-500 mt-1">Verified employers</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">2M+</div>
                  <div className="text-gray-600 font-medium">Job Seekers</div>
                  <div className="text-xs text-gray-500 mt-1">Active users</div>
                </div>
                <div className="text-center group">
                  <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
                  <div className="text-gray-600 font-medium">Success Rate</div>
                  <div className="text-xs text-gray-500 mt-1">Job matches</div>
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
                <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                  {featuredCompanies.map((company, index) => (
                    <div
                      key={index}
                      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 card-hover cursor-pointer"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">
                        {company.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {company.openJobs.toLocaleString()} jobs
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {successStories.map((story, index) => (
                    <div
                      key={index}
                      className="text-center p-4 rounded-xl hover:bg-white/80 transition-all duration-300"
                    >
                      <div className="text-4xl mb-3">{story.avatar}</div>
                      <h3 className="font-semibold text-gray-900 mb-1">{story.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{story.role}</p>
                      <p className="text-xs text-blue-600 font-medium">@ {story.company}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
                    View more success stories
                    <FaChevronRight className="ml-2" />
                  </button>
                </div>
              </div>

              {/* CTA Section for Browse Jobs */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Ready to find your dream job?
                  </h2>
                  <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                    Browse thousands of opportunities from top companies worldwide
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={onViewAllJobs}
                      className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <FaBriefcase className="mr-2" />
                      Browse All Jobs
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                      Upload Resume
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
