import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaStar,
  FaFilter,
  FaMapMarkerAlt,
  FaUsers,
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
  MdAccountBalance,
  MdHealthAndSafety,
  MdLocalLibrary,
  MdBuild,
  MdStorefront,
  MdRestaurant,
  MdFlightTakeoff
} from "react-icons/md";

const industries = [
  { name: "Technology", icon: <MdWork className="text-2xl" /> },
  { name: "Finance", icon: <MdAccountBalance className="text-2xl" /> },
  { name: "Healthcare", icon: <MdHealthAndSafety className="text-2xl" /> },
  { name: "Education", icon: <MdLocalLibrary className="text-2xl" /> },
  { name: "Construction", icon: <MdBuild className="text-2xl" /> },
  { name: "Retail", icon: <MdStorefront className="text-2xl" /> },
  { name: "Food Service", icon: <MdRestaurant className="text-2xl" /> },
  { name: "Travel", icon: <MdFlightTakeoff className="text-2xl" /> },
];

const companies = [
  {
    name: "Google",
    domain: "google.com",
    rating: 4.5,
    location: "Mountain View, CA",
    size: "150,000+",
    industry: "Technology",
    recommendPercent: 92,
    trending: true,
    pros: ["Great benefits", "Innovation culture", "Work-life balance"],
    cons: ["Competitive environment", "Large organization"],
    careersUrl: "https://careers.google.com"
  },
  {
    name: "Microsoft",
    domain: "microsoft.com",
    rating: 4.4,
    location: "Redmond, WA",
    size: "220,000+",
    industry: "Technology",
    recommendPercent: 89,
    trending: false,
    pros: ["Excellent work-life balance", "Strong mentorship", "Inclusive culture"],
    cons: ["Bureaucratic processes", "Slow decision making"],
    careersUrl: "https://careers.microsoft.com"
  },
  {
    name: "Apple",
    domain: "apple.com",
    rating: 4.3,
    location: "Cupertino, CA",
    size: "160,000+",
    industry: "Technology",
    recommendPercent: 88,
    trending: true,
    pros: ["Premium products", "Strong brand", "Creative environment"],
    cons: ["High pressure", "Secretive culture"],
    careersUrl: "https://jobs.apple.com"
  },
  {
    name: "Amazon",
    domain: "amazon.com",
    rating: 3.9,
    location: "Seattle, WA",
    size: "1,500,000+",
    industry: "Technology",
    recommendPercent: 75,
    trending: false,
    pros: ["Career growth", "Global impact", "Fast-paced"],
    cons: ["Work-life balance", "High expectations"],
    careersUrl: "https://amazon.jobs"
  },
  {
    name: "Meta",
    domain: "meta.com",
    rating: 4.1,
    location: "Menlo Park, CA",
    size: "85,000+",
    industry: "Technology",
    recommendPercent: 80,
    trending: false,
    pros: ["Great compensation", "Smart colleagues", "Modern tech"],
    cons: ["Uncertainty", "Public scrutiny"],
    careersUrl: "https://metacareers.com"
  },
  {
    name: "Netflix",
    domain: "netflix.com",
    rating: 4.4,
    location: "Los Gatos, CA",
    size: "12,000+",
    industry: "Technology",
    recommendPercent: 86,
    trending: true,
    pros: ["Freedom and responsibility", "Top compensation", "Innovative"],
    cons: ["High performance bar", "Keeper test culture"],
    careersUrl: "https://jobs.netflix.com"
  },
  {
    name: "Salesforce",
    domain: "salesforce.com",
    rating: 4.3,
    location: "San Francisco, CA",
    size: "75,000+",
    industry: "Technology",
    recommendPercent: 85,
    trending: false,
    pros: ["Strong values", "Good benefits", "Career development"],
    cons: ["Frequent reorganizations", "Complex product"],
    careersUrl: "https://salesforce.com/company/careers"
  },
  {
    name: "Stripe",
    domain: "stripe.com",
    rating: 4.5,
    location: "San Francisco, CA",
    size: "8,000+",
    industry: "Technology",
    recommendPercent: 91,
    trending: true,
    pros: ["Technical excellence", "Smart team", "Growth opportunities"],
    cons: ["High hiring bar", "Fast-paced"],
    careersUrl: "https://stripe.com/jobs"
  },
  {
    name: "Airbnb",
    domain: "airbnb.com",
    rating: 4.3,
    location: "San Francisco, CA",
    size: "6,000+",
    industry: "Travel",
    recommendPercent: 84,
    trending: true,
    pros: ["Strong mission", "Creative culture", "Travel perks"],
    cons: ["Competitive market", "High expectations"],
    careersUrl: "https://careers.airbnb.com"
  },
  {
    name: "JPMorgan Chase",
    domain: "jpmorganchase.com",
    rating: 4.0,
    location: "New York, NY",
    size: "270,000+",
    industry: "Finance",
    recommendPercent: 76,
    trending: false,
    pros: ["Strong compensation", "Career development", "Global reach"],
    cons: ["Long hours", "Corporate culture"],
    careersUrl: "https://careers.jpmorgan.com"
  },
  {
    name: "Goldman Sachs",
    domain: "goldmansachs.com",
    rating: 4.1,
    location: "New York, NY",
    size: "45,000+",
    industry: "Finance",
    recommendPercent: 78,
    trending: false,
    pros: ["Prestige", "Excellent training", "High compensation"],
    cons: ["Work-life balance", "Competitive"],
    careersUrl: "https://goldmansachs.com/careers"
  },
  {
    name: "Johnson & Johnson",
    domain: "jnj.com",
    rating: 4.2,
    location: "New Brunswick, NJ",
    size: "140,000+",
    industry: "Healthcare",
    recommendPercent: 82,
    trending: false,
    pros: ["Mission-driven", "Strong benefits", "Stable"],
    cons: ["Slow processes", "Large organization"],
    careersUrl: "https://jobs.jnj.com"
  },
  {
    name: "Pfizer",
    domain: "pfizer.com",
    rating: 4.0,
    location: "New York, NY",
    size: "80,000+",
    industry: "Healthcare",
    recommendPercent: 79,
    trending: true,
    pros: ["Impactful work", "Good benefits", "Research focus"],
    cons: ["Bureaucracy", "Restructuring"],
    careersUrl: "https://pfizer.com/about/careers"
  },
  {
    name: "Target",
    domain: "target.com",
    rating: 3.7,
    location: "Minneapolis, MN",
    size: "400,000+",
    industry: "Retail",
    recommendPercent: 68,
    trending: false,
    pros: ["Employee discounts", "Flexible hours", "Growth paths"],
    cons: ["Retail hours", "Seasonal pressure"],
    careersUrl: "https://corporate.target.com/careers"
  },
  {
    name: "Starbucks",
    domain: "starbucks.com",
    rating: 3.8,
    location: "Seattle, WA",
    size: "380,000+",
    industry: "Food Service",
    recommendPercent: 71,
    trending: false,
    pros: ["Benefits for part-time", "Free coffee", "Stock options"],
    cons: ["Busy environment", "Customer demands"],
    careersUrl: "https://starbucks.com/careers"
  },
  {
    name: "Marriott",
    domain: "marriott.com",
    rating: 3.8,
    location: "Bethesda, MD",
    size: "400,000+",
    industry: "Travel",
    recommendPercent: 70,
    trending: false,
    pros: ["Hotel discounts", "Global opportunities", "Career paths"],
    cons: ["Hospitality hours", "Guest demands"],
    careersUrl: "https://careers.marriott.com"
  },
  {
    name: "LinkedIn",
    domain: "linkedin.com",
    rating: 4.4,
    location: "Sunnyvale, CA",
    size: "20,000+",
    industry: "Technology",
    recommendPercent: 88,
    trending: true,
    pros: ["Great culture", "Learning opportunities", "Strong benefits"],
    cons: ["Microsoft integration", "Slow promotions"],
    careersUrl: "https://careers.linkedin.com"
  },
  {
    name: "Uber",
    domain: "uber.com",
    rating: 4.0,
    location: "San Francisco, CA",
    size: "30,000+",
    industry: "Technology",
    recommendPercent: 75,
    trending: false,
    pros: ["Fast-paced", "Innovative", "Global reach"],
    cons: ["High pressure", "Frequent changes"],
    careersUrl: "https://uber.com/careers"
  },
  {
    name: "Spotify",
    domain: "spotify.com",
    rating: 4.3,
    location: "Stockholm, Sweden",
    size: "9,000+",
    industry: "Technology",
    recommendPercent: 85,
    trending: true,
    pros: ["Creative culture", "Remote friendly", "Great perks"],
    cons: ["Competitive", "Rapid growth challenges"],
    careersUrl: "https://lifeatspotify.com"
  },
  {
    name: "Adobe",
    domain: "adobe.com",
    rating: 4.4,
    location: "San Jose, CA",
    size: "28,000+",
    industry: "Technology",
    recommendPercent: 87,
    trending: false,
    pros: ["Creative products", "Work-life balance", "Strong benefits"],
    cons: ["Subscription model concerns", "Large company politics"],
    careersUrl: "https://adobe.com/careers"
  },
  {
    name: "Shopify",
    domain: "shopify.com",
    rating: 4.2,
    location: "Ottawa, Canada",
    size: "11,000+",
    industry: "Technology",
    recommendPercent: 82,
    trending: true,
    pros: ["Remote-first", "Entrepreneurial culture", "Growth potential"],
    cons: ["Fast pace", "High expectations"],
    careersUrl: "https://shopify.com/careers"
  },
  {
    name: "Intel",
    domain: "intel.com",
    rating: 4.0,
    location: "Santa Clara, CA",
    size: "120,000+",
    industry: "Technology",
    recommendPercent: 78,
    trending: false,
    pros: ["Cutting-edge tech", "Good benefits", "Stable"],
    cons: ["Bureaucracy", "Slow innovation"],
    careersUrl: "https://intel.com/jobs"
  },
  {
    name: "IBM",
    domain: "ibm.com",
    rating: 3.9,
    location: "Armonk, NY",
    size: "280,000+",
    industry: "Technology",
    recommendPercent: 72,
    trending: false,
    pros: ["Legacy experience", "Global presence", "Training programs"],
    cons: ["Outdated culture", "Slow processes"],
    careersUrl: "https://ibm.com/careers"
  },
  {
    name: "Oracle",
    domain: "oracle.com",
    rating: 3.8,
    location: "Austin, TX",
    size: "140,000+",
    industry: "Technology",
    recommendPercent: 70,
    trending: false,
    pros: ["Enterprise scale", "Job security", "Good compensation"],
    cons: ["Corporate culture", "Dated technology"],
    careersUrl: "https://oracle.com/careers"
  },
  {
    name: "Cisco",
    domain: "cisco.com",
    rating: 4.1,
    location: "San Jose, CA",
    size: "80,000+",
    industry: "Technology",
    recommendPercent: 80,
    trending: false,
    pros: ["Work-life balance", "Strong benefits", "Inclusive"],
    cons: ["Slow innovation", "Matrix organization"],
    careersUrl: "https://cisco.com/jobs"
  },
  {
    name: "Deloitte",
    domain: "deloitte.com",
    rating: 4.0,
    location: "New York, NY",
    size: "400,000+",
    industry: "Finance",
    recommendPercent: 76,
    trending: false,
    pros: ["Career growth", "Diverse projects", "Global network"],
    cons: ["Long hours", "Travel requirements"],
    careersUrl: "https://deloitte.com/careers"
  },
  {
    name: "McKinsey",
    domain: "mckinsey.com",
    rating: 4.2,
    location: "New York, NY",
    size: "40,000+",
    industry: "Finance",
    recommendPercent: 82,
    trending: false,
    pros: ["Prestige", "Learning opportunities", "Exit opportunities"],
    cons: ["Demanding hours", "High pressure"],
    careersUrl: "https://mckinsey.com/careers"
  },
  {
    name: "Mayo Clinic",
    domain: "mayoclinic.org",
    rating: 4.3,
    location: "Rochester, MN",
    size: "75,000+",
    industry: "Healthcare",
    recommendPercent: 85,
    trending: false,
    pros: ["Mission-driven", "Patient focus", "Research opportunities"],
    cons: ["Non-profit salary", "Midwest location"],
    careersUrl: "https://jobs.mayoclinic.org"
  },
  {
    name: "CVS Health",
    domain: "cvshealth.com",
    rating: 3.6,
    location: "Woonsocket, RI",
    size: "300,000+",
    industry: "Healthcare",
    recommendPercent: 65,
    trending: false,
    pros: ["Healthcare benefits", "Stability", "Growth paths"],
    cons: ["Retail hours", "High pressure"],
    careersUrl: "https://jobs.cvshealth.com"
  },
  {
    name: "Costco",
    domain: "costco.com",
    rating: 4.0,
    location: "Issaquah, WA",
    size: "300,000+",
    industry: "Retail",
    recommendPercent: 78,
    trending: false,
    pros: ["Great pay for retail", "Good benefits", "Promotion from within"],
    cons: ["Physical work", "Limited locations"],
    careersUrl: "https://costco.com/jobs"
  },
  {
    name: "Walmart",
    domain: "walmart.com",
    rating: 3.4,
    location: "Bentonville, AR",
    size: "2,100,000+",
    industry: "Retail",
    recommendPercent: 58,
    trending: false,
    pros: ["Flexible scheduling", "Advancement opportunities", "Benefits"],
    cons: ["Low starting pay", "Demanding work"],
    careersUrl: "https://careers.walmart.com"
  },
  {
    name: "Chipotle",
    domain: "chipotle.com",
    rating: 3.5,
    location: "Newport Beach, CA",
    size: "100,000+",
    industry: "Food Service",
    recommendPercent: 62,
    trending: false,
    pros: ["Free food", "Fast advancement", "Young culture"],
    cons: ["Fast-paced", "Physical work"],
    careersUrl: "https://jobs.chipotle.com"
  },
  {
    name: "Hilton",
    domain: "hilton.com",
    rating: 4.0,
    location: "McLean, VA",
    size: "170,000+",
    industry: "Travel",
    recommendPercent: 78,
    trending: false,
    pros: ["Travel discounts", "Global brand", "Career growth"],
    cons: ["Hospitality hours", "Customer service demands"],
    careersUrl: "https://jobs.hilton.com"
  },
  {
    name: "Tesla",
    domain: "tesla.com",
    rating: 3.7,
    location: "Austin, TX",
    size: "130,000+",
    industry: "Technology",
    recommendPercent: 68,
    trending: true,
    pros: ["Innovative mission", "Cutting-edge tech", "Fast-paced"],
    cons: ["Long hours", "High pressure", "Demanding culture"],
    careersUrl: "https://tesla.com/careers"
  },
  {
    name: "SpaceX",
    domain: "spacex.com",
    rating: 4.0,
    location: "Hawthorne, CA",
    size: "13,000+",
    industry: "Technology",
    recommendPercent: 78,
    trending: true,
    pros: ["Revolutionary mission", "Brilliant colleagues", "Fast innovation"],
    cons: ["Extreme hours", "Burnout risk", "Low work-life balance"],
    careersUrl: "https://spacex.com/careers"
  },
  {
    name: "Nvidia",
    domain: "nvidia.com",
    rating: 4.5,
    location: "Santa Clara, CA",
    size: "26,000+",
    industry: "Technology",
    recommendPercent: 92,
    trending: true,
    pros: ["AI leadership", "Great compensation", "Innovation culture"],
    cons: ["High expectations", "Competitive"],
    careersUrl: "https://nvidia.com/careers"
  }
];

