import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaUpload,
  FaCheck,
  FaStar,
  FaSpinner,
  FaArrowLeft,
  FaFilePdf,
  FaTrash,
  FaEye
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";
import { isValidPhone, isValidUrl, isValidLinkedIn, isValidGitHub, isValidName } from "../utils/validation";
import LocationDropdown from "./ui/LocationDropdown";

const ProfileCompletion = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [profileCompleted, setProfileCompleted] = useState(false);
  const totalSteps = 6; // Now we have 6 steps: personal, professional, skills, resume/links, preferences, summary

  const [formData, setFormData] = useState({
    // Personal Info
    fullName: "",
    phone: "",
    location: "",
    bio: "",
    
    // Professional Info
    title: "",
    experience: "",
    currentCompany: "",
    expectedSalary: "",
    
    // Skills
    skills: [],
    
    // Education
    education: [],
    
    // Social Links
    linkedin: "",
    github: "",
    portfolio: "",
    
    // Preferences
    jobTypes: [],
    industries: [],
    workTypes: [],
    
    // Resume
    resume: null,
    resumeFileName: ""
  });

  const [skillInput, setSkillInput] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Check if user is editing existing profile
    const existingProfile = localStorage.getItem("userProfile");
    if (existingProfile) {
      try {
        const profileData = JSON.parse(existingProfile);
        setFormData(prev => ({ ...prev, ...profileData }));
        setIsEditing(true);
      } catch (error) {
        console.error("Error parsing profile data:", error);
      }
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()]
      }));
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleArraySelection = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        resume: file,
        resumeFileName: file.name
      }));
    }
  };

  const handleResumeRemove = () => {
    setFormData(prev => ({
      ...prev,
      resume: null,
      resumeFileName: ""
    }));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
      } else if (!isValidName(formData.fullName)) {
        newErrors.fullName = "Please enter a valid name (letters only, at least 2 characters)";
      }

      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number (10-15 digits)";
      }

      if (!formData.location.trim()) newErrors.location = "Location is required";
    } else if (step === 2) {
      if (!formData.title.trim()) newErrors.title = "Job title is required";
      if (!formData.experience.trim()) newErrors.experience = "Experience level is required";
    } else if (step === 3) {
      if (formData.skills.length === 0) newErrors.skills = "Add at least one skill";
    } else if (step === 4) {
      // Validate URLs if provided
      if (formData.linkedin && !isValidLinkedIn(formData.linkedin)) {
        newErrors.linkedin = "Please enter a valid LinkedIn URL";
      }
      if (formData.github && !isValidGitHub(formData.github)) {
        newErrors.github = "Please enter a valid GitHub URL";
      }
      if (formData.portfolio && !isValidUrl(formData.portfolio)) {
        newErrors.portfolio = "Please enter a valid portfolio URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    // Only save and redirect on step 5 (before summary)
    if (currentStep < 5) {
      nextStep();
      return;
    }
    
    // Handle step 5 submission - save to database and go to summary
    if (currentStep === 5) {
    
    setIsLoading(true);
    
    try {
      // Save profile completion status
      localStorage.setItem("profileCompleted", "true");
      localStorage.setItem("userProfile", JSON.stringify(formData));
      
      // Get user token for backend call
      const token = localStorage.getItem("token");
      
      if (token) {
        // Try to save to backend
        try {
          const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ profile: formData })
          });

          if (response.ok) {
            console.log('Profile saved to database successfully');
            // Dispatch auth change event to update navbar
            window.dispatchEvent(new Event('authChange'));
          }
        } catch (backendError) {
          console.log('Backend not available, using local storage only');
        }
      }
      
      // Determine if new or existing profile
      const isNewProfile = !isEditing;
      const successMessage = isNewProfile 
        ? "Profile created successfully! Welcome to JobLeap!" 
        : "Profile updated successfully!";
      
      // Show profile summary instead of immediate redirect
      setProfileCompleted(true);
      setCurrentStep(6); // Go to summary step
      setTimeout(() => alert(successMessage), 500); // Show message after UI updates
      
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error saving profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
    return; // Exit after step 4 processing
    }
    
    // If we somehow reach here (step 6), just redirect to home
    if (currentStep === 6) {
      navigate("/", { replace: true });
    }
  };

  const experienceLevels = ["Entry Level (0-2 years)", "Mid Level (2-5 years)", "Senior Level (5+ years)", "Executive"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
  const workTypes = ["Remote", "On-site", "Hybrid"];
  const industries = ["Technology", "Finance", "Healthcare", "Education", "Marketing", "Sales", "Design", "Other"];
  
  const popularSkills = [
    "JavaScript", "Python", "React", "Node.js", "SQL", "Java", "C++", "HTML/CSS",
    "Project Management", "Data Analysis", "Marketing", "Design", "Sales", "Communication"
  ];

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FaUser className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Let's start with the basics about you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.fullName ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <div className="relative">
            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
        <LocationDropdown
          value={formData.location}
          onChange={(value) => {
            setFormData(prev => ({ ...prev, location: value }));
            if (errors.location) setErrors(prev => ({ ...prev, location: "" }));
          }}
          placeholder="Select or type your location"
          error={errors.location}
          allowCustom={true}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Bio (Optional)</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
          placeholder="Tell us a bit about yourself..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FaBriefcase className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Professional Information</h2>
        <p className="text-gray-600">Tell us about your career</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Current/Desired Job Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Software Engineer"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level *</label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
              errors.experience ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select experience level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
          {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Current Company (Optional)</label>
          <input
            type="text"
            name="currentCompany"
            value={formData.currentCompany}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Company name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Salary (Optional)</label>
          <input
            type="text"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="e.g., $80,000 - $120,000"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FaStar className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Expertise</h2>
        <p className="text-gray-600">What are you skilled at?</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Add Skills *</label>
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSkillAdd())}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="Type a skill and press Enter"
          />
          <button
            type="button"
            onClick={handleSkillAdd}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        {errors.skills && <p className="text-red-500 text-sm mb-4">{errors.skills}</p>}
      </div>

      {formData.skills.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Your Skills:</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {formData.skills.map(skill => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleSkillRemove(skill)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Popular Skills:</h3>
        <div className="flex flex-wrap gap-2">
          {popularSkills.map(skill => (
            <button
              key={skill}
              type="button"
              onClick={() => {
                if (!formData.skills.includes(skill)) {
                  setFormData(prev => ({
                    ...prev,
                    skills: [...prev.skills, skill]
                  }));
                }
              }}
              disabled={formData.skills.includes(skill)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                formData.skills.includes(skill)
                  ? 'bg-green-100 text-green-800 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {formData.skills.includes(skill) && <FaCheck className="inline mr-1" />}
              {skill}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FaUpload className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resume & Links</h2>
        <p className="text-gray-600">Upload your resume and add professional links</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
          <div className="relative">
            <FaLinkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" />
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors.linkedin ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://linkedin.com/in/yourname"
            />
          </div>
          {errors.linkedin && <p className="text-red-500 text-sm mt-1">{errors.linkedin}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">GitHub Profile</label>
          <div className="relative">
            <FaGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${
                errors.github ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://github.com/yourname"
            />
          </div>
          {errors.github && <p className="text-red-500 text-sm mt-1">{errors.github}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Resume/CV Upload</label>
          {!formData.resume && !formData.resumeFileName ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="hidden"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer flex flex-col items-center space-y-2"
              >
                <FaUpload className="text-3xl text-gray-400" />
                <div>
                  <span className="text-blue-600 font-medium">Click to upload resume</span>
                  <span className="text-gray-600"> or drag and drop</span>
                </div>
                <span className="text-sm text-gray-500">PDF, DOC, DOCX up to 5MB</span>
              </label>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FaFilePdf className="text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{formData.resumeFileName}</p>
                  <p className="text-sm text-gray-500">
                    {formData.resume ? `${(formData.resume.size / 1024 / 1024).toFixed(2)} MB` : 'Uploaded'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="Preview"
                >
                  <FaEye />
                </button>
                <button
                  type="button"
                  onClick={handleResumeRemove}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FaGraduationCap className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Preferences</h2>
        <p className="text-gray-600">Help us find the right opportunities for you</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Job Types</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {jobTypes.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleArraySelection('jobTypes', type)}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.jobTypes.includes(type)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Work Preferences</label>
        <div className="grid grid-cols-3 gap-3">
          {workTypes.map(type => (
            <button
              key={type}
              type="button"
              onClick={() => handleArraySelection('workTypes', type)}
              className={`p-3 rounded-lg border-2 transition-all ${
                formData.workTypes.includes(type)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Industries of Interest</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {industries.map(industry => (
            <button
              key={industry}
              type="button"
              onClick={() => handleArraySelection('industries', industry)}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                formData.industries.includes(industry)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-6 mx-auto"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {isEditing ? 'Edit Your' : 'Complete Your'}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isEditing 
              ? 'Update your information to get better job matches'
              : 'Help us find the perfect job opportunities for you'
            }
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {Array.from({ length: totalSteps }, (_, i) => {
              const stepNumber = i + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;
              
              return (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    isCompleted ? "bg-green-600 text-white" :
                    isActive ? "bg-blue-600 text-white" :
                    "bg-gray-200 text-gray-600"
                  }`}>
                    {isCompleted ? <FaCheck /> : stepNumber}
                  </div>
                  {stepNumber < totalSteps && (
                    <div className={`w-16 h-1 mx-4 rounded-full transition-colors duration-300 ${
                      currentStep > stepNumber ? "bg-green-600" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
            {currentStep === 6 && (
              <div className="text-center space-y-8">
                <div>
                  <FaCheck className="text-6xl text-green-500 mx-auto mb-6" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Profile {isEditing ? 'Updated' : 'Created'} Successfully!
                  </h2>
                  <p className="text-lg text-gray-600 mb-8">
                    Your profile has been saved to the database. Here's a summary of your information:
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-left max-w-2xl mx-auto">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Profile Summary</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="font-semibold text-gray-700">Name: </span>
                      <span className="text-gray-900">{formData.fullName || 'Not provided'}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Phone: </span>
                      <span className="text-gray-900">{formData.phone || 'Not provided'}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Location: </span>
                      <span className="text-gray-900">{formData.location || 'Not provided'}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Professional Title: </span>
                      <span className="text-gray-900">{formData.title || 'Not provided'}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Experience Level: </span>
                      <span className="text-gray-900">{formData.experience || 'Not provided'}</span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Skills: </span>
                      <span className="text-gray-900">
                        {formData.skills.length > 0 ? formData.skills.join(', ') : 'Not provided'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-semibold text-gray-700">Expected Salary: </span>
                      <span className="text-gray-900">{formData.expectedSalary || 'Not provided'}</span>
                    </div>
                    
                    {formData.resumeFileName && (
                      <div>
                        <span className="font-semibold text-gray-700">Resume: </span>
                        <span className="text-gray-900">{formData.resumeFileName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="button"
                    onClick={() => navigate("/", { replace: true })}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Go to Dashboard
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => navigate("/resume-builder")}
                    className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                  >
                    Create Resume
                  </button>
                </div>
              </div>
            )}

            {/* Navigation */}
            {currentStep !== 6 && (
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaArrowLeft />
                <span>Previous</span>
              </button>

              <div className="text-sm text-gray-500">
                Step {currentStep} of {totalSteps}
              </div>

              {currentStep < 5 ? ( // Show Next button only for steps 1-4
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Next Step
                </button>
              ) : currentStep === 5 ? (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <FaSpinner className="animate-spin" />
                      <span>{isEditing ? 'Updating Profile...' : 'Saving Profile...'}</span>
                    </div>
                  ) : (
                    isEditing ? 'Update Profile' : 'Complete Profile'
                  )}
                </button>
              ) : null // No button on step 6 (summary)
              }
            </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;