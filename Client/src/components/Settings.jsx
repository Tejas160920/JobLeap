import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBell,
  FaShieldAlt,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
  FaArrowLeft,
  FaSpinner,
  FaCheckCircle,
  FaExclamationCircle
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

const Settings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    jobAlerts: true,
    marketingEmails: false,
    profileVisibility: 'public',
    twoFactorAuth: false
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch current settings from API
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/settings`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();

        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      } catch (err) {
        console.error("Error fetching settings:", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchSettings();
  }, [navigate]);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    setSaveStatus(null);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    setSaveStatus(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/auth/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      const data = await res.json();

      if (data.success) {
        setSaveStatus('success');
        setTimeout(() => setSaveStatus(null), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/auth/account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ password: deletePassword })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.clear();
        navigate('/');
      } else {
        setDeleteError(data.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setDeleteError("An error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            Account{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Settings
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="space-y-8">
          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaBell className="text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <p className="text-gray-600">Manage how you receive notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive important updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Job Alerts</h3>
                  <p className="text-sm text-gray-600">Get notified about new job matches</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.jobAlerts}
                    onChange={(e) => handleSettingChange('jobAlerts', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Marketing Emails</h3>
                  <p className="text-sm text-gray-600">Receive promotional content and tips</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.marketingEmails}
                    onChange={(e) => handleSettingChange('marketingEmails', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Privacy</h2>
                <p className="text-gray-600">Control your privacy and visibility</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Profile Visibility</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="public"
                      checked={settings.profileVisibility === 'public'}
                      onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">Public</span>
                      <p className="text-sm text-gray-600">Visible to all employers and recruiters</p>
                    </div>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="profileVisibility"
                      value="private"
                      checked={settings.profileVisibility === 'private'}
                      onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                      className="mr-3 text-blue-600"
                    />
                    <div>
                      <span className="font-medium">Private</span>
                      <p className="text-sm text-gray-600">Only visible when you apply for jobs</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.twoFactorAuth}
                    onChange={(e) => handleSettingChange('twoFactorAuth', e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FaUser className="text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Account Management</h2>
                <p className="text-gray-600">Manage your account data and preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => navigate('/complete-profile')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <FaEdit className="text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Edit Profile</h3>
                    <p className="text-sm text-gray-600">Update your personal information and preferences</p>
                  </div>
                </div>
                <div className="text-gray-400">→</div>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full flex items-center justify-between p-4 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <FaTrash className="text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-900">Delete Account</h3>
                    <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                  </div>
                </div>
                <div className="text-red-400">→</div>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-end space-x-4">
            {saveStatus === 'success' && (
              <div className="flex items-center space-x-2 text-green-600">
                <FaCheckCircle />
                <span>Settings saved!</span>
              </div>
            )}
            {saveStatus === 'error' && (
              <div className="flex items-center space-x-2 text-red-600">
                <FaExclamationCircle />
                <span>Error saving settings</span>
              </div>
            )}
            <button
              onClick={handleSaveSettings}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <FaSpinner className="animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <FaCheck />
                  <span>Save Settings</span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-red-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Account</h3>
              <p className="text-gray-600">
                This action is permanent and cannot be undone. All your data will be deleted.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your password to confirm
              </label>
              <input
                type="password"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
              {deleteError && (
                <p className="mt-2 text-sm text-red-600">{deleteError}</p>
              )}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeletePassword("");
                  setDeleteError("");
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting || !deletePassword}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <span className="flex items-center justify-center space-x-2">
                    <FaSpinner className="animate-spin" />
                    <span>Deleting...</span>
                  </span>
                ) : (
                  'Delete Account'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;