const CompanyReviews = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [favorites, setFavorites] = useState(new Set());
  const [imageErrors, setImageErrors] = useState(new Set());

  const toggleFavorite = (companyName) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(companyName)) {
      newFavorites.delete(companyName);
    } else {
      newFavorites.add(companyName);
    }
    setFavorites(newFavorites);
  };

  const handleImageError = (companyName) => {
    setImageErrors(prev => new Set([...prev, companyName]));
  };

  // Use multiple fallback sources for logos
  const getCompanyLogo = (company) => {
    if (imageErrors.has(company.name)) {
      return null;
    }
    // Try Google's favicon service first (most reliable, no CORS issues)
    return `https://www.google.com/s2/favicons?domain=${company.domain}&sz=64`;
  };

  const getCompanyInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();
  };

  const getInitialsBgColor = (name) => {
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-red-500',
      'bg-orange-500', 'bg-indigo-600', 'bg-pink-600', 'bg-teal-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const filteredCompanies = companies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === "" || company.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "recommend") return b.recommendPercent - a.recommendPercent;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <main className="pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Discover{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Great Companies
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore top companies and find your next career opportunity
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies, industries, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-8 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setSelectedIndustry("")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedIndustry === ""
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Industries
            </button>
            {industries.map((industry) => (
              <button
                key={industry.name}
                onClick={() => setSelectedIndustry(industry.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedIndustry === industry.name
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {industry.icon}
                {industry.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header with Sort */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div className="mb-4 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedIndustry || "All"} Companies
              </h2>
              <p className="text-gray-600">
                {filteredCompanies.length} companies found
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <FaFilter className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="rating">Highest Rated</option>
                <option value="recommend">Most Recommended</option>
                <option value="name">Company Name</option>
              </select>
            </div>
          </div>

          {/* Companies Grid */}
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-16">
              <FaBuilding className="text-6xl text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No companies found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or browse different industries
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompanies.map((company) => (
                <div
                  key={company.name}
                  className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-14 h-14 rounded-xl flex-shrink-0 flex items-center justify-center ${getInitialsBgColor(company.name)}`}>
                          <span className="text-white font-bold text-xl">{getCompanyInitials(company.name)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                            {company.trending && (
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                                <FaArrowUp className="mr-1" size={10} />
                                Trending
                              </span>
                            )}
                          </div>
                          <p className="text-gray-500 text-sm">{company.industry}</p>
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

                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <FaStar
                              key={i}
                              className={i < Math.round(company.rating) ? "text-yellow-400" : "text-gray-300"}
                              size={14}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{company.rating}</span>
                      </div>
                      <span className="text-green-600 font-semibold">
                        {company.recommendPercent}% recommend
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span>{company.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <FaUsers className="text-gray-400" />
                        <span>{company.size}</span>
                      </div>
                    </div>

                    {/* Pros */}
                    <div>
                      <h4 className="text-sm font-semibold text-green-700 mb-2 flex items-center">
                        <FaThumbsUp className="mr-2" size={12} /> Pros
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {company.pros.map((pro, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-green-500 mr-2">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Cons */}
                    <div>
                      <h4 className="text-sm font-semibold text-red-700 mb-2 flex items-center">
                        <FaThumbsDown className="mr-2" size={12} /> Cons
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {company.cons.map((con, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => navigate('/', { state: { companyFilter: company.name } })}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 text-sm"
                      >
                        View Jobs
                      </button>
                      <a
                        href={company.careersUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        title="Visit careers page"
                      >
                        <FaExternalLinkAlt size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <p className="text-gray-500 text-sm">
            Company information is curated from public sources. Click on any company to explore job opportunities.
          </p>
        </div>
      </section>
    </main>
  );
};

export default CompanyReviews;
