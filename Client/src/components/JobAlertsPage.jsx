import React, { useState, useEffect } from "react";
import { FaBell, FaPlus, FaTrash, FaEdit, FaToggleOn, FaToggleOff, FaMapMarkerAlt, FaBriefcase, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const JobAlertsPage = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    filters: {
      title: "",
      location: "",
      jobType: "",
      visaSponsorship: ""
    },
    frequency: "daily"
  });

  const token = localStorage.getItem("token");

  // Redirect if not logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch alerts
  const fetchAlerts = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/job-alerts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts || []);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Create or update alert
  const saveAlert = async () => {
    if (!token || !formData.name.trim()) return;

    try {
      const url = editingAlert
        ? `${API_URL}/api/job-alerts/${editingAlert._id}`
        : `${API_URL}/api/job-alerts`;

      const response = await fetch(url, {
        method: editingAlert ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchAlerts();
        closeModal();
      } else {
        const data = await response.json();
        alert(data.message || "Failed to save alert");
      }
    } catch (error) {
      console.error("Error saving alert:", error);
      alert("Failed to save alert");
    }
  };

  // Delete alert
  const deleteAlert = async (alertId) => {
    if (!token || !confirm("Are you sure you want to delete this alert?")) return;

    try {
      const response = await fetch(`${API_URL}/api/job-alerts/${alertId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        setAlerts(prev => prev.filter(a => a._id !== alertId));
      }
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  // Toggle alert active status
  const toggleAlert = async (alertId) => {
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/api/job-alerts/${alertId}/toggle`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAlerts(prev =>
          prev.map(a => (a._id === alertId ? { ...a, isActive: data.alert.isActive } : a))
        );
      }
    } catch (error) {
      console.error("Error toggling alert:", error);
    }
  };

  // Open modal for editing
  const openEditModal = (alert) => {
    setEditingAlert(alert);
    setFormData({
      name: alert.name,
      filters: { ...alert.filters },
      frequency: alert.frequency
    });
    setShowModal(true);
  };

  // Open modal for creating
  const openCreateModal = () => {
    setEditingAlert(null);
    setFormData({
      name: "",
      filters: {
        title: "",
        location: "",
        jobType: "",
        visaSponsorship: ""
      },
      frequency: "daily"
    });
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setEditingAlert(null);
    setFormData({
      name: "",
      filters: {
        title: "",
        location: "",
        jobType: "",
        visaSponsorship: ""
      },
      frequency: "daily"
    });
  };

  // Format filter display
  const formatFilters = (filters) => {
    const parts = [];
    if (filters.title) parts.push(filters.title);
    if (filters.location) parts.push(filters.location);
    if (filters.jobType) parts.push(filters.jobType);
    if (filters.visaSponsorship === "yes") parts.push("Visa Sponsorship");
    return parts.length > 0 ? parts.join(" • ") : "All jobs";
  };

  useEffect(() => {
    fetchAlerts();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Alerts</h1>
            <p className="text-sm text-gray-500 mt-1">
              Get notified when new jobs match your criteria
            </p>
          </div>
          <button
            onClick={openCreateModal}
            disabled={alerts.length >= 10}
            className="flex items-center space-x-2 px-4 py-2 bg-[#0d6d6e] text-white rounded-lg text-sm font-medium hover:bg-[#095555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPlus className="text-xs" />
            <span>Create Alert</span>
          </button>
        </div>

        {/* Info Banner */}
        {alerts.length >= 10 && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-800">
              You've reached the maximum of 10 job alerts. Delete an existing alert to create a new one.
            </p>
          </div>
        )}

        {/* Alerts List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-[#0d6d6e] border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-500 mt-3">Loading job alerts...</p>
            </div>
          ) : alerts.length === 0 ? (
            <div className="p-12 text-center">
              <FaBell className="text-gray-300 text-5xl mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No job alerts yet</h3>
              <p className="text-gray-500 mb-6">
                Create your first job alert to get notified when new matching jobs are posted.
              </p>
              <button
                onClick={openCreateModal}
                className="px-6 py-2 bg-[#0d6d6e] text-white rounded-lg text-sm font-medium hover:bg-[#095555] transition-colors"
              >
                Create Your First Alert
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {alerts.map((alert) => (
                <div
                  key={alert._id}
                  className={`px-6 py-4 ${!alert.isActive ? "opacity-60" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-900">{alert.name}</h3>
                        {!alert.isActive && (
                          <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                            Paused
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatFilters(alert.filters)}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
                        {alert.matchCount > 0 && (
                          <span>{alert.matchCount} jobs matched</span>
                        )}
                        {alert.lastNotified && (
                          <span>
                            Last notified: {new Date(alert.lastNotified).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleAlert(alert._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          alert.isActive
                            ? "text-[#0d6d6e] hover:bg-[#e6f3f3]"
                            : "text-gray-400 hover:bg-gray-100"
                        }`}
                        title={alert.isActive ? "Pause alert" : "Activate alert"}
                      >
                        {alert.isActive ? (
                          <FaToggleOn className="text-xl" />
                        ) : (
                          <FaToggleOff className="text-xl" />
                        )}
                      </button>
                      <button
                        onClick={() => openEditModal(alert)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteAlert(alert._id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* How it works */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4">How Job Alerts Work</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#e6f3f3] text-[#0d6d6e] rounded-full flex items-center justify-center text-xs font-medium">1</span>
              <p>Create an alert with your desired job criteria (title, location, job type)</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#e6f3f3] text-[#0d6d6e] rounded-full flex items-center justify-center text-xs font-medium">2</span>
              <p>We check for new matching jobs and notify you</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-[#e6f3f3] text-[#0d6d6e] rounded-full flex items-center justify-center text-xs font-medium">3</span>
              <p>Get notified via in-app notification and email when new matching jobs are posted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingAlert ? "Edit Job Alert" : "Create Job Alert"}
              </h2>
            </div>

            <div className="px-6 py-4 space-y-4">
              {/* Alert Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alert Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Remote Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6d6e] focus:border-transparent"
                  maxLength={100}
                />
              </div>

              {/* Job Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title / Keywords
                </label>
                <input
                  type="text"
                  value={formData.filters.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      filters: { ...formData.filters, title: e.target.value }
                    })
                  }
                  placeholder="e.g., Software Engineer, Product Manager"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6d6e] focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.filters.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      filters: { ...formData.filters, location: e.target.value }
                    })
                  }
                  placeholder="e.g., San Francisco, Remote"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6d6e] focus:border-transparent"
                />
              </div>

              {/* Job Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Type
                </label>
                <select
                  value={formData.filters.jobType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      filters: { ...formData.filters, jobType: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6d6e] focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              {/* Visa Sponsorship */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visa Sponsorship
                </label>
                <select
                  value={formData.filters.visaSponsorship}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      filters: { ...formData.filters, visaSponsorship: e.target.value }
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d6d6e] focus:border-transparent"
                >
                  <option value="">Any</option>
                  <option value="yes">Yes - Visa Sponsorship Available</option>
                </select>
              </div>

              </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveAlert}
                disabled={!formData.name.trim()}
                className="px-4 py-2 bg-[#0d6d6e] text-white text-sm font-medium rounded-lg hover:bg-[#095555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingAlert ? "Save Changes" : "Create Alert"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobAlertsPage;
