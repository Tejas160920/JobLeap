import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('Verifying your email...');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus('error');
        setMessage('Invalid verification link. No token provided.');
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/auth/verify-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus('success');
          setMessage('Your email has been verified successfully!');
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to verify email');
        }
      } catch (err) {
        setStatus('error');
        setMessage('Network error. Please try again.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 pt-16">
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full text-center">
        {status === 'verifying' && (
          <>
            <FaSpinner className="animate-spin text-5xl text-blue-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying Email</h2>
          </>
        )}

        {status === 'success' && (
          <>
            <FaCheckCircle className="text-5xl text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
          </>
        )}

        {status === 'error' && (
          <>
            <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
          </>
        )}

        <p className="text-gray-600 mb-6">{message}</p>

        {status !== 'verifying' && (
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
