import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const OAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing'); // processing, success, error
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');
        
        if (!token || !userStr) {
          setStatus('error');
          setMessage('Authentication failed. Missing token or user data.');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        const userData = JSON.parse(decodeURIComponent(userStr));
        
        // Store authentication data
        localStorage.setItem('token', token);
        localStorage.setItem('userRole', userData.role);
        localStorage.setItem('userEmail', userData.email);
        localStorage.setItem('profileCompleted', userData.profileCompleted);

        setStatus('success');
        setMessage('Authentication successful! Redirecting...');

        // Set welcome flag for new users
        localStorage.setItem('hasSeenWelcome', 'true');

        // Redirect based on profile completion
        setTimeout(() => {
          if (!userData.profileCompleted && userData.role === 'seeking') {
            navigate('/complete-profile');
          } else {
            navigate('/');
          }
        }, 2000);

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage('Authentication failed. Please try again.');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate]);

  const getIcon = () => {
    switch (status) {
      case 'processing':
        return <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />;
      case 'success':
        return <FaCheckCircle className="text-4xl text-green-600 mx-auto mb-4" />;
      case 'error':
        return <FaTimesCircle className="text-4xl text-red-600 mx-auto mb-4" />;
      default:
        return <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-green-700';
      case 'error':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full text-center">
        {getIcon()}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {status === 'processing' && 'Authenticating...'}
          {status === 'success' && 'Welcome to JobLeap!'}
          {status === 'error' && 'Authentication Failed'}
        </h2>
        <p className={`text-lg ${getStatusColor()}`}>
          {message}
        </p>
        
        {status === 'processing' && (
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="mt-6">
            <button
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Return to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;