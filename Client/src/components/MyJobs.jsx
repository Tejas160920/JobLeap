import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSpinner,
  FaEye,
  FaUsers,
  FaClock,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

const MyJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "hiring") {
      navigate("/");
      return;
    }

    fetchMyJobs();
  }, [navigate]);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/jobs/my-jobs`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setJobs(data.jobs);
      } else {
        setError(data.message || "Failed to fetch jobs");
      }
    } catch (err) {
      setError("Failed to load your jobs");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (jobId) => {
    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setJobs(jobs.filter(job => job._id !== jobId));
        setDeleteConfirm(null);
      } else {
        alert(data.message || "Failed to delete job");
      }
    } catch (err) {
      alert("Failed to delete job");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    return `${Math.floor(diffDays / 7)} weeks ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <FaSpinner className="animate-spin text-4xl text-[#0d6d6e]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              My Job Postings
            </h1>
            <p className="text-gray-600">
              Manage and track all your job listings
            </p>
          </div>
          <button
            onClick={() => navigate("/post-job")}
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-[#0d6d6e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
          >
            <FaPlus />
            <span>Post New Job</span>
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FaBriefcase className="mx-auto text-5xl text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Jobs Posted Yet</h2>
            <p className="text-gray-600 mb-6">
              Start attracting top talent by posting your first job listing.
            </p>
            <button
              onClick={() => navigate("/post-job")}
              className="bg-[#0d6d6e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {job.title}
                        </h3>
                        <p className="text-gray-600 font-medium">{job.company}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        job.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'closed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {job.status || 'Active'}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-1.5 text-gray-400" />
                        {job.location}
                      </div>
                      {job.salary && (
                        <div className="flex items-center">
                          <FaDollarSign className="mr-1 text-gray-400" />
                          {job.salary}
                        </div>
                      )}
                      <div className="flex items-center">
                        <FaClock className="mr-1.5 text-gray-400" />
                        Posted {getTimeAgo(job.postedAt)}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <div className="flex items-center text-[#0d6d6e]">
                        <FaEye className="mr-1.5" />
                        {job.viewCount || 0} views
                      </div>
                      <div className="flex items-center text-[#0d6d6e]">
                        <FaUsers className="mr-1.5" />
                        {job.applicationCount || 0} applications
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 mt-4 lg:mt-0 lg:ml-6">
                    <button
                      onClick={() => navigate(`/edit-job/${job._id}`)}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(job._id)}
                      className="flex items-center space-x-2 px-4 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaTrash />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaTrash className="text-red-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Delete Job Posting?
                </h3>
                <p className="text-gray-600 mb-6">
                  This action cannot be undone. All applications for this job will also be removed.
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    disabled={isDeleting}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    disabled={isDeleting}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center"
                  >
                    {isDeleting ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Deleting...
                      </>
                    ) : (
                      "Delete Job"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
