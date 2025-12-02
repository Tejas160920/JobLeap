import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
  FaDollarSign,
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaGraduationCap,
  FaFilter,
  FaSortAmountDown,
  FaInfoCircle
} from "react-icons/fa";

const salaries = [
  { 
    title: "Software Engineer", 
    average: "$123,202", 
    low: "$95,000", 
    high: "$185,000", 
    growth: 15.2,
    trend: "up",
    experience: "3-5 years",
    education: "Bachelor's",
    skills: ["JavaScript", "Python", "React"],
    companies: 1234,
    category: "Technology"
  },
  { 
    title: "Data Scientist", 
    average: "$134,567", 
    low: "$105,000", 
    high: "$195,000", 
    growth: 22.1,
    trend: "up",
    experience: "2-4 years",
    education: "Master's",
    skills: ["Python", "Machine Learning", "SQL"],
    companies: 876,
    category: "Technology"
  },
  { 
    title: "Product Manager", 
    average: "$142,890", 
    low: "$115,000", 
    high: "$210,000", 
    growth: 8.5,
    trend: "up",
    experience: "5-7 years",
    education: "Bachelor's",
    skills: ["Strategy", "Analytics", "Leadership"],
    companies: 654,
    category: "Management"
  },
  { 
    title: "UX Designer", 
    average: "$98,450", 
    low: "$75,000", 
    high: "$135,000", 
    growth: 12.8,
    trend: "up",
    experience: "2-4 years",
    education: "Bachelor's",
    skills: ["Figma", "User Research", "Prototyping"],
    companies: 432,
    category: "Design"
  },
  { 
    title: "DevOps Engineer", 
    average: "$118,675", 
    low: "$92,000", 
    high: "$165,000", 
    growth: 18.7,
    trend: "up",
    experience: "3-6 years",
    education: "Bachelor's",
    skills: ["AWS", "Docker", "Kubernetes"],
    companies: 567,
    category: "Technology"
  },
  { 
    title: "Marketing Manager", 
    average: "$87,230", 
    low: "$68,000", 
    high: "$125,000", 
    growth: 5.2,
    trend: "up",
    experience: "4-6 years",
    education: "Bachelor's",
    skills: ["Digital Marketing", "Analytics", "Content"],
    companies: 789,
    category: "Marketing"
  },
  { 
    title: "Sales Executive", 
    average: "$81,014", 
    low: "$60,000", 
    high: "$120,000", 
    growth: 7.8,
    trend: "up",
    experience: "2-5 years",
    education: "Bachelor's",
    skills: ["CRM", "Negotiation", "Communication"],
    companies: 923,
    category: "Sales"
  },
  { 
    title: "Business Analyst", 
    average: "$85,490", 
    low: "$65,000", 
    high: "$115,000", 
    growth: 6.4,
    trend: "up",
    experience: "2-4 years",
    education: "Bachelor's",
    skills: ["SQL", "Excel", "Business Intelligence"],
    companies: 645,
    category: "Business"
  },
  { 
    title: "Cybersecurity Specialist", 
    average: "$112,890", 
    low: "$88,000", 
    high: "$155,000", 
    growth: 31.2,
    trend: "up",
    experience: "3-5 years",
    education: "Bachelor's",
    skills: ["Security", "Network", "Risk Assessment"],
    companies: 423,
    category: "Technology"
  }
];

const categories = [
  { name: "All", count: salaries.length },
  { name: "Technology", count: salaries.filter(s => s.category === "Technology").length },
  { name: "Management", count: salaries.filter(s => s.category === "Management").length },
  { name: "Design", count: salaries.filter(s => s.category === "Design").length },
  { name: "Marketing", count: salaries.filter(s => s.category === "Marketing").length },
  { name: "Sales", count: salaries.filter(s => s.category === "Sales").length },
  { name: "Business", count: salaries.filter(s => s.category === "Business").length }
];

