import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { FaSearch, FaFilter, FaSort, FaSpinner, FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { API_BASE_URL } from '../config/api';

const JobSection = ({ filters, showAll, onBackToHome }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 8;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Build query string
        const params = new URLSearchParams();
        if (filters.title) params.append('title', filters.title);
        if (filters.location) params.append('location', filters.location);
        if (filters.visaSponsorship) params.append('visaSponsorship', filters.visaSponsorship);

        // Fetch from real API (local DB + RemoteOK)
        const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
        const data = await response.json();

        // Sort jobs based on selected criteria
        let sortedData = [...data];
        if (sortBy === "recent") {
          sortedData.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        } else if (sortBy === "title") {
          sortedData.sort((a, b) => a.title.localeCompare(b.title));
        }

        setJobs(sortedData);
        setCurrentPage(1);
        setSelectedJob(sortedData[0] || null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [filters, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(jobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Update selected job when page changes
  useEffect(() => {
    if (currentJobs.length > 0 && (!selectedJob || !currentJobs.some(job => job._id === selectedJob._id))) {
      setSelectedJob(currentJobs[0]);
    }
  }, [currentPage, currentJobs]);

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Finding the best jobs for you...</p>
          </div>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-16">
          <FaSearch className="text-6xl text-gray-400 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No jobs found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any jobs matching your search criteria. Try adjusting your filters or search terms.
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View All Jobs
            </button>
            <button 
              onClick={() => setShowFilters(true)}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Adjust Filters
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* Back button and Results header */}
      <div className="mb-8">
        {!showAll && (
          <div className="mb-6">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Home</span>
            </button>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {jobs.length} Job{jobs.length !== 1 ? 's' : ''} Found
              {totalPages > 1 && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  (Page {currentPage} of {totalPages})
                </span>
              )}
            </h2>
            <p className="text-gray-600">
              {filters.title && `For "${filters.title}"`}
              {filters.title && filters.location && " in "}
              {filters.location && `"${filters.location}"`}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Job Title A-Z</option>
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
            >
              <FaFilter />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Job list */}
        <div className="xl:col-span-2 space-y-4">
          {currentJobs.map((job, index) => (
            <div key={job._id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <JobCard
                job={job}
                isSelected={selectedJob && job._id === selectedJob._id}
                onSelect={() => setSelectedJob(job)}
              />
            </div>
          ))}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaChevronLeft />
                <span>Previous</span>
              </button>
              
              <div className="flex items-center space-x-2">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                {totalPages > 5 && <span className="text-gray-500">...</span>}
              </div>
              
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {/* Job details - Improved positioning */}
        <div className="xl:col-span-3">
          <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="max-h-[85vh] overflow-y-auto">
              <JobDetails job={selectedJob} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
