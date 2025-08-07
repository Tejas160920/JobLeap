import React, { useState } from "react";
import { 
  FaSearch, 
  FaStar, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaChartLine,
  FaBuilding,
  FaHeart,
  FaRegHeart,
  FaExternalLinkAlt,
  FaThumbsUp,
  FaThumbsDown,
  FaArrowUp
} from "react-icons/fa";
import { 
  MdWork, 
  MdBuild, 
  MdLocalLibrary, 
  MdHealthAndSafety,
  MdAccountBalance,
  MdStorefront,
  MdRestaurant,
  MdFlightTakeoff
} from "react-icons/md";

const industries = [
  { name: "Technology", icon: <MdWork className="text-2xl" />, color: "blue", count: "2,341" },
  { name: "Finance", icon: <MdAccountBalance className="text-2xl" />, color: "green", count: "1,892" },
  { name: "Healthcare", icon: <MdHealthAndSafety className="text-2xl" />, color: "red", count: "1,567" },
  { name: "Education", icon: <MdLocalLibrary className="text-2xl" />, color: "purple", count: "1,234" },
  { name: "Construction", icon: <MdBuild className="text-2xl" />, color: "orange", count: "987" },
  { name: "Retail", icon: <MdStorefront className="text-2xl" />, color: "pink", count: "1,445" },
  { name: "Food Service", icon: <MdRestaurant className="text-2xl" />, color: "yellow", count: "892" },
  { name: "Travel", icon: <MdFlightTakeoff className="text-2xl" />, color: "indigo", count: "534" },
];

const companies = [
  {
    name: "Google",
    reviews: 12053,
    rating: 4.8,
    logo: "https://logo.clearbit.com/google.com",
    location: "Mountain View, CA",
    size: "50,000+",
    industry: "Technology",
    ceo: "Sundar Pichai",
    ceoRating: 4.9,
    recommendPercent: 95,
    trending: true,
    pros: ["Great work-life balance", "Amazing benefits", "Innovation culture"],
    cons: ["High competition", "Complex bureaucracy"],
  },
  {
    name: "Microsoft",
    reviews: 9801,
    rating: 4.6,
    logo: "https://logo.clearbit.com/microsoft.com",
    location: "Redmond, WA",
    size: "25,000+",
    industry: "Technology",
    ceo: "Satya Nadella",
    ceoRating: 4.8,
    recommendPercent: 89,
    trending: false,
    pros: ["Excellent benefits", "Career growth", "Inclusive culture"],
    cons: ["Slow decision making", "Legacy systems"],
  },
  {
    name: "Netflix",
    reviews: 5421,
    rating: 4.7,
    logo: "https://logo.clearbit.com/netflix.com",
    location: "Los Gatos, CA",
    size: "15,000+",
    industry: "Entertainment",
    ceo: "Reed Hastings",
    ceoRating: 4.5,
    recommendPercent: 87,
    trending: true,
    pros: ["Creative freedom", "High compensation", "Fast-paced"],
    cons: ["High pressure", "Limited job security"],
  },
  {
    name: "Apple",
    reviews: 8934,
    rating: 4.9,
    logo: "https://logo.clearbit.com/apple.com",
    location: "Cupertino, CA",
    size: "30,000+",
    industry: "Technology",
    ceo: "Tim Cook",
    ceoRating: 4.7,
    recommendPercent: 93,
    trending: true,
    pros: ["Cutting-edge technology", "Premium products", "Great design culture"],
    cons: ["Secretive culture", "High expectations"],
  },
  {
    name: "Meta",
    reviews: 7654,
    rating: 4.4,
    logo: "https://logo.clearbit.com/meta.com",
    location: "Menlo Park, CA",
    size: "40,000+",
    industry: "Social Media",
    ceo: "Mark Zuckerberg",
    ceoRating: 4.2,
    recommendPercent: 82,
    trending: false,
    pros: ["Innovation focus", "Good compensation", "Learning opportunities"],
    cons: ["Work pressure", "Public scrutiny"],
  },
  {
    name: "Amazon",
    reviews: 15234,
    rating: 4.3,
    logo: "https://logo.clearbit.com/amazon.com",
    location: "Seattle, WA",
    size: "100,000+",
    industry: "E-commerce",
    ceo: "Andy Jassy",
    ceoRating: 4.1,
    recommendPercent: 79,
    trending: false,
    pros: ["Career advancement", "Global impact", "Diverse opportunities"],
    cons: ["Demanding culture", "Long hours"],
  },
];

