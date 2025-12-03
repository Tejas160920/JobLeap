import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUserTie, FaSearch, FaSpinner } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Check if user already has a role selected (not needing role selection)
    const needsRoleSelection = localStorage.getItem('needsRoleSelection');
    if (needsRoleSelection !== 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleRoleSelect = async () => {
    if (!selectedRole) {
      setError('Please select a role to continue');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/auth/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: selectedRole })
      });

      const data = await response.json();

      if (data.success) {
        // Update localStorage with new token and role
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
        localStorage.removeItem('needsRoleSelection');

        // Dispatch auth change event
        window.dispatchEvent(new Event('authChange'));

        // Redirect based on role
        if (selectedRole === 'seeking') {
          navigate('/complete-profile');
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Failed to update role');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <FaBriefcase className="text-white text-xl" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JobLeap
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome! How will you use JobLeap?</h1>
            <p className="text-gray-600">Select your role to personalize your experience</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Role Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Job Seeker */}
            <button
              onClick={() => setSelectedRole('seeking')}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedRole === 'seeking'
                  ? 'border-blue-500 bg-blue-50 shadow-lg'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                selectedRole === 'seeking'
                  ? 'bg-blue-500'
                  : 'bg-gray-100'
              }`}>
                <FaSearch className={`text-2xl ${
                  selectedRole === 'seeking' ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">I'm looking for a job</h3>
              <p className="text-gray-600 text-sm">
                Browse job listings, apply to positions, track applications, and build your resume.
              </p>
              {selectedRole === 'seeking' && (
                <div className="mt-4 flex items-center text-blue-600 font-medium">
                  <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Selected
                </div>
              )}
            </button>

            {/* Recruiter/Employer */}
            <button
              onClick={() => setSelectedRole('hiring')}
              className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                selectedRole === 'hiring'
                  ? 'border-purple-500 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                selectedRole === 'hiring'
                  ? 'bg-purple-500'
                  : 'bg-gray-100'
              }`}>
                <FaUserTie className={`text-2xl ${
                  selectedRole === 'hiring' ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">I'm hiring</h3>
              <p className="text-gray-600 text-sm">
                Post job listings, review applications, and find the perfect candidates for your team.
              </p>
              {selectedRole === 'hiring' && (
                <div className="mt-4 flex items-center text-purple-600 font-medium">
                  <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Selected
                </div>
              )}
            </button>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleRoleSelect}
            disabled={!selectedRole || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <FaSpinner className="animate-spin mr-2" />
                Setting up...
              </div>
            ) : (
              'Continue'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