const Salaries = () => {
  const navigate = useNavigate();
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("average");
  const [selectedSalary, setSelectedSalary] = useState(null);

  const handleSearchJobs = (jobTitle) => {
    navigate('/', { state: { companyFilter: jobTitle } });
  };

  const filteredSalaries = salaries
    .filter(job => {
      const matchesTitle = job.title.toLowerCase().includes(searchTitle.toLowerCase());
      const matchesCategory = selectedCategory === "All" || job.category === selectedCategory;
      return matchesTitle && matchesCategory;
    })
    .sort((a, b) => {
      const aAvg = parseInt(a.average.replace(/[$,]/g, ''));
      const bAvg = parseInt(b.average.replace(/[$,]/g, ''));
      if (sortBy === "average") return bAvg - aAvg;
      if (sortBy === "growth") return b.growth - a.growth;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  const avgSalary = filteredSalaries.length > 0 
    ? Math.round(filteredSalaries.reduce((sum, job) => sum + parseInt(job.average.replace(/[$,]/g, '')), 0) / filteredSalaries.length)
    : 0;

  return (
    <main className="pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover your{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                earning potential
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Explore salary insights and market rates across industries
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Make informed career decisions with real salary data from top companies
            </p>

            {/* Enhanced Search */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <div className="flex-1 relative">
                    <FaBriefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Job title (e.g., Software Engineer)"
                      value={searchTitle}
                      onChange={(e) => setSearchTitle(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 outline-none placeholder-gray-500 rounded-xl bg-transparent"
                    />
                  </div>
                  <div className="flex-1 relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Location (e.g., San Francisco)"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 outline-none placeholder-gray-500 rounded-xl bg-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setSearchTitle(searchTitle)}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-lift flex items-center justify-center min-w-[140px]"
                  >
                    <FaSearch className="mr-2" />
                    Search Salaries
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">${avgSalary.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Avg Salary</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">500K+</div>
                <div className="text-gray-600 text-sm">Salary Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">50K+</div>
                <div className="text-gray-600 text-sm">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">Weekly</div>
                <div className="text-gray-600 text-sm">Updates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {filteredSalaries.length} Salary{filteredSalaries.length !== 1 ? ' Reports' : ' Report'}
              </h2>
              <p className="text-gray-600">
                {selectedCategory !== "All" && `in ${selectedCategory} • `}
                Updated weekly with latest market data
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaSortAmountDown className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="average">Highest Salary</option>
                  <option value="growth">Highest Growth</option>
                  <option value="title">Job Title A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.name
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Salary Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSalaries.map((job, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden card-hover transition-all duration-300 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <FaUsers className="text-gray-400" />
                          <span>{job.companies.toLocaleString()} companies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FaGraduationCap className="text-gray-400" />
                          <span>{job.education}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                      job.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}>
                      {job.trend === "up" ? <FaArrowUp /> : <FaArrowDown />}
                      <span>{job.growth}%</span>
                    </div>
                  </div>

                  {/* Salary Range */}
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{job.average}</div>
                    <div className="text-sm text-gray-600 mb-4">
                      Range: {job.low} - {job.high}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full"
                        style={{ width: `${(parseInt(job.average.replace(/[$,]/g, '')) - parseInt(job.low.replace(/[$,]/g, ''))) / (parseInt(job.high.replace(/[$,]/g, '')) - parseInt(job.low.replace(/[$,]/g, ''))) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Required Experience</h4>
                    <p className="text-gray-600 text-sm">{job.experience}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Top Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <FaInfoCircle className="text-gray-400" />
                      <span>Based on {job.companies} reports</span>
                    </div>
                    <button
                      onClick={() => handleSearchJobs(job.title)}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                    >
                      Find Jobs →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSalaries.length === 0 && (
            <div className="text-center py-16">
              <FaChartLine className="text-6xl text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No salary data found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse different categories
              </p>
              <button
                onClick={() => {
                  setSearchTitle("");
                  setSelectedCategory("All");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Show All Salaries
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to find your dream job?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse thousands of job opportunities from companies offering competitive salaries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Browse Jobs
            </button>
            <button
              onClick={() => navigate('/resume-builder')}
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Build Resume
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Salaries;
