import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaFileAlt,
  FaCheck,
  FaSpinner,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaEnvelope,
  FaSave
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";
import { isValidSalary, isValidUrl, isValidEmail } from "../utils/validation";
import LocationDropdown from "./ui/LocationDropdown";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    applicationUrl: "",
    applicationEmail: "",
    status: "active"
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "hiring") {
      navigate("/");
      return;
    }

    fetchJob();
  }, [id, navigate]);

  const fetchJob = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success && data.job) {
        const job = data.job;
        setFormData({
          title: job.title || "",
          company: job.company || "",
          location: job.location || "",
          salary: job.salary || "",
          salaryType: job.salaryType || "yearly",
          jobType: job.jobType || "Full-time",
          workType: job.workType || "On-site",
          description: job.description || "",
          requirements: job.requirements?.length > 0 ? job.requirements : [""],
          benefits: job.benefits?.length > 0 ? job.benefits : [""],
          skills: job.skills?.length > 0 ? job.skills : [""],
          experience: job.experienceLevel || job.experience || "Mid-level",
          category: job.category || "Technology",
          applicationUrl: job.applicationUrl || "",
          applicationEmail: job.applicationEmail || "",
          status: job.status || "active"
        });
      } else {
        alert("Job not found");
        navigate("/my-jobs");
      }
    } catch (err) {
      console.error("Error fetching job:", err);
      alert("Failed to load job");
      navigate("/my-jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.salary && !isValidSalary(formData.salary)) {
      newErrors.salary = "Please enter a valid salary format";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }
    if (formData.applicationUrl && !isValidUrl(formData.applicationUrl)) {
      newErrors.applicationUrl = "Please enter a valid URL";
    }
    if (formData.applicationEmail && !isValidEmail(formData.applicationEmail)) {
      newErrors.applicationEmail = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

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
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      const token = localStorage.getItem("token");

      const cleanedData = {
        ...formData,
        requirements: formData.requirements.filter(req => req.trim()),
        benefits: formData.benefits.filter(benefit => benefit.trim()),
        skills: formData.skills.filter(skill => skill.trim()),
      };

      const res = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await res.json();

      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => {
          navigate("/my-jobs");
        }, 1500);
      } else {
        throw new Error(data.message || "Failed to update job");
      }
    } catch (error) {
      alert("Error updating job: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16">
        <FaSpinner className="animate-spin text-4xl text-[#0d6d6e]" />
      </div>
    );
  }

  if (saveSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-16">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Updated!</h2>
          <p className="text-gray-600">Your changes have been saved successfully.</p>
        </div>
      </div>
    );
  }

  const renderArrayField = (field, label, placeholder) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-3">
        {formData[field].map((item, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              placeholder={placeholder}
              value={item}
              onChange={(e) => handleArrayField(field, index, e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
            />
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
          className="flex items-center space-x-2 text-[#0d6d6e] hover:text-[#095555] font-medium transition-colors"
        >
          <FaPlus />
          <span>Add {label.toLowerCase().replace(/s$/, '')}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/my-jobs")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <FaArrowLeft />
            <span>Back to My Jobs</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Job Posting</h1>
          <p className="text-gray-600 mt-2">Update your job listing details</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Job Title *
                </label>
                <div className="relative">
                  <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
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
                    value={formData.company}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
                      errors.company ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location *
                </label>
                <LocationDropdown
                  value={formData.location}
                  onChange={(value) => {
                    setFormData(prev => ({ ...prev, location: value }));
                    if (errors.location) setErrors(prev => ({ ...prev, location: "" }));
                  }}
                  error={errors.location}
                  allowCustom={true}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salary
                </label>
                <div className="relative">
                  <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="e.g., $80,000 - $120,000"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
                      errors.salary ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.salary && <p className="text-red-500 text-sm mt-1">{errors.salary}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Job Type</label>
                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Work Type</label>
                <select
                  name="workType"
                  value={formData.workType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                >
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description *
              </label>
              <div className="relative">
                <FaFileAlt className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="description"
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none resize-vertical ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Array Fields */}
            {renderArrayField('requirements', 'Requirements', 'e.g., Bachelor\'s degree in Computer Science')}
            {renderArrayField('skills', 'Required Skills', 'e.g., JavaScript, React, Node.js')}
            {renderArrayField('benefits', 'Benefits & Perks', 'e.g., Health insurance, Remote work options')}

            {/* Application Method */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Apply</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application URL
                  </label>
                  <div className="relative">
                    <FaExternalLinkAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="url"
                      name="applicationUrl"
                      value={formData.applicationUrl}
                      onChange={handleChange}
                      placeholder="https://yourcompany.com/careers/apply"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
                        errors.applicationUrl ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.applicationUrl && <p className="text-red-500 text-sm mt-1">{errors.applicationUrl}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Application Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="applicationEmail"
                      value={formData.applicationEmail}
                      onChange={handleChange}
                      placeholder="careers@yourcompany.com"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
                        errors.applicationEmail ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                  </div>
                  {errors.applicationEmail && <p className="text-red-500 text-sm mt-1">{errors.applicationEmail}</p>}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/my-jobs")}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center space-x-2 bg-[#0d6d6e] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <FaSave />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
