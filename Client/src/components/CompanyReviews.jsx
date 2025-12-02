import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  FaArrowUp,
  FaBriefcase
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
  { name: "Technology", icon: <MdWork className="text-2xl" />, color: "blue" },
  { name: "Finance", icon: <MdAccountBalance className="text-2xl" />, color: "green" },
  { name: "Healthcare", icon: <MdHealthAndSafety className="text-2xl" />, color: "red" },
  { name: "Education", icon: <MdLocalLibrary className="text-2xl" />, color: "purple" },
  { name: "Construction", icon: <MdBuild className="text-2xl" />, color: "orange" },
  { name: "Retail", icon: <MdStorefront className="text-2xl" />, color: "pink" },
  { name: "Food Service", icon: <MdRestaurant className="text-2xl" />, color: "yellow" },
  { name: "Travel", icon: <MdFlightTakeoff className="text-2xl" />, color: "indigo" },
];

const companies = [
  {
    name: "Google",
    reviews: 12053,
    rating: 4.8,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    location: "Mountain View, CA",
    size: "156,500+",
    industry: "Technology",
    ceo: "Sundar Pichai",
    ceoRating: 4.9,
    recommendPercent: 95,
    trending: true,
    pros: ["20% time for passion projects", "Amazing campus perks", "Innovation culture"],
    cons: ["High performance expectations", "Complex promotion process"],
  },
  {
    name: "Microsoft",
    reviews: 9801,
    rating: 4.6,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    location: "Redmond, WA",
    size: "221,000+",
    industry: "Technology",
    ceo: "Satya Nadella",
    ceoRating: 4.8,
    recommendPercent: 89,
    trending: false,
    pros: ["Excellent work-life balance", "Strong mentorship", "Inclusive culture"],
    cons: ["Bureaucratic processes", "Slow innovation cycles"],
  },
  {
    name: "Apple",
    reviews: 8934,
    rating: 4.9,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    location: "Cupertino, CA",
    size: "164,000+",
    industry: "Technology",
    ceo: "Tim Cook",
    ceoRating: 4.7,
    recommendPercent: 93,
    trending: true,
    pros: ["Cutting-edge technology", "Premium employee experience", "Strong brand reputation"],
    cons: ["Secretive work environment", "High stress levels"],
  },
  {
    name: "Amazon",
    reviews: 15234,
    rating: 4.3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    location: "Seattle, WA",
    size: "1,541,000+",
    industry: "E-commerce",
    ceo: "Andy Jassy",
    ceoRating: 4.1,
    recommendPercent: 79,
    trending: false,
    pros: ["Career advancement opportunities", "Global impact", "Ownership mentality"],
    cons: ["Demanding work culture", "High turnover rate"],
  },
  {
    name: "Meta",
    reviews: 7654,
    rating: 4.4,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    location: "Menlo Park, CA",
    size: "86,482+",
    industry: "Social Media",
    ceo: "Mark Zuckerberg",
    ceoRating: 4.2,
    recommendPercent: 82,
    trending: false,
    pros: ["Move fast mentality", "Generous compensation", "Learning opportunities"],
    cons: ["Uncertainty about future", "Public scrutiny"],
  },
  {
    name: "Tesla",
    reviews: 6543,
    rating: 4.2,
    logo: "https://logo.clearbit.com/tesla.com",
    location: "Austin, TX",
    size: "140,473+",
    industry: "Automotive",
    ceo: "Elon Musk",
    ceoRating: 3.9,
    recommendPercent: 78,
    trending: true,
    pros: ["Mission-driven work", "Innovation focus", "Rapid growth"],
    cons: ["Demanding hours", "Unpredictable leadership"],
  },
  {
    name: "Netflix",
    reviews: 5421,
    rating: 4.7,
    logo: "https://logo.clearbit.com/netflix.com",
    location: "Los Gatos, CA",
    size: "12,800+",
    industry: "Entertainment",
    ceo: "Ted Sarandos",
    ceoRating: 4.5,
    recommendPercent: 87,
    trending: true,
    pros: ["Creative freedom", "High compensation", "Flexible culture"],
    cons: ["Performance pressure", "Limited job security"],
  },
  {
    name: "Salesforce",
    reviews: 4892,
    rating: 4.5,
    logo: "https://logo.clearbit.com/salesforce.com",
    location: "San Francisco, CA",
    size: "79,390+",
    industry: "Technology",
    ceo: "Marc Benioff",
    ceoRating: 4.6,
    recommendPercent: 85,
    trending: false,
    pros: ["Strong company values", "Career development", "Great benefits"],
    cons: ["Frequent reorganizations", "Complex product ecosystem"],
  },
  {
    name: "Uber",
    reviews: 3764,
    rating: 4.1,
    logo: "https://logo.clearbit.com/uber.com",
    location: "San Francisco, CA",
    size: "32,800+",
    industry: "Transportation",
    ceo: "Dara Khosrowshahi",
    ceoRating: 4.3,
    recommendPercent: 76,
    trending: false,
    pros: ["Fast-paced environment", "Global impact", "Entrepreneurial spirit"],
    cons: ["Work-life balance challenges", "Constant change"],
  },
  {
    name: "Airbnb",
    reviews: 2987,
    rating: 4.6,
    logo: "https://logo.clearbit.com/airbnb.com",
    location: "San Francisco, CA",
    size: "6,407+",
    industry: "Travel",
    ceo: "Brian Chesky",
    ceoRating: 4.4,
    recommendPercent: 83,
    trending: true,
    pros: ["Strong mission", "Creative culture", "Travel perks"],
    cons: ["High expectations", "Limited career paths"],
  },
  {
    name: "Stripe",
    reviews: 1876,
    rating: 4.8,
    logo: "https://logo.clearbit.com/stripe.com",
    location: "San Francisco, CA",
    size: "8,000+",
    industry: "FinTech",
    ceo: "Patrick Collison",
    ceoRating: 4.7,
    recommendPercent: 92,
    trending: true,
    pros: ["Technical excellence", "Smart colleagues", "Growth opportunities"],
    cons: ["High bar for hiring", "Fast-paced environment"],
  },
  {
    name: "Spotify",
    reviews: 2543,
    rating: 4.4,
    logo: "https://logo.clearbit.com/spotify.com",
    location: "Stockholm, Sweden",
    size: "9,239+",
    industry: "Music",
    ceo: "Daniel Ek",
    ceoRating: 4.2,
    recommendPercent: 81,
    trending: false,
    pros: ["Music-focused culture", "Flexible work", "Creative environment"],
    cons: ["Limited US presence", "Competitive industry"],
  },
  // Finance Industry Companies
  {
    name: "JPMorgan Chase",
    reviews: 8967,
    rating: 4.0,
    logo: "https://logo.clearbit.com/jpmorganchase.com",
    location: "New York, NY",
    size: "271,025+",
    industry: "Finance",
    ceo: "Jamie Dimon",
    ceoRating: 4.1,
    recommendPercent: 73,
    trending: false,
    pros: ["Strong compensation", "Career development", "Global opportunities"],
    cons: ["Long hours", "High pressure environment"],
  },
  {
    name: "Goldman Sachs",
    reviews: 5432,
    rating: 4.2,
    logo: "https://logo.clearbit.com/goldmansachs.com",
    location: "New York, NY",
    size: "45,000+",
    industry: "Finance",
    ceo: "David Solomon",
    ceoRating: 3.8,
    recommendPercent: 78,
    trending: false,
    pros: ["Prestige and reputation", "Excellent training", "High compensation"],
    cons: ["Work-life balance challenges", "Competitive culture"],
  },
  {
    name: "Morgan Stanley",
    reviews: 4156,
    rating: 4.1,
    logo: "https://logo.clearbit.com/morganstanley.com",
    location: "New York, NY",
    size: "75,000+",
    industry: "Finance",
    ceo: "James Gorman",
    ceoRating: 4.0,
    recommendPercent: 76,
    trending: false,
    pros: ["Strong brand", "Learning opportunities", "Collaborative culture"],
    cons: ["Demanding schedules", "Bureaucratic processes"],
  },
  // Healthcare Industry Companies
  {
    name: "Johnson & Johnson",
    reviews: 7890,
    rating: 4.3,
    logo: "https://logo.clearbit.com/jnj.com",
    location: "New Brunswick, NJ",
    size: "144,500+",
    industry: "Healthcare",
    ceo: "Joaquin Duato",
    ceoRating: 4.2,
    recommendPercent: 82,
    trending: false,
    pros: ["Mission-driven work", "Strong benefits", "Work-life balance"],
    cons: ["Slow decision making", "Limited innovation speed"],
  },
  {
    name: "Pfizer",
    reviews: 6543,
    rating: 4.1,
    logo: "https://logo.clearbit.com/pfizer.com",
    location: "New York, NY",
    size: "83,000+",
    industry: "Healthcare",
    ceo: "Albert Bourla",
    ceoRating: 4.3,
    recommendPercent: 79,
    trending: true,
    pros: ["Cutting-edge research", "Global impact", "Professional development"],
    cons: ["Corporate bureaucracy", "Restructuring uncertainty"],
  },
  {
    name: "Kaiser Permanente",
    reviews: 12543,
    rating: 3.9,
    logo: "https://logo.clearbit.com/kp.org",
    location: "Oakland, CA",
    size: "218,000+",
    industry: "Healthcare",
    ceo: "Greg A. Adams",
    ceoRating: 3.7,
    recommendPercent: 71,
    trending: false,
    pros: ["Comprehensive benefits", "Job security", "Meaningful work"],
    cons: ["Bureaucratic culture", "Limited advancement"],
  },
  // Education Industry Companies
  {
    name: "Stanford University",
    reviews: 3456,
    rating: 4.5,
    logo: "https://logo.clearbit.com/stanford.edu",
    location: "Stanford, CA",
    size: "12,508+",
    industry: "Education",
    ceo: "Marc Tessier-Lavigne",
    ceoRating: 4.4,
    recommendPercent: 88,
    trending: false,
    pros: ["Prestigious institution", "Research opportunities", "Academic freedom"],
    cons: ["Academic politics", "High expectations"],
  },
  {
    name: "Pearson Education",
    reviews: 2890,
    rating: 3.8,
    logo: "https://logo.clearbit.com/pearson.com",
    location: "London, UK",
    size: "22,500+",
    industry: "Education",
    ceo: "Andy Bird",
    ceoRating: 3.6,
    recommendPercent: 68,
    trending: false,
    pros: ["Education mission", "Global reach", "Flexible work"],
    cons: ["Industry challenges", "Cost-cutting measures"],
  },
  // Construction Industry Companies
  {
    name: "Bechtel Corporation",
    reviews: 4567,
    rating: 4.0,
    logo: "https://logo.clearbit.com/bechtel.com",
    location: "San Francisco, CA",
    size: "55,000+",
    industry: "Construction",
    ceo: "Brendan Bechtel",
    ceoRating: 3.9,
    recommendPercent: 74,
    trending: false,
    pros: ["Major infrastructure projects", "Global opportunities", "Engineering excellence"],
    cons: ["Project-based employment", "Travel requirements"],
  },
  {
    name: "Turner Construction",
    reviews: 3234,
    rating: 3.7,
    logo: "https://logo.clearbit.com/turnerconstruction.com",
    location: "New York, NY",
    size: "10,000+",
    industry: "Construction",
    ceo: "Peter Davoren",
    ceoRating: 3.5,
    recommendPercent: 67,
    trending: false,
    pros: ["Diverse projects", "Career growth", "Strong safety culture"],
    cons: ["Long hours", "Demanding deadlines"],
  },
  // Retail Industry Companies
  {
    name: "Target Corporation",
    reviews: 15678,
    rating: 3.6,
    logo: "https://logo.clearbit.com/target.com",
    location: "Minneapolis, MN",
    size: "409,000+",
    industry: "Retail",
    ceo: "Brian Cornell",
    ceoRating: 3.8,
    recommendPercent: 65,
    trending: false,
    pros: ["Employee discounts", "Flexible schedules", "Advancement opportunities"],
    cons: ["Retail pressures", "Seasonal workload"],
  },
  {
    name: "Walmart",
    reviews: 23456,
    rating: 3.4,
    logo: "https://logo.clearbit.com/walmart.com",
    location: "Bentonville, AR",
    size: "2,300,000+",
    industry: "Retail",
    ceo: "Doug McMillon",
    ceoRating: 3.6,
    recommendPercent: 58,
    trending: false,
    pros: ["Job availability", "Benefits package", "Growth opportunities"],
    cons: ["Low wages", "High turnover"],
  },
  {
    name: "Home Depot",
    reviews: 18765,
    rating: 3.8,
    logo: "https://logo.clearbit.com/homedepot.com",
    location: "Atlanta, GA",
    size: "500,000+",
    industry: "Retail",
    ceo: "Ted Decker",
    ceoRating: 3.9,
    recommendPercent: 69,
    trending: false,
    pros: ["Product knowledge training", "Employee discounts", "Stable employment"],
    cons: ["Physical demands", "Weekend/holiday work"],
  },
  // Food Service Industry Companies
  {
    name: "McDonald's Corporation",
    reviews: 45678,
    rating: 3.2,
    logo: "https://logo.clearbit.com/mcdonalds.com",
    location: "Chicago, IL",
    size: "200,000+",
    industry: "Food Service",
    ceo: "Chris Kempczinski",
    ceoRating: 3.4,
    recommendPercent: 52,
    trending: false,
    pros: ["Flexible schedules", "Entry-level opportunities", "Management training"],
    cons: ["Fast-paced environment", "Low wages"],
  },
  {
    name: "Starbucks",
    reviews: 34567,
    rating: 3.9,
    logo: "https://logo.clearbit.com/starbucks.com",
    location: "Seattle, WA",
    size: "383,000+",
    industry: "Food Service",
    ceo: "Laxman Narasimhan",
    ceoRating: 3.7,
    recommendPercent: 71,
    trending: false,
    pros: ["Stock options", "Health benefits", "Free coffee"],
    cons: ["High-pressure environment", "Customer service demands"],
  },
  // Travel Industry Companies
  {
    name: "Marriott International",
    reviews: 8765,
    rating: 3.7,
    logo: "https://logo.clearbit.com/marriott.com",
    location: "Bethesda, MD",
    size: "440,000+",
    industry: "Travel",
    ceo: "Anthony Capuano",
    ceoRating: 3.6,
    recommendPercent: 66,
    trending: false,
    pros: ["Hotel discounts", "Global opportunities", "Career development"],
    cons: ["Hospitality hours", "Guest service pressure"],
  },
  {
    name: "Expedia Group",
    reviews: 4321,
    rating: 4.0,
    logo: "https://logo.clearbit.com/expediagroup.com",
    location: "Seattle, WA",
    size: "25,000+",
    industry: "Travel",
    ceo: "Peter Kern",
    ceoRating: 3.8,
    recommendPercent: 73,
    trending: false,
    pros: ["Travel perks", "Tech-focused culture", "Work-life balance"],
    cons: ["Industry volatility", "Competitive market"],
  }
];

