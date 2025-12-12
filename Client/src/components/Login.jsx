import React, { useState, useEffect } from "react";
import { FaGoogle, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaBriefcase } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { isValidEmail } from "../utils/validation";
import { syncTokenWithExtension } from "../utils/extensionBridge";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    const oauthError = searchParams.get('error');
    if (oauthError) {
      if (oauthError === 'google_auth_failed') {
        setError('Google authentication failed. Please try again.');
      } else if (oauthError === 'apple_auth_failed') {
        setError('Apple authentication failed. Please try again.');
      } else if (oauthError === 'oauth_failed') {
        setError('Social authentication failed. Please try again.');
      }
    }
  }, [searchParams]);

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        return '';
      default:
        return '';
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, field === 'email' ? email : password);
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  const validateForm = () => {
    const errors = {
      email: validateField('email', email),
      password: validateField('password', password)
    };
    setFieldErrors(errors);
    setTouched({ email: true, password: true });
    return !errors.email && !errors.password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("profileCompleted", data.user.profileCompleted);

        // Sync token to Chrome extension (if installed)
        syncTokenWithExtension(data.token).catch(() => {
          // Extension not installed - that's okay
        });

        window.dispatchEvent(new Event('authChange'));

        if (!data.user.profileCompleted && data.user.role === 'seeking') {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    if (provider === 'Google') {
      window.location.href = `${API_BASE_URL}/auth/google`;
    } else if (provider === 'Apple') {
      window.location.href = `${API_BASE_URL}/auth/apple`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-5">
              <div className="w-10 h-10 bg-[#0d6d6e] rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-white text-lg" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">
                JobLeap
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-gray-500 text-sm">Sign in to continue your job search</p>
          </div>

          {/* Social Login Buttons */}
          <div className="mb-6">
            <button
              onClick={() => handleSocialLogin("Google")}
              className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <FaGoogle className="mr-2 text-red-500" />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) {
                      setFieldErrors(prev => ({ ...prev, email: validateField('email', e.target.value) }));
                    }
                  }}
                  onBlur={() => handleBlur('email')}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none transition-colors ${
                    touched.email && fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {touched.email && fieldErrors.email && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (touched.password) {
                      setFieldErrors(prev => ({ ...prev, password: validateField('password', e.target.value) }));
                    }
                  }}
                  onBlur={() => handleBlur('password')}
                  className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none transition-colors ${
                    touched.password && fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
              {touched.password && fieldErrors.password && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-[#0d6d6e] focus:ring-[#0d6d6e]" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-[#0d6d6e] hover:text-[#095555] font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0d6d6e] text-white py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#0d6d6e] hover:text-[#095555] font-medium"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-500 mt-4">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="text-[#0d6d6e] hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-[#0d6d6e] hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
