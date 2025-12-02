import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaSpinner,
  FaTimes,
  FaEye,
  FaBuilding,
  FaArrowLeft,
  FaExternalLinkAlt
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";
import { ApplicationCardSkeleton, ListSkeleton } from "./LoadingSkeleton";

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [withdrawingId, setWithdrawingId] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchApplications();
  }, [navigate]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  const handleWithdraw = async (applicationId) => {
    if (!window.confirm("Are you sure you want to withdraw this application?")) {
      return;
    }

    setWithdrawingId(applicationId);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/applications/${applicationId}/withdraw`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();

      if (data.success) {
        setApplications(apps =>
          apps.map(app =>
            app._id === applicationId ? { ...app, status: 'withdrawn' } : app
          )
        );
      } else {
        alert(data.message || "Failed to withdraw application");
      }
    } catch (err) {
      console.error("Error withdrawing application:", err);
      alert("Failed to withdraw application");
    } finally {
      setWithdrawingId(null);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">Pending</span>,
      reviewed: <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Reviewed</span>,
      interview: <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">Interview</span>,
      offered: <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Offered</span>,
      accepted: <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Accepted</span>,
      rejected: <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Rejected</span>,
      withdrawn: <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">Withdrawn</span>
    };
    return badges[status] || <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">{status}</span>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6" />
            <div className="h-12 w-80 bg-gray-200 rounded animate-pulse mb-4" />
            <div className="h-6 w-64 bg-gray-200 rounded animate-pulse" />
          </div>
          <ListSkeleton count={3} CardComponent={ApplicationCardSkeleton} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Applications
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Track your job applications and their status
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-16">
            <FaBriefcase className="text-6xl text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No applications yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start applying for jobs to see them here. Your application history and status will be tracked.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Find Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {application.jobTitle}
                          {application.isExternal && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">External</span>
                          )}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <FaBuilding className="text-sm" />
                            <span>{application.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt className="text-sm" />
                            <span>{application.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <FaClock />
                            <span>Applied {formatDate(application.appliedAt)}</span>
                          </div>
                          {application.salary && (
                            <div className="flex items-center space-x-1">
                              <FaDollarSign />
                              <span>{application.salary}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="md:ml-4">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 md:mt-0 md:ml-6">
                    <button
                      onClick={() => handleViewDetails(application)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaEye />
                      <span>View Details</span>
                    </button>
                    {application.isExternal && application.url && (
                      <a
                        href={application.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 border border-blue-300 rounded-lg text-blue-700 hover:bg-blue-50 transition-colors"
                      >
                        <FaExternalLinkAlt />
                        <span>View Job</span>
                      </a>
                    )}
                    {application.status === 'pending' && (
                      <button
                        onClick={() => handleWithdraw(application._id)}
                        disabled={withdrawingId === application._id}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                      >
                        {withdrawingId === application._id ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaTimes />
                        )}
                        <span>Withdraw</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {selectedApplication.jobTitle}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <FaBuilding className="mr-3" />
                <span>{selectedApplication.company}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-3" />
                <span>{selectedApplication.location}</span>
              </div>
              {selectedApplication.salary && (
                <div className="flex items-center text-gray-600">
                  <FaDollarSign className="mr-3" />
                  <span>{selectedApplication.salary}</span>
                </div>
              )}
              <div className="flex items-center text-gray-600">
                <FaClock className="mr-3" />
                <span>Applied on {formatDate(selectedApplication.appliedAt)}</span>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Status</p>
                {getStatusBadge(selectedApplication.status)}
              </div>

              {selectedApplication.isExternal && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Job Type</p>
                  <span className="text-gray-700">{selectedApplication.jobType || 'Remote'}</span>
                </div>
              )}
            </div>

            <div className="flex space-x-4 mt-8">
              {selectedApplication.isExternal && selectedApplication.url && (
                <a
                  href={selectedApplication.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  View Original Job
                </a>
              )}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