const CompanyReviews = () => {
  const navigate = useNavigate();
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

  const viewCompanyReviews = (companyName) => {
    // Navigate to home with company filter to show jobs from this company
    navigate('/', { state: { companyFilter: companyName } });
  };

  const openCompanyWebsite = (companyName) => {
    const companyUrls = {
      'Google': 'https://careers.google.com',
      'Microsoft': 'https://careers.microsoft.com',
      'Apple': 'https://jobs.apple.com',
      'Amazon': 'https://amazon.jobs',
      'Meta': 'https://careers.facebook.com',
      'Tesla': 'https://tesla.com/careers',
      'Netflix': 'https://jobs.netflix.com',
      'Salesforce': 'https://salesforce.com/company/careers',
      'Uber': 'https://uber.com/careers',
      'Airbnb': 'https://careers.airbnb.com',
      'Stripe': 'https://stripe.com/jobs',
      'Spotify': 'https://spotifyforbrands.com/careers',
      'JPMorgan Chase': 'https://careers.jpmorgan.com',
      'Goldman Sachs': 'https://www.goldmansachs.com/careers',
      'Morgan Stanley': 'https://morganstanley.tal.net',
      'Johnson & Johnson': 'https://jobs.jnj.com',
      'Pfizer': 'https://www.pfizer.com/about/careers',
      'Kaiser Permanente': 'https://jobs.kaiserpermanente.org',
      'Stanford University': 'https://careers.stanford.edu',
      'Pearson Education': 'https://www.pearson.com/careers',
      'Bechtel Corporation': 'https://www.bechtel.com/careers',
      'Turner Construction': 'https://www.turnerconstruction.com/careers',
      'Target Corporation': 'https://corporate.target.com/careers',
      'Walmart': 'https://careers.walmart.com',
      'Home Depot': 'https://careers.homedepot.com',
      'McDonald\'s Corporation': 'https://careers.mcdonalds.com',
      'Starbucks': 'https://www.starbucks.com/careers',
      'Marriott International': 'https://careers.marriott.com',
      'Expedia Group': 'https://lifeatexpediagroup.com'
    };
    
    const url = companyUrls[companyName] || `https://${companyName.toLowerCase()}.com/careers`;
    window.open(url, '_blank');
  };


  const filteredCompanies = companies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.industry.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesIndustry = selectedIndustry === "" || company.industry === selectedIndustry;
      return matchesSearch && matchesIndustry;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <main className="pt-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
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
                  <button
                    onClick={() => setSearchTerm(searchTerm)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-lift flex items-center justify-center min-w-[160px]"
                  >
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
        <div className="max-w-7xl mx-auto px-6">
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
                <h3 className="font-semibold text-gray-900 text-sm">{industry.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
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
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 p-2 flex items-center justify-center">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="max-w-full max-h-full object-contain"
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
                    <button 
                      onClick={() => viewCompanyReviews(company.name)}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-sm"
                    >
                      View Reviews
                    </button>
                    <button 
                      onClick={() => openCompanyWebsite(company.name)}
                      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      title="Visit company careers page"
                    >
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
