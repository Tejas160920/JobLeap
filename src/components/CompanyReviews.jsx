import React from "react";
import { FaSearch, FaStar } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import { MdWork, MdBuild, MdLocalLibrary } from "react-icons/md";

const industries = [
  { name: "Technology", icon: <MdWork size={28} /> },
  { name: "Finance", icon: <FaSearch size={28} /> },
  { name: "Healthcare", icon: <FiBriefcase size={28} /> },
  { name: "Education", icon: <MdLocalLibrary size={28} /> },
  { name: "Construction", icon: <MdBuild size={28} /> },
  { name: "Retail", icon: <FaSearch size={28} /> },
];

const companies = [
  {
    name: "Google",
    reviews: 12053,
    rating: 4.8,
    logo: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Microsoft",
    reviews: 9801,
    rating: 4.6,
    logo: "https://logo.clearbit.com/microsoft.com",
  },
  {
    name: "Netflix",
    reviews: 5421,
    rating: 4.7,
    logo: "https://logo.clearbit.com/netflix.com",
  },
];

const CompanyReviews = () => {
  return (
    <main className="pt-24 px-6 md:px-16 bg-white min-h-screen">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Find great companies to work for
        </h1>
        <p className="text-gray-600 mt-4 text-lg">
          Get access to millions of company reviews
        </p>

        {/* Search Bar */}
        <div className="flex justify-center items-center mt-6 gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Company name or job title"
            className="px-5 py-3 border border-gray-300 rounded-md w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Find Companies
          </button>
        </div>
        <p className="mt-3 text-sm text-blue-600 hover:underline cursor-pointer">
          Do you want to search for salaries?
        </p>
      </section>

      {/* Browse by Industry */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Browse companies by industry
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((industry, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-md hover:scale-[1.02] transition"
            >
              <div className="text-blue-500 mb-2">{industry.icon}</div>
              <p className="text-sm text-center text-gray-700 font-medium">
                {industry.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Companies */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Popular companies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="w-12 h-12 rounded-full object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {company.name}
                </h3>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.round(company.rating) ? "text-yellow-500" : "text-gray-300"}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">
                    {company.reviews.toLocaleString()} reviews
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default CompanyReviews;
