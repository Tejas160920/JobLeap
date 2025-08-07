import React, { useEffect, useState } from "react";
import { 
  FaBriefcase, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaDollarSign, 
  FaClock, 
  FaFileAlt,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaPlus,
  FaMinus,
  FaEye,
  FaArrowLeft,
  FaLightbulb
} from "react-icons/fa";
import AccessDenied from "./AccessDenied";

const JobForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    salaryType: "yearly",
    jobType: "Full-time",
    workType: "On-site",
    description: "",
    requirements: [""],
    benefits: [""],
    skills: [""],
    experience: "Mid-level",
    category: "Technology",
  });

  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  const totalSteps = 3;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role === "hiring") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Job title is required";
      if (!formData.company.trim()) newErrors.company = "Company name is required";
      if (!formData.location.trim()) newErrors.location = "Location is required";
    } else if (step === 2) {
      if (!formData.description.trim()) newErrors.description = "Job description is required";
      if (formData.requirements.every(req => !req.trim())) newErrors.requirements = "At least one requirement is needed";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleArrayField = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeArrayField = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Clean up array fields
      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        benefits: formData.benefits.filter(benefit => benefit.trim()),
        skills: formData.skills.filter(skill => skill.trim()),
      };

      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await res.json();
      
      if (res.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setFormData({
            title: "",
            company: "",
            location: "",
            salary: "",
            salaryType: "yearly",
            jobType: "Full-time",
            workType: "On-site",
            description: "",
            requirements: [""],
            benefits: [""],
            skills: [""],
            experience: "Mid-level",
            category: "Technology",
          });
          setCurrentStep(1);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        throw new Error(data.message || "Failed to post job");
      }
    } catch (error) {
      alert("Error posting job: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (!isAuthorized) return <AccessDenied />;

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Posted Successfully!</h2>
          <p className="text-gray-600 mb-6">Your job listing has been published and will be visible to job seekers.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 text-sm">✨ Pro tip: Share your job listing on social media to reach more candidates!</p>
          </div>
        </div>
      </div>
    );
  }

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setPreviewMode(false)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FaArrowLeft />
              <span>Back to Edit</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Job Preview</h1>
            <div></div>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Job Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
              <h1 className="text-3xl font-bold mb-2">{formData.title}</h1>
              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <FaBuilding />
                  <span>{formData.company}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt />
                  <span>{formData.location}</span>
                </div>
                {formData.salary && (
                  <div className="flex items-center space-x-2">
                    <FaDollarSign />
                    <span>{formData.salary} {formData.salaryType}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Job Type</h3>
                  <p className="text-blue-700">{formData.jobType}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-2">Work Type</h3>
                  <p className="text-purple-700">{formData.workType}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-2">Experience</h3>
                  <p className="text-green-700">{formData.experience}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{formData.description}</p>
                </div>

                {formData.requirements.some(req => req.trim()) && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {formData.requirements.filter(req => req.trim()).map((req, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <FaCheck className="text-green-600 mt-1 text-sm flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {formData.skills.some(skill => skill.trim()) && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {formData.benefits.some(benefit => benefit.trim()) && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {formData.benefits.filter(benefit => benefit.trim()).map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <FaCheck className="text-green-600 mt-1 text-sm flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <FaSpinner className="animate-spin" />
                  <span>Publishing Job...</span>
                </div>
              ) : (
                "Publish Job"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Title *
        </label>
        <div className="relative">
          <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="title"
            placeholder="e.g. Senior Software Engineer"
            value={formData.title}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Company Name *
        </label>
        <div className="relative">
          <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="company"
            placeholder="e.g. TechCorp Inc."
            value={formData.company}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Location *
          </label>
          <div className="relative">
            <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="location"
              placeholder="e.g. San Francisco, CA"
              value={formData.location}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Design">Design</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Job Type
          </label>
          <select
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Work Type
          </label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="Entry-level">Entry-level</option>
            <option value="Mid-level">Mid-level</option>
            <option value="Senior-level">Senior-level</option>
            <option value="Executive">Executive</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Salary (Optional)
          </label>
          <div className="relative">
            <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="salary"
              placeholder="e.g. $80,000 - $120,000"
              value={formData.salary}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Salary Type
          </label>
          <select
            name="salaryType"
            value={formData.salaryType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="yearly">Per Year</option>
            <option value="monthly">Per Month</option>
            <option value="hourly">Per Hour</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderArrayField = (field, label, placeholder, icon) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label} {field === 'requirements' && '*'}
      </label>
      <div className="space-y-3">
        {formData[field].map((item, index) => (
          <div key={index} className="flex space-x-2">
            <div className="relative flex-1">
              {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
              <input
                type="text"
                placeholder={placeholder}
                value={item}
                onChange={(e) => handleArrayField(field, index, e.target.value)}
                className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
              />
            </div>
            <button
              type="button"
              onClick={() => removeArrayField(field, index)}
              className="px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              disabled={formData[field].length === 1}
            >
              <FaMinus />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayField(field)}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <FaPlus />
          <span>Add {label.toLowerCase().slice(0, -1)}</span>
        </button>
      </div>
      {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Job Description *
        </label>
        <div className="relative">
          <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
          <textarea
            name="description"
            rows="6"
            placeholder="Describe the role, responsibilities, and what makes this position exciting..."
            value={formData.description}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex items-start space-x-2">
            <FaLightbulb className="text-blue-600 mt-1 flex-shrink-0" />
            <div className="text-blue-800 text-sm">
              <p className="font-medium mb-1">💡 Pro Tips for a Great Job Description:</p>
              <ul className="text-xs space-y-1">
                <li>• Start with an engaging overview of your company</li>
                <li>• Clearly outline day-to-day responsibilities</li>
                <li>• Mention growth opportunities and team culture</li>
                <li>• Be specific about the impact they'll make</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {renderArrayField('requirements', 'Requirements', 'e.g. Bachelor\'s degree in Computer Science', <FaCheck className="text-sm" />)}
      {renderArrayField('skills', 'Required Skills', 'e.g. JavaScript, React, Node.js')}
      {renderArrayField('benefits', 'Benefits & Perks', 'e.g. Health insurance, Remote work options')}
    </div>
  );

  const renderStep3 = () => (
    <div className="text-center space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Review Your Job Posting</h3>
        <p className="text-gray-600 mb-6">
          Take a moment to review all the details before publishing your job. You can make changes if needed.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <FaBriefcase className="text-blue-600" />
              <span className="font-semibold text-gray-900">Position</span>
            </div>
            <p className="text-gray-700">{formData.title}</p>
            <p className="text-gray-500 text-sm">{formData.company}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <span className="font-semibold text-gray-900">Location</span>
            </div>
            <p className="text-gray-700">{formData.location}</p>
            <p className="text-gray-500 text-sm">{formData.workType}</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2 mb-2">
              <FaClock className="text-blue-600" />
              <span className="font-semibold text-gray-900">Employment</span>
            </div>
            <p className="text-gray-700">{formData.jobType}</p>
            <p className="text-gray-500 text-sm">{formData.experience}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <button
          type="button"
          onClick={() => setPreviewMode(true)}
          className="flex items-center space-x-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
        >
          <FaEye />
          <span>Preview Job</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Post a New{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Job Opening
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect candidates by creating an engaging job posting that stands out
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
                  <div className="ml-3">
                    <p className={`font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                      Step {stepNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stepNumber === 1 && "Basic Info"}
                      {stepNumber === 2 && "Details"}
                      {stepNumber === 3 && "Review"}
                    </p>
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

            {/* Navigation */}
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

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <FaSpinner className="animate-spin" />
                      <span>Publishing...</span>
                    </div>
                  ) : (
                    "Publish Job"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
