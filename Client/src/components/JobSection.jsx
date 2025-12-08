import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { FaSearch, FaSort, FaSpinner, FaArrowLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { API_BASE_URL } from '../config/api';

const JobSection = ({ filters, showAll, onBackToHome }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 8;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (filters.title) params.append('title', filters.title);
        if (filters.location) params.append('location', filters.location);

        const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
        const data = await response.json();

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
            <FaSpinner className="animate-spin text-3xl text-[#0d6d6e] mx-auto mb-4" />
            <p className="text-gray-500">Finding jobs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (jobs.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-center py-16">
          <FaSearch className="text-5xl text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            We couldn't find any jobs matching your criteria. Try adjusting your search.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#0d6d6e] text-white px-5 py-2 rounded-lg font-medium hover:bg-[#095555] transition-colors"
          >
            View All Jobs
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="jobs-section" className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          {!showAll && (
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-gray-600 hover:text-[#0d6d6e] text-sm mb-4 transition-colors"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back</span>
            </button>
          )}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-3 md:mb-0">
              <h2 className="text-xl font-semibold text-gray-900">
                {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
              </h2>
              {(filters.title || filters.location) && (
                <p className="text-sm text-gray-500">
                  {filters.title && `"${filters.title}"`}
                  {filters.title && filters.location && " in "}
                  {filters.location && `${filters.location}`}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-400 text-sm" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Job Title A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Job list */}
          <div className="xl:col-span-2 space-y-3">
            {currentJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                isSelected={selectedJob && job._id === selectedJob._id}
                onSelect={() => setSelectedJob(job)}
              />
            ))}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <FaChevronLeft className="text-xs" />
                  <span>Previous</span>
                </button>

                <span className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-1 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <span>Next</span>
                  <FaChevronRight className="text-xs" />
                </button>
              </div>
            )}
          </div>

          {/* Job details */}
          <div className="xl:col-span-3">
            <div className="sticky top-20 bg-white rounded-lg border border-gray-200">
              <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
                <JobDetails job={selectedJob} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSection;
