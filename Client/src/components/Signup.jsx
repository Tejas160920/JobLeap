import React, { useState, useEffect } from "react";
import SEO from "./SEO";
import { FaGoogle, FaApple, FaEye, FaEyeSlash, FaEnvelope, FaLock, FaBriefcase, FaUser, FaCheck, FaTimes } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_BASE_URL } from "../config/api";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { syncTokenWithExtension } from "../utils/extensionBridge";

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
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false
  });

  // Validate individual fields
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        const pwdCheck = isValidPassword(value);
        if (!pwdCheck.isValid) return 'Password must meet all requirements';
        return '';
      case 'confirmPassword':
        if (!value) return 'Please confirm your password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      default:
        return '';
    }
  };

  // Handle field blur for validation
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setFieldErrors(prev => ({ ...prev, [field]: error }));
  };

  // Validate all fields before submission
  const validateForm = () => {
    const errors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword)
    };
    setFieldErrors(errors);
    setTouched({ email: true, password: true, confirmPassword: true });
    return !errors.email && !errors.password && !errors.confirmPassword;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Update field validation on change if already touched
    if (touched[name]) {
      const error = validateField(name, value);
      setFieldErrors(prev => ({ ...prev, [name]: error }));
    }

    // Check password strength and requirements
    if (name === "password") {
      let strength = 0;
      const checks = {
        minLength: value.length >= 8,
        hasUppercase: /[A-Z]/.test(value),
        hasLowercase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value)
      };
      setPasswordChecks(checks);

      if (checks.minLength) strength++;
      if (checks.hasUppercase) strength++;
      if (checks.hasLowercase) strength++;
      if (checks.hasNumber) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;
      setPasswordStrength(strength);

      // Revalidate confirm password if already filled
      if (formData.confirmPassword && touched.confirmPassword) {
        const confirmError = value !== formData.confirmPassword ? 'Passwords do not match' : '';
        setFieldErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    }

    // If confirm password is being changed, validate it against password
    if (name === "confirmPassword" && touched.confirmPassword) {
      const error = value !== formData.password ? 'Passwords do not match' : '';
      setFieldErrors(prev => ({ ...prev, confirmPassword: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate form before submission
    if (!validateForm()) {
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

        // Sync token to Chrome extension (if installed)
        syncTokenWithExtension(data.token).catch(() => {
          // Extension not installed - that's okay
        });

        // Dispatch event to update Navbar
        window.dispatchEvent(new Event('authChange'));

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
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Join JobLeap</h1>
            <p className="text-gray-500 text-sm">Create your account and start your career journey</p>
          </div>

          {/* Social Signup Buttons */}
          <div className="mb-6">
            <button
              onClick={() => handleSocialSignup("Google")}
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
              <span className="px-3 bg-white text-gray-500">Or create with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
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
                  onBlur={() => handleBlur('email')}
                  className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none transition-colors ${
                    touched.email && fieldErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {touched.email && fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
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
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    formData.role === "seeking"
                      ? "border-[#0d6d6e] bg-[#e6f3f3] text-[#0d6d6e]"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <FaUser className="mx-auto mb-2" />
                  <div className="text-sm font-medium">Job Seeker</div>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, role: "hiring" }))}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    formData.role === "hiring"
                      ? "border-[#0d6d6e] bg-[#e6f3f3] text-[#0d6d6e]"
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
                  onBlur={() => handleBlur('password')}
                  className={`w-full pl-10 pr-12 py-2.5 text-sm border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none transition-colors ${
                    touched.password && fieldErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
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
                  <div className="flex items-center space-x-2 mb-2">
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
                  {/* Password Requirements */}
                  <div className="grid grid-cols-2 gap-1 text-xs">
                    <div className={`flex items-center ${passwordChecks.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordChecks.minLength ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                      8+ characters
                    </div>
                    <div className={`flex items-center ${passwordChecks.hasUppercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordChecks.hasUppercase ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                      Uppercase letter
                    </div>
                    <div className={`flex items-center ${passwordChecks.hasLowercase ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordChecks.hasLowercase ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                      Lowercase letter
                    </div>
                    <div className={`flex items-center ${passwordChecks.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                      {passwordChecks.hasNumber ? <FaCheck className="mr-1" /> : <FaTimes className="mr-1" />}
                      Number
                    </div>
                  </div>
                </div>
              )}
              {touched.password && fieldErrors.password && !formData.password && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.password}</p>
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
                  onBlur={() => handleBlur('confirmPassword')}
                  className={`w-full pl-10 pr-12 py-2.5 text-sm border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none transition-colors ${
                    touched.confirmPassword && fieldErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
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
                    <>
                      <FaTimes className="text-red-500 mr-2" />
                      <span className="text-red-600">Passwords don't match</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input type="checkbox" required className="rounded border-gray-300 text-[#0d6d6e] focus:ring-[#0d6d6e]" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the{" "}
                <Link to="/terms" className="text-[#0d6d6e] hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-[#0d6d6e] hover:underline">Privacy Policy</Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={isLoading || formData.password !== formData.confirmPassword || !isValidPassword(formData.password).isValid}
              className="w-full bg-[#0d6d6e] text-white py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#0d6d6e] hover:text-[#095555] font-medium"
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
