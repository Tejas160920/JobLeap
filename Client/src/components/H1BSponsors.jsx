import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaBuilding,
  FaDollarSign,
  FaCheckCircle,
  FaChartLine,
  FaMapMarkerAlt,
  FaUsers,
  FaFilter,
  FaSpinner,
  FaSortAmountDown,
  FaSortAmountUp,
  FaInfoCircle,
  FaBriefcase,
  FaGlobe
} from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL + "/api" || "http://localhost:5000/api";

const H1BSponsors = () => {
  const [sponsors, setSponsors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    industry: "",
    sortBy: "totalLCAs",
    sortOrder: "desc"
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [salarySearch, setSalarySearch] = useState("");
  const [salaryResults, setSalaryResults] = useState(null);
  const [salaryLoading, setSalaryLoading] = useState(false);

  const industries = [
    "Technology",
    "IT Consulting",
    "Consulting",
    "Financial Services",
    "Semiconductors"
  ];

  useEffect(() => {
    fetchStats();
    fetchSponsors();
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchSponsors();
    }, 300);
    return () => clearTimeout(delaySearch);
  }, [searchTerm, filters]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/h1b/stats`);
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching H1B stats:", error);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchSponsors = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchTerm,
        industry: filters.industry,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        limit: 50
      });

      const response = await axios.get(`${API_URL}/h1b/sponsors?${params}`);
      if (response.data.success) {
        setSponsors(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchSalaries = async () => {
    if (!salarySearch.trim()) return;

    setSalaryLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/h1b/salaries?title=${encodeURIComponent(salarySearch)}`
      );
      if (response.data.success) {
        setSalaryResults(response.data);
      }
    } catch (error) {
      console.error("Error searching salaries:", error);
    } finally {
      setSalaryLoading(false);
    }
  };

  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(salary);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0d6d6e] to-[#095555]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              H1B Visa <span className="text-[#7dd3d5]">Sponsors</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Explore companies sponsoring H1B visas, compare salaries, and find your path to work in the USA
            </p>

            {/* Quick Stats */}
            {!statsLoading && stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{stats.overview.totalCompanies}</div>
                  <div className="text-sm text-gray-200">Top Sponsors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{formatNumber(stats.overview.totalLCAs)}</div>
                  <div className="text-sm text-gray-200">Total LCAs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{stats.overview.overallApprovalRate}%</div>
                  <div className="text-sm text-gray-200">Approval Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold">{formatSalary(stats.overview.avgSalary)}</div>
                  <div className="text-sm text-gray-200">Avg Salary</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Salary Search Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Search H1B Salaries by Job Title
          </h2>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Enter job title (e.g., Software Engineer, Data Scientist)"
                value={salarySearch}
                onChange={(e) => setSalarySearch(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && searchSalaries()}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
              />
            </div>
            <button
              onClick={searchSalaries}
              disabled={salaryLoading}
              className="px-6 py-3 bg-[#0d6d6e] text-white rounded-lg font-medium hover:bg-[#095555] transition-colors disabled:opacity-50"
            >
              {salaryLoading ? <FaSpinner className="animate-spin" /> : "Search"}
            </button>
          </div>

          {/* Salary Results */}
          {salaryResults && (
            <div className="mt-8">
              {salaryResults.stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">Min Salary</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatSalary(salaryResults.stats.min)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">Avg Salary</div>
                    <div className="text-xl font-bold text-[#0d6d6e]">
                      {formatSalary(salaryResults.stats.avg)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">Median</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatSalary(salaryResults.stats.median)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600">Max Salary</div>
                    <div className="text-xl font-bold text-gray-900">
                      {formatSalary(salaryResults.stats.max)}
                    </div>
                  </div>
                </div>
              )}

              <div className="text-sm text-gray-600 mb-4">
                Found {salaryResults.totalResults} results for "{salarySearch}"
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {salaryResults.data.slice(0, 20).map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <div className="font-medium text-gray-900">{result.company}</div>
                      <div className="text-sm text-gray-600">{result.jobTitle}</div>
                      <div className="text-xs text-gray-500">
                        {result.headquarters.city}, {result.headquarters.state} • {result.industry}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#0d6d6e]">
                        {formatSalary(result.avgSalary)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatNumber(result.openings)} positions
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sponsors List Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-xl">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                />
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaFilter />
                <span>Filters</span>
              </button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={filters.industry}
                      onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                    >
                      <option value="">All Industries</option>
                      {industries.map((industry) => (
                        <option key={industry} value={industry}>
                          {industry}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                    >
                      <option value="totalLCAs">Total LCAs</option>
                      <option value="avgSalary">Average Salary</option>
                      <option value="approvalRate">Approval Rate</option>
                      <option value="name">Company Name</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Order
                    </label>
                    <select
                      value={filters.sortOrder}
                      onChange={(e) => setFilters({ ...filters, sortOrder: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                    >
                      <option value="desc">Highest First</option>
                      <option value="asc">Lowest First</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sponsors Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <FaSpinner className="animate-spin text-4xl text-[#0d6d6e]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sponsors.map((company) => (
                <div
                  key={company.slug}
                  onClick={() => setSelectedCompany(company)}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{company.name}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-[#e6f3f3] text-[#0d6d6e] text-xs font-medium rounded">
                        {company.industry}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600">
                      <FaCheckCircle />
                      <span className="text-sm font-medium">{company.approvalRate}%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-sm text-gray-500">Total LCAs</div>
                      <div className="text-xl font-bold text-gray-900">
                        {formatNumber(company.totalLCAs)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Avg Salary</div>
                      <div className="text-xl font-bold text-[#0d6d6e]">
                        {formatSalary(company.avgSalary)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-sm text-gray-500">
                    <FaMapMarkerAlt className="mr-1" />
                    {company.headquarters.city}, {company.headquarters.state}
                  </div>

                  {/* Top Job Titles Preview */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-2">Top Roles:</div>
                    <div className="flex flex-wrap gap-1">
                      {company.topJobTitles.slice(0, 3).map((job, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {job.title.split(" ").slice(0, 2).join(" ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Company Detail Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedCompany.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 bg-[#e6f3f3] text-[#0d6d6e] text-sm font-medium rounded">
                      {selectedCompany.industry}
                    </span>
                    <span className="text-sm text-gray-500">
                      <FaMapMarkerAlt className="inline mr-1" />
                      {selectedCompany.headquarters.city}, {selectedCompany.headquarters.state}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatNumber(selectedCompany.totalLCAs)}
                  </div>
                  <div className="text-sm text-gray-600">Total LCAs</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedCompany.approvalRate}%
                  </div>
                  <div className="text-sm text-gray-600">Approval Rate</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-[#0d6d6e]">
                    {formatSalary(selectedCompany.avgSalary)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Salary</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatSalary(selectedCompany.maxSalary)}
                  </div>
                  <div className="text-sm text-gray-600">Max Salary</div>
                </div>
              </div>

              {/* Top Job Titles */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top H1B Job Titles
                </h3>
                <div className="space-y-3">
                  {selectedCompany.topJobTitles.map((job, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <div className="font-medium text-gray-900">{job.title}</div>
                        <div className="text-sm text-gray-500">
                          {formatNumber(job.count)} positions
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[#0d6d6e]">
                        {formatSalary(job.avgSalary)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Locations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Top Work Locations
                </h3>
                <div className="space-y-3">
                  {selectedCompany.topLocations.map((loc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium text-gray-900">
                            {loc.city}, {loc.state}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatNumber(loc.count)} positions
                          </div>
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[#0d6d6e]">
                        {formatSalary(loc.avgSalary)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yearly Trend */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Yearly Trend
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                        <th className="pb-2">Year</th>
                        <th className="pb-2">Total LCAs</th>
                        <th className="pb-2">Approved</th>
                        <th className="pb-2">Avg Salary</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCompany.yearlyData.map((year, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-3 font-medium">{year.year}</td>
                          <td className="py-3">{formatNumber(year.totalLCAs)}</td>
                          <td className="py-3">{formatNumber(year.approvedLCAs)}</td>
                          <td className="py-3 text-[#0d6d6e] font-medium">
                            {formatSalary(year.avgSalary)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Data Source Info */}
      <section className="py-8 bg-gray-100 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <FaInfoCircle className="mr-2" />
            <span>
              Data sourced from DOL OFLC LCA Disclosure Data (FY2024-2025).
              Updated quarterly.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default H1BSponsors;