const CompanyReviews = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState(new Set());

  const toggleFavorite = (companyName) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(companyName)) {
      newFavorites.delete(companyName);
    } else {
      newFavorites.add(companyName);
    }
    setFavorites(newFavorites);
  };

  const filteredCompanies = companies
    .filter(company => 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <main className="pt-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                great companies
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Get insider insights from millions of employee reviews
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Make informed career decisions with authentic company reviews, salary insights, and culture ratings
            </p>

            {/* Enhanced Search */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="flex-1 relative">
                    <FaBuilding className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Company name, industry, or location"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 text-lg border-0 focus:ring-0 outline-none placeholder-gray-500 rounded-xl"
                    />
                  </div>
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-lift flex items-center justify-center min-w-[160px]">
                    <FaSearch className="mr-2" />
                    Find Companies
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">50K+</div>
                <div className="text-gray-600 text-sm">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">2M+</div>
                <div className="text-gray-600 text-sm">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">500K+</div>
                <div className="text-gray-600 text-sm">Salaries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">1M+</div>
                <div className="text-gray-600 text-sm">Interviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Browse by Industry
            </h2>
            <p className="text-gray-600 text-lg">
              Explore companies across different sectors
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {industries.map((industry, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndustry(industry.name)}
                className={`group p-6 rounded-2xl border-2 transition-all duration-300 card-hover ${
                  selectedIndustry === industry.name
                    ? `border-${industry.color}-500 bg-${industry.color}-50`
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className={`text-${industry.color}-600 mb-3 flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {industry.icon}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{industry.name}</h3>
                <p className="text-xs text-gray-500">{industry.count} companies</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header with Filters */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Top Rated Companies
              </h2>
              <p className="text-gray-600">
                {filteredCompanies.length} companies found
                {selectedIndustry && ` in ${selectedIndustry}`}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FaFilter className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Company Name</option>
                </select>
              </div>
              {selectedIndustry && (
                <button
                  onClick={() => setSelectedIndustry("")}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear Filter
                </button>
              )}
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCompanies.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden card-hover transition-all duration-300 fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Company Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-xl font-bold text-gray-900">{company.name}</h3>
                          {company.trending && (
                            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              <FaArrowUp className="mr-1" />
                              Trending
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{company.industry}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleFavorite(company.name)}
                      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {favorites.has(company.name) ? (
                        <FaHeart className="text-red-500" />
                      ) : (
                        <FaRegHeart className="text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <FaStar
                            key={i}
                            className={i < Math.round(company.rating) ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-lg">{company.rating}</span>
                      <span className="text-gray-500 text-sm">
                        ({company.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-600">{company.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUsers className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-600">{company.size} employees</span>
                    </div>
                  </div>

                  {/* CEO Rating */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">CEO: {company.ceo}</p>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.round(company.ceoRating) ? "text-yellow-400" : "text-gray-300"}
                              size={12}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">{company.ceoRating}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{company.recommendPercent}%</div>
                      <div className="text-xs text-gray-500">Recommend</div>
                    </div>
                  </div>

                  {/* Pros and Cons Preview */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold text-green-700 mb-1 flex items-center">
                        <FaThumbsUp className="mr-1" /> Top Pros
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {company.pros.slice(0, 2).map((pro, i) => (
                          <li key={i}>• {pro}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-red-700 mb-1 flex items-center">
                        <FaThumbsDown className="mr-1" /> Areas to Improve
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {company.cons.slice(0, 2).map((con, i) => (
                          <li key={i}>• {con}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm">
                      View Reviews
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <FaExternalLinkAlt className="text-sm" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-16">
              <FaBuilding className="text-6xl text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No companies found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or browse by industry
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedIndustry("");
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Show All Companies
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CompanyReviews;
