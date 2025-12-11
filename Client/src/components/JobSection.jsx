import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import { FaSearch, FaFilter, FaSort, FaSpinner, FaArrowLeft, FaChevronLeft, FaChevronRight, FaTimes, FaPassport, FaBriefcase, FaMapMarkerAlt, FaBell, FaCheck } from "react-icons/fa";
import { API_BASE_URL } from '../config/api';

const JobSection = ({ filters, showAll, onBackToHome, onFiltersChange, triggerAlertPopup, onAlertPopupShown }) => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const JOBS_PER_PAGE = 20;

  // Local filter state for the filter panel
  const [localFilters, setLocalFilters] = useState({
    jobType: filters.jobType || '',
    visaSponsorship: filters.visaSponsorship || '',
    location: filters.location || ''
  });

  // Job Alert Modal state
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [alertFrequency, setAlertFrequency] = useState('daily');
  const [alertSaving, setAlertSaving] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const token = localStorage.getItem("token");

  // Sync local filters when props change
  useEffect(() => {
    setLocalFilters({
      jobType: filters.jobType || '',
      visaSponsorship: filters.visaSponsorship || '',
      location: filters.location || ''
    });
  }, [filters]);

  // Generate alert name from filters
  const generateAlertName = () => {
    const parts = [];
    if (filters.title) parts.push(filters.title);
    if (filters.location) parts.push(filters.location);
    if (filters.jobType) parts.push(filters.jobType);
    if (filters.visaSponsorship) parts.push('Visa Sponsorship');
    return parts.length > 0 ? parts.join(' - ') : 'All Jobs';
  };

  // Open alert modal (for manual creation or after applying filters)
  const openAlertModal = (autoGenName = true) => {
    if (!token) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }
    if (autoGenName) {
      setAlertName(generateAlertName());
    }
    setAlertSuccess(false);
    setShowAlertModal(true);
  };

  // Save job alert
  const saveJobAlert = async () => {
    if (!token || !alertName.trim()) return;

    setAlertSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/job-alerts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: alertName.trim(),
          filters: {
            title: filters.title || '',
            location: filters.location || '',
            jobType: filters.jobType || '',
            visaSponsorship: filters.visaSponsorship || ''
          },
          frequency: alertFrequency
        })
      });

      if (response.ok) {
        setAlertSuccess(true);
        setTimeout(() => {
          setShowAlertModal(false);
          setAlertSuccess(false);
          setAlertName('');
        }, 2000);
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to create alert');
      }
    } catch (error) {
      console.error('Error creating alert:', error);
      alert('Failed to create alert');
    } finally {
      setAlertSaving(false);
    }
  };

  // Check if any filters are active
  const hasActiveFilters = filters.title || filters.location || filters.jobType || filters.visaSponsorship;

  // Trigger alert popup from parent (after search from Hero)
  useEffect(() => {
    if (triggerAlertPopup && token && hasActiveFilters) {
      openAlertModal();
      if (onAlertPopupShown) {
        onAlertPopupShown();
      }
    }
  }, [triggerAlertPopup]);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Build query string with ALL filter params
        const params = new URLSearchParams();
        if (filters.title) params.append('title', filters.title);
        if (filters.location) params.append('location', filters.location);
        if (filters.jobType) params.append('jobType', filters.jobType);
        if (filters.visaSponsorship) params.append('visaSponsorship', filters.visaSponsorship);

        // Fetch from real API (local DB + GitHub repos + APIs)
        const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
        const data = await response.json();

        // Handle both old format (array) and new format (object with jobs array)
        let jobsData = Array.isArray(data) ? data : (data.jobs || []);

        // Sort jobs based on selected criteria
        if (sortBy === "recent") {
          jobsData.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));
        } else if (sortBy === "title") {
          jobsData.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        }

        setJobs(jobsData);
        setTotalJobs(jobsData.length);
        setCurrentPage(1);
        setSelectedJob(jobsData[0] || null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setTotalJobs(0);
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
              {totalJobs.toLocaleString()} Job{totalJobs !== 1 ? 's' : ''} Found
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
          
          <div className="flex items-center space-x-3">
            {/* Create Alert Button - always visible */}
            {token && hasActiveFilters && (
              <button
                onClick={() => openAlertModal()}
                className="flex items-center space-x-2 border border-[#0d6d6e] text-[#0d6d6e] rounded-lg px-4 py-2 hover:bg-[#e6f3f3] transition-colors"
              >
                <FaBell />
                <span className="hidden sm:inline">Create Alert</span>
              </button>
            )}
            <div className="flex items-center space-x-2">
              <FaSort className="text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#0d6d6e] focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Job Title A-Z</option>
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 border rounded-lg px-4 py-2 transition-colors ${
                showFilters || filters.jobType || filters.visaSponsorship
                  ? 'border-[#0d6d6e] bg-[#e6f3f3] text-[#0d6d6e]'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <FaFilter />
              <span>Filters</span>
              {(filters.jobType || filters.visaSponsorship) && (
                <span className="bg-[#0d6d6e] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {[filters.jobType, filters.visaSponsorship].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Filter Jobs</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Job Type Filter */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaBriefcase className="mr-2 text-gray-400" />
                  Job Type
                </label>
                <select
                  value={localFilters.jobType}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, jobType: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              {/* Visa Sponsorship Filter */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaPassport className="mr-2 text-gray-400" />
                  Visa Sponsorship
                </label>
                <select
                  value={localFilters.visaSponsorship}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, visaSponsorship: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                >
                  <option value="">Any</option>
                  <option value="sponsors">Sponsors H1B/Visa</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <FaMapMarkerAlt className="mr-2 text-gray-400" />
                  Location
                </label>
                <input
                  type="text"
                  value={localFilters.location}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, state, or remote"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => openAlertModal()}
                className="flex items-center space-x-2 px-4 py-2 text-[#0d6d6e] hover:bg-[#e6f3f3] rounded-lg transition-colors"
              >
                <FaBell />
                <span>Create Job Alert</span>
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setLocalFilters({ jobType: '', visaSponsorship: '', location: '' });
                    if (onFiltersChange) {
                      onFiltersChange({ ...filters, jobType: '', visaSponsorship: '', location: '' });
                    }
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => {
                    if (onFiltersChange) {
                      onFiltersChange({
                        ...filters,
                        jobType: localFilters.jobType,
                        visaSponsorship: localFilters.visaSponsorship,
                        location: localFilters.location || filters.location
                      });
                    }
                    setShowFilters(false);
                    // Show alert popup if filters are applied and user is logged in
                    if (token && (localFilters.jobType || localFilters.visaSponsorship || localFilters.location || filters.title)) {
                      setTimeout(() => openAlertModal(), 500);
                    }
                  }}
                  className="px-4 py-2 bg-[#0d6d6e] text-white rounded-lg hover:bg-[#095555] transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
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
              
              <div className="flex items-center space-x-1">
                {/* First page */}
                {currentPage > 3 && (
                  <>
                    <button
                      onClick={() => setCurrentPage(1)}
                      className="px-3 py-2 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      1
                    </button>
                    {currentPage > 4 && <span className="text-gray-500 px-1">...</span>}
                  </>
                )}

                {/* Page numbers around current */}
                {Array.from({ length: 5 }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(currentPage - 2, totalPages - 4)) + i;
                  if (pageNum < 1 || pageNum > totalPages) return null;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                        currentPage === pageNum
                          ? 'bg-[#0d6d6e] text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Last page */}
                {currentPage < totalPages - 2 && (
                  <>
                    {currentPage < totalPages - 3 && <span className="text-gray-500 px-1">...</span>}
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-2 rounded-lg font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      {totalPages}
                    </button>
                  </>
                )}
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

      {/* Job Alert Modal */}
      {showAlertModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {alertSuccess ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="text-green-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Alert Created!</h3>
                <p className="text-gray-600">You'll be notified when new matching jobs are posted.</p>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-[#e6f3f3] rounded-full flex items-center justify-center">
                      <FaBell className="text-[#0d6d6e]" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">Create Job Alert</h2>
                      <p className="text-sm text-gray-500">Get notified about new matching jobs</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAlertModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="px-6 py-4 space-y-4">
                  {/* Current filters summary */}
                  {hasActiveFilters && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Alert will match jobs with:</p>
                      <div className="flex flex-wrap gap-2">
                        {filters.title && (
                          <span className="px-2 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
                            {filters.title}
                          </span>
                        )}
                        {filters.location && (
                          <span className="px-2 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
                            {filters.location}
                          </span>
                        )}
                        {filters.jobType && (
                          <span className="px-2 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
                            {filters.jobType}
                          </span>
                        )}
                        {filters.visaSponsorship && (
                          <span className="px-2 py-1 bg-white border border-gray-200 rounded text-sm text-gray-700">
                            Visa Sponsorship
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Alert Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alert Name
                    </label>
                    <input
                      type="text"
                      value={alertName}
                      onChange={(e) => setAlertName(e.target.value)}
                      placeholder="e.g., Remote Software Engineer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6d6e] focus:border-transparent"
                      maxLength={100}
                    />
                  </div>

                  </div>

                <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowAlertModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Maybe Later
                  </button>
                  <button
                    onClick={saveJobAlert}
                    disabled={!alertName.trim() || alertSaving}
                    className="px-4 py-2 bg-[#0d6d6e] text-white text-sm font-medium rounded-lg hover:bg-[#095555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {alertSaving ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Creating...</span>
                      </>
                    ) : (
                      <>
                        <FaBell />
                        <span>Create Alert</span>
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default JobSection;
