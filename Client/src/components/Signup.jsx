import React, { useState, useEffect } from "react";
import { FaGoogle, FaApple, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaBriefcase, FaUser, FaCheck } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "seeking",
  });

  useEffect(() => {
    const roleFromUrl = searchParams.get('role');
    if (roleFromUrl && (roleFromUrl === 'seeking' || roleFromUrl === 'hiring')) {
      setFormData(prev => ({ ...prev, role: roleFromUrl }));
    }
  }, [searchParams]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Check password strength
    if (name === "password") {
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[a-z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("profileCompleted", data.user.profileCompleted);
        
        // Redirect to profile completion for job seekers
        if (data.user.role === 'seeking') {
          navigate("/complete-profile");
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    if (provider === 'Google') {
      // Redirect to Google OAuth
      window.location.href = `${API_BASE_URL}/auth/google`;
    } else if (provider === 'Apple') {
      // Redirect to Apple OAuth (if configured)
      window.location.href = `${API_BASE_URL}/auth/apple`;
    }
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength <= 2) return "Weak";
    if (passwordStrength <= 3) return "Fair";
    if (passwordStrength <= 4) return "Good";
    return "Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500";
    if (passwordStrength <= 3) return "bg-yellow-500";
    if (passwordStrength <= 4) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-md">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join JobLeap</h1>
            <p className="text-gray-600">Create your account and start your career journey</p>
          </div>

          {/* Social Signup Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialSignup("Google")}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-300 transform hover:scale-105"
            >
              <FaGoogle className="mr-3 text-red-500" />
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">Or create with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                I am...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "seeking" }))}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    formData.role === "seeking"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FaUser className="mx-auto mb-2" />
                  <div className="text-sm font-medium">Job Seeker</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "hiring" }))}
                  className={`p-3 border-2 rounded-lg text-center transition-all ${
                    formData.role === "hiring"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FaBriefcase className="mx-auto mb-2" />
                  <div className="text-sm font-medium">Employer</div>
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center text-sm">
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <FaCheck className="text-green-500 mr-2" />
                      <span className="text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <span className="text-red-600">Passwords don't match</span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input type="checkbox" required className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || formData.password !== formData.confirmPassword}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-lift disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
