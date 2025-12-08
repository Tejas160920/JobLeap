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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">

      <div className="relative w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-[#0d6d6e] rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-white text-lg" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
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
              className={`p-6 rounded-lg border-2 transition-colors text-left ${
                selectedRole === 'seeking'
                  ? 'border-[#0d6d6e] bg-[#e6f3f3]'
                  : 'border-gray-200 hover:border-[#0d6d6e]/50 hover:bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                selectedRole === 'seeking'
                  ? 'bg-[#0d6d6e]'
                  : 'bg-gray-100'
              }`}>
                <FaSearch className={`text-xl ${
                  selectedRole === 'seeking' ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">I'm looking for a job</h3>
              <p className="text-gray-600 text-sm">
                Browse job listings, apply to positions, track applications, and build your resume.
              </p>
              {selectedRole === 'seeking' && (
                <div className="mt-4 flex items-center text-[#0d6d6e] font-medium">
                  <span className="w-5 h-5 bg-[#0d6d6e] rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs">✓</span>
                  </span>
                  Selected
                </div>
              )}
            </button>

            {/* Recruiter/Employer */}
            <button
              onClick={() => setSelectedRole('hiring')}
              className={`p-6 rounded-lg border-2 transition-colors text-left ${
                selectedRole === 'hiring'
                  ? 'border-[#0d6d6e] bg-[#e6f3f3]'
                  : 'border-gray-200 hover:border-[#0d6d6e]/50 hover:bg-gray-50'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                selectedRole === 'hiring'
                  ? 'bg-[#0d6d6e]'
                  : 'bg-gray-100'
              }`}>
                <FaUserTie className={`text-xl ${
                  selectedRole === 'hiring' ? 'text-white' : 'text-gray-500'
                }`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">I'm hiring</h3>
              <p className="text-gray-600 text-sm">
                Post job listings, review applications, and find the perfect candidates for your team.
              </p>
              {selectedRole === 'hiring' && (
                <div className="mt-4 flex items-center text-[#0d6d6e] font-medium">
                  <span className="w-5 h-5 bg-[#0d6d6e] rounded-full flex items-center justify-center mr-2">
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
            className="w-full bg-[#0d6d6e] text-white py-3 rounded-lg font-medium hover:bg-[#095555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
