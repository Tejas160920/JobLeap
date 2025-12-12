import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaPassport,
  FaUsers,
  FaTools,
  FaMapMarkerAlt,
  FaLink,
  FaCheck,
  FaArrowRight,
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaUpload,
  FaSpinner,
  FaExclamationCircle,
  FaLightbulb,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Step configuration
const STEPS = [
  { id: "basics", label: "Basics", icon: FaUser },
  { id: "education", label: "Education", icon: FaGraduationCap },
  { id: "experience", label: "Experience", icon: FaBriefcase },
  { id: "work-auth", label: "Work Authorization", icon: FaPassport },
  { id: "eeo", label: "EEO", icon: FaUsers },
  { id: "skills", label: "Skills", icon: FaTools },
  { id: "personal", label: "Personal", icon: FaMapMarkerAlt },
  { id: "links", label: "Links", icon: FaLink },
];

// Common skills list for autocomplete
const COMMON_SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "C#",
  "SQL", "MongoDB", "PostgreSQL", "AWS", "Azure", "GCP", "Docker", "Kubernetes",
  "Git", "HTML/CSS", "REST APIs", "GraphQL", "Machine Learning", "Data Analysis",
  "Excel", "PowerPoint", "Communication", "Leadership", "Project Management",
  "Agile", "Scrum", "Product Management", "UI/UX Design", "Figma", "Adobe Creative Suite",
  "Marketing", "SEO", "Content Writing", "Sales", "Customer Service", "Finance",
  "Accounting", "HR", "Legal", "Operations", "Supply Chain", "Manufacturing",
];

// Degree types
const DEGREE_TYPES = [
  "High School Diploma",
  "Associate's Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate (PhD)",
  "Professional Degree (MD, JD, etc.)",
  "Certificate",
  "Bootcamp",
  "Other",
];

// Experience types
const EXPERIENCE_TYPES = [
  "Full-time",
  "Part-time",
  "Internship",
  "Contract",
  "Freelance",
  "Volunteer",
  "Other",
];

// Ethnicity options
const ETHNICITY_OPTIONS = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Hispanic or Latino",
  "Native Hawaiian or Other Pacific Islander",
  "White",
  "Two or More Races",
  "Decline to state",
];

// Gender options
const GENDER_OPTIONS = ["Male", "Female", "Non-Binary", "Other", "Decline to state"];

const AutoFillProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState("");
  const [skillSearch, setSkillSearch] = useState("");

  // Form data state
  const [formData, setFormData] = useState({
    // Basics
    firstName: "",
    lastName: "",
    resumeFile: null,
    resumeFileName: "",

    // Education (array for multiple entries)
    education: [
      {
        schoolName: "",
        major: "",
        degreeType: "",
        gpa: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
      },
    ],

    // Experience (array for multiple entries)
    noExperience: false,
    experience: [
      {
        positionTitle: "",
        company: "",
        location: "",
        experienceType: "",
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
        currentlyWorking: false,
        description: "",
      },
    ],

    // Work Authorization
    authorizedUS: null,
    authorizedCanada: null,
    authorizedUK: null,
    requiresSponsorship: null,

    // EEO
    ethnicity: [],
    declineEthnicity: false,
    hasDisability: null,
    isVeteran: null,
    isLGBTQ: null,
    gender: "",

    // Skills
    skills: [],

    // Personal
    currentLocation: "",
    dateOfBirth: "",
    phone: "",
    phoneCountryCode: "+1",

    // Links
    linkedIn: "",
    github: "",
    portfolio: "",
    otherWebsite: "",
  });

  // Load existing profile data on mount (non-blocking)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Load profile in background without blocking UI
    const loadProfile = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

        const response = await fetch(`${API_URL}/api/extension/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          if (data.profile) {
            // Map backend profile to form data
            setFormData((prev) => ({
              ...prev,
              firstName: data.profile.personal?.firstName || prev.firstName,
              lastName: data.profile.personal?.lastName || prev.lastName,
              phone: data.profile.personal?.phone || prev.phone,
              currentLocation: data.profile.personal?.address?.city
                ? `${data.profile.personal.address.city}, ${data.profile.personal.address.state || ""}`
                : prev.currentLocation,
              linkedIn: data.profile.personal?.linkedIn || prev.linkedIn,
              github: data.profile.personal?.github || prev.github,
              portfolio: data.profile.personal?.portfolio || prev.portfolio,
              skills: data.profile.skills?.length ? data.profile.skills : prev.skills,
              education: data.profile.education?.length
                ? data.profile.education
                : prev.education,
              experience: data.profile.experience?.length
                ? data.profile.experience
                : prev.experience,
              authorizedUS: data.profile.preferences?.authorizedToWork ?? prev.authorizedUS,
              requiresSponsorship: data.profile.preferences?.requiresSponsorship ?? prev.requiresSponsorship,
            }));
          }
        }
      } catch (error) {
        // Silently fail - user can still fill the form
        console.log("Could not load existing profile:", error.message);
      }
    };

    loadProfile();
  }, [navigate]);

  // Validation function
  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 0: // Basics
        if (!formData.firstName.trim()) {
          newErrors.firstName = "First name is required";
        }
        if (!formData.lastName.trim()) {
          newErrors.lastName = "Last name is required";
        }
        break;

      case 1: // Education
        formData.education.forEach((edu, index) => {
          if (edu.schoolName && !edu.degreeType) {
            newErrors[`education_${index}_degreeType`] = "Degree type is required";
          }
        });
        break;

      case 2: // Experience
        if (!formData.noExperience) {
          formData.experience.forEach((exp, index) => {
            if (exp.positionTitle && !exp.company) {
              newErrors[`experience_${index}_company`] = "Company is required";
            }
          });
        }
        break;

      case 6: // Personal
        if (formData.phone && !/^[\d\s\-()]+$/.test(formData.phone)) {
          newErrors.phone = "Please enter a valid phone number";
        }
        break;

      case 7: // Links
        if (formData.linkedIn && !formData.linkedIn.includes("linkedin.com")) {
          newErrors.linkedIn = "Please enter a valid LinkedIn URL";
        }
        if (formData.github && !formData.github.includes("github.com")) {
          newErrors.github = "Please enter a valid GitHub URL";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle array field changes (education, experience)
  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Add new entry to array field
  const addArrayEntry = (arrayName, defaultEntry) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: [...prev[arrayName], defaultEntry],
    }));
  };

  // Remove entry from array field
  const removeArrayEntry = (arrayName, index) => {
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resumeFile: "File size must be less than 5MB" });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resumeFile: file,
        resumeFileName: file.name,
      }));
    }
  };

  // Handle skill toggle
  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  // Navigate between steps
  const goToStep = (step) => {
    if (step >= 0 && step < STEPS.length) {
      setCurrentStep(step);
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      saveProgress();
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Save progress to backend
  const saveProgress = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setIsSaving(true);
    try {
      // Convert form data to profile format
      const profile = {
        personal: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: "", // Will be filled from user account
          phone: formData.phone,
          linkedIn: formData.linkedIn,
          github: formData.github,
          portfolio: formData.portfolio,
          address: {
            city: formData.currentLocation.split(",")[0]?.trim() || "",
            state: formData.currentLocation.split(",")[1]?.trim() || "",
            country: "United States",
          },
          dateOfBirth: formData.dateOfBirth,
        },
        education: formData.education.filter((e) => e.schoolName),
        experience: formData.noExperience
          ? []
          : formData.experience.filter((e) => e.positionTitle),
        skills: formData.skills,
        preferences: {
          authorizedToWork: formData.authorizedUS,
          requiresSponsorship: formData.requiresSponsorship,
          authorizedCanada: formData.authorizedCanada,
          authorizedUK: formData.authorizedUK,
        },
        eeo: {
          ethnicity: formData.ethnicity,
          hasDisability: formData.hasDisability,
          isVeteran: formData.isVeteran,
          isLGBTQ: formData.isLGBTQ,
          gender: formData.gender,
        },
        links: {
          linkedIn: formData.linkedIn,
          github: formData.github,
          portfolio: formData.portfolio,
          other: formData.otherWebsite,
        },
      };

      const response = await fetch(`${API_URL}/api/extension/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profile }),
      });

      if (response.ok) {
        setSaveMessage("Progress saved!");
        setTimeout(() => setSaveMessage(""), 2000);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Final submit
  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      await saveProgress();
      setSaveMessage("Profile completed successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  // Render step navigation
  const renderStepNav = () => (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Step tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : isCompleted
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              {isCompleted ? (
                <FaCheck className="w-4 h-4 mr-2 text-green-600" />
              ) : (
                <Icon className="w-4 h-4 mr-2" />
              )}
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{index + 1}</span>
            </button>
          );
        })}
      </div>

      {/* Current step indicator */}
      <div className="text-center mt-4">
        <span className="text-lg font-semibold text-indigo-600">
          Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
        </span>
      </div>
    </div>
  );

  // Render tip box
  const renderTip = (message) => (
    <div className="flex items-start bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
      <FaLightbulb className="w-5 h-5 text-indigo-500 mt-0.5 mr-3 flex-shrink-0" />
      <p className="text-sm text-indigo-700">{message}</p>
    </div>
  );

  // Render form input
  const renderInput = (label, field, type = "text", placeholder = "", required = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={formData[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
          errors[field] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[field] && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <FaExclamationCircle className="w-3 h-3 mr-1" />
          {errors[field]}
        </p>
      )}
    </div>
  );

  // Render select input
  const renderSelect = (label, field, options, placeholder = "Select...", required = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={formData[field] || ""}
        onChange={(e) => handleChange(field, e.target.value)}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
          errors[field] ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );

  // Render Yes/No buttons
  const renderYesNo = (label, field, tip = "") => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      {tip && <p className="text-xs text-gray-500 mb-2">{tip}</p>}
      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => handleChange(field, true)}
          className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${
            formData[field] === true
              ? "border-indigo-600 bg-indigo-50 text-indigo-700"
              : "border-gray-300 text-gray-600 hover:border-gray-400"
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => handleChange(field, false)}
          className={`px-6 py-2 rounded-lg border-2 font-medium transition-all ${
            formData[field] === false
              ? "border-indigo-600 bg-indigo-50 text-indigo-700"
              : "border-gray-300 text-gray-600 hover:border-gray-400"
          }`}
        >
          No
        </button>
      </div>
    </div>
  );

  // Render Yes/No/Decline buttons
  const renderYesNoDecline = (label, field) => (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {["Yes", "No", "Decline to state"].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleChange(field, option === "Yes" ? true : option === "No" ? false : null)}
            className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
              (option === "Yes" && formData[field] === true) ||
              (option === "No" && formData[field] === false) ||
              (option === "Decline to state" && formData[field] === null)
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-300 text-gray-600 hover:border-gray-400"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  // Step 1: Basics
  const renderBasicsStep = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's build your profile</h2>
      <p className="text-gray-600 mb-6">
        This information will be used to autofill job applications.
      </p>

      {renderTip(
        "Your profile data is securely stored and only used to help you apply to jobs faster."
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderInput("First Name", "firstName", "text", "John", true)}
        {renderInput("Last Name", "lastName", "text", "Doe", true)}
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload your resume
        </label>
        <p className="text-xs text-gray-500 mb-3">
          We'll parse your resume to prefill your profile. PDF recommended.
        </p>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            formData.resumeFileName
              ? "border-indigo-300 bg-indigo-50"
              : "border-gray-300 hover:border-indigo-400"
          }`}
        >
          <input
            type="file"
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="resume-upload" className="cursor-pointer">
            <FaUpload className="w-8 h-8 mx-auto text-gray-400 mb-3" />
            {formData.resumeFileName ? (
              <p className="text-indigo-600 font-medium">{formData.resumeFileName}</p>
            ) : (
              <>
                <p className="text-indigo-600 font-medium">Upload a file</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 5 MB</p>
              </>
            )}
          </label>
        </div>
        {errors.resumeFile && (
          <p className="mt-2 text-sm text-red-500">{errors.resumeFile}</p>
        )}
      </div>
    </div>
  );

  // Step 2: Education
  const renderEducationStep = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Add your education history</h2>
      <p className="text-gray-600 mb-6">
        Include your degrees, certifications, and relevant coursework.
      </p>

      {renderTip(
        "If your school or major isn't listed, select 'Other' and enter the name manually."
      )}

      {formData.education.map((edu, index) => (
        <div
          key={index}
          className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-700">Education {index + 1}</h3>
            {formData.education.length > 1 && (
              <button
                type="button"
                onClick={() => removeArrayEntry("education", index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School Name
            </label>
            <input
              type="text"
              value={edu.schoolName}
              onChange={(e) =>
                handleArrayChange("education", index, "schoolName", e.target.value)
              }
              placeholder="University of..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Major
              </label>
              <input
                type="text"
                value={edu.major}
                onChange={(e) =>
                  handleArrayChange("education", index, "major", e.target.value)
                }
                placeholder="Computer Science"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree Type
              </label>
              <select
                value={edu.degreeType}
                onChange={(e) =>
                  handleArrayChange("education", index, "degreeType", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select...</option>
                {DEGREE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA
              </label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) =>
                  handleArrayChange("education", index, "gpa", e.target.value)
                }
                placeholder="3.8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Month
              </label>
              <select
                value={edu.startMonth}
                onChange={(e) =>
                  handleArrayChange("education", index, "startMonth", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Year
              </label>
              <select
                value={edu.startYear}
                onChange={(e) =>
                  handleArrayChange("education", index, "startYear", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Year</option>
                {Array.from({ length: 30 }, (_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Month
              </label>
              <select
                value={edu.endMonth}
                onChange={(e) =>
                  handleArrayChange("education", index, "endMonth", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Year
              </label>
              <select
                value={edu.endYear}
                onChange={(e) =>
                  handleArrayChange("education", index, "endYear", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Year</option>
                {Array.from({ length: 35 }, (_, i) => {
                  const year = new Date().getFullYear() + 5 - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          addArrayEntry("education", {
            schoolName: "",
            major: "",
            degreeType: "",
            gpa: "",
            startMonth: "",
            startYear: "",
            endMonth: "",
            endYear: "",
          })
        }
        className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
      >
        <FaPlus className="w-4 h-4 mr-2" />
        Add Education
      </button>
    </div>
  );

  // Step 3: Experience
  const renderExperienceStep = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Show off your work experience</h2>
      <p className="text-gray-600 mb-6">
        The more detailed the information, the better we can help tailor your applications.
      </p>

      {renderTip(
        "Include internships, part-time jobs, and volunteer work if relevant to your career goals."
      )}

      <div className="mb-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.noExperience}
            onChange={(e) => handleChange("noExperience", e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <span className="ml-2 text-gray-700">
            I'm looking for my first job (no prior experience)
          </span>
        </label>
      </div>

      {!formData.noExperience && (
        <>
          {formData.experience.map((exp, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Work Experience {index + 1}</h3>
                {formData.experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayEntry("experience", index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position Title
                </label>
                <input
                  type="text"
                  value={exp.positionTitle}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "positionTitle", e.target.value)
                  }
                  placeholder="Software Engineer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "company", e.target.value)
                    }
                    placeholder="Company name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "location", e.target.value)
                    }
                    placeholder="City, State"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Type
                </label>
                <select
                  value={exp.experienceType}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "experienceType", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Select type...</option>
                  {EXPERIENCE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Month
                  </label>
                  <select
                    value={exp.startMonth}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "startMonth", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Year
                  </label>
                  <select
                    value={exp.startYear}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "startYear", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Month
                  </label>
                  <select
                    value={exp.endMonth}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "endMonth", e.target.value)
                    }
                    disabled={exp.currentlyWorking}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {new Date(0, i).toLocaleString("default", { month: "long" })}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Year
                  </label>
                  <select
                    value={exp.endYear}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "endYear", e.target.value)
                    }
                    disabled={exp.currentlyWorking}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
                  >
                    <option value="">Year</option>
                    {Array.from({ length: 30 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={exp.currentlyWorking}
                    onChange={(e) =>
                      handleArrayChange("experience", index, "currentlyWorking", e.target.checked)
                    }
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700">I currently work here</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) =>
                    handleArrayChange("experience", index, "description", e.target.value)
                  }
                  placeholder="A couple sentences about your role..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              addArrayEntry("experience", {
                positionTitle: "",
                company: "",
                location: "",
                experienceType: "",
                startMonth: "",
                startYear: "",
                endMonth: "",
                endYear: "",
                currentlyWorking: false,
                description: "",
              })
            }
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            <FaPlus className="w-4 h-4 mr-2" />
            Add Experience
          </button>
        </>
      )}
    </div>
  );

  // Step 4: Work Authorization
  const renderWorkAuthStep = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Work authorization information</h2>
      <p className="text-gray-600 mb-6">
        Let us help you autofill these common questions in your applications.
      </p>

      {renderTip(
        "This information helps match you with jobs you're eligible for and speeds up your applications."
      )}

      {renderYesNo("Are you authorized to work in the US?", "authorizedUS")}
      {renderYesNo("Are you authorized to work in Canada?", "authorizedCanada")}
      {renderYesNo("Are you authorized to work in the United Kingdom?", "authorizedUK")}
      {renderYesNo(
        "Will you now or in the future require sponsorship for employment visa status?",
        "requiresSponsorship"
      )}
    </div>
  );

  // Step 5: EEO
  const renderEEOStep = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Equal employment opportunity information
      </h2>
      <p className="text-gray-600 mb-6">
        Most job applications ask these questions as voluntary disclosure.
      </p>

      {renderTip(
        "Answering these questions is completely voluntary and will never hurt your chances of landing a job!"
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is your ethnicity?
        </label>
        <p className="text-xs text-gray-500 mb-2">Select all that apply</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {ETHNICITY_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                if (option === "Decline to state") {
                  handleChange("ethnicity", []);
                  handleChange("declineEthnicity", true);
                } else {
                  handleChange("declineEthnicity", false);
                  const newEthnicity = formData.ethnicity.includes(option)
                    ? formData.ethnicity.filter((e) => e !== option)
                    : [...formData.ethnicity, option];
                  handleChange("ethnicity", newEthnicity);
                }
              }}
              className={`px-3 py-1.5 rounded-full border-2 text-sm font-medium transition-all ${
                formData.ethnicity.includes(option) ||
                (option === "Decline to state" && formData.declineEthnicity)
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {renderYesNoDecline("Do you have a disability?", "hasDisability")}
      {renderYesNoDecline("Are you a veteran?", "isVeteran")}
      {renderYesNoDecline("Do you identify as LGBTQ+?", "isLGBTQ")}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What is your gender?
        </label>
        <div className="flex flex-wrap gap-2">
          {GENDER_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleChange("gender", option)}
              className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                formData.gender === option
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        By continuing you agree to the definitions set by the{" "}
        <a
          href="https://www.eeoc.gov/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 hover:underline"
        >
          U.S. EEOC
        </a>
        .
      </p>
    </div>
  );

  // Step 6: Skills
  const renderSkillsStep = () => {
    const filteredSkills = COMMON_SKILLS.filter(
      (skill) =>
        skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
        !formData.skills.includes(skill)
    );

    // Check if search term is a custom skill (not in the list and not already added)
    const isCustomSkill = skillSearch.trim() &&
      !COMMON_SKILLS.some(s => s.toLowerCase() === skillSearch.toLowerCase()) &&
      !formData.skills.some(s => s.toLowerCase() === skillSearch.toLowerCase());

    const addCustomSkill = () => {
      if (skillSearch.trim() && !formData.skills.includes(skillSearch.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skillSearch.trim()],
        }));
        setSkillSearch("");
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (isCustomSkill) {
          addCustomSkill();
        } else if (filteredSkills.length > 0) {
          toggleSkill(filteredSkills[0]);
          setSkillSearch("");
        }
      }
    };

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Let's not forget to show off your skills
        </h2>
        <p className="text-gray-600 mb-6">
          We'll use this information to recommend you job matches as well!
        </p>

        {renderTip(
          "Add skills that are relevant to the jobs you're applying for. Type and press Enter to add custom skills!"
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What skills do you have or enjoy working with?
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search or type a custom skill..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            {isCustomSkill && (
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all flex items-center"
              >
                <FaPlus className="w-4 h-4 mr-1" />
                Add
              </button>
            )}
          </div>
          {isCustomSkill && (
            <p className="text-sm text-indigo-600 mt-1">
              Press Enter or click Add to add "{skillSearch}" as a custom skill
            </p>
          )}
        </div>

        {filteredSkills.length > 0 && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Suggested skills:</p>
            <div className="flex flex-wrap gap-2">
              {filteredSkills.slice(0, 15).map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => {
                    toggleSkill(skill);
                    setSkillSearch("");
                  }}
                  className="px-3 py-1.5 rounded-full border border-gray-300 text-sm text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-all"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        )}

        {formData.skills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Selected skills ({formData.skills.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="ml-2 text-indigo-500 hover:text-indigo-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Step 7: Personal
  const renderPersonalStep = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost there! A few last questions.</h2>
      <p className="text-gray-600 mb-6">This information helps complete your profile.</p>

      {renderTip(
        "Your birthday is only used to verify that you are 18+ and will never be shared with anyone!"
      )}

      {renderInput(
        "Where are you currently located?",
        "currentLocation",
        "text",
        "City, State"
      )}

      {renderInput("What's your date of birth?", "dateOfBirth", "date")}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What's your phone number?
        </label>
        <div className="flex">
          <select
            value={formData.phoneCountryCode}
            onChange={(e) => handleChange("phoneCountryCode", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-500 bg-gray-50"
          >
            <option value="+1">+1 (US)</option>
            <option value="+44">+44 (UK)</option>
            <option value="+91">+91 (IN)</option>
            <option value="+86">+86 (CN)</option>
            <option value="+81">+81 (JP)</option>
          </select>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="(555) 123-4567"
            className={`flex-1 px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  // Step 8: Links
  const renderLinksStep = () => (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Last step, add your personal links.
      </h2>
      <p className="text-gray-600 mb-6">
        You can directly paste links, we'll autoformat them.
      </p>

      {renderTip(
        "Adding your LinkedIn and GitHub profiles can significantly improve your application!"
      )}

      <div className="space-y-4">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <FaLinkedin className="w-4 h-4 mr-2 text-blue-600" />
            LinkedIn
          </label>
          <div className="flex">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">
              https://www.linkedin.com/in/
            </span>
            <input
              type="text"
              value={formData.linkedIn.replace(/.*linkedin\.com\/in\//i, "")}
              onChange={(e) =>
                handleChange(
                  "linkedIn",
                  e.target.value
                    ? `https://www.linkedin.com/in/${e.target.value}`
                    : ""
                )
              }
              placeholder="yourprofile"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 ${
                errors.linkedIn ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.linkedIn && (
            <p className="mt-1 text-sm text-red-500">{errors.linkedIn}</p>
          )}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <FaGithub className="w-4 h-4 mr-2" />
            GitHub
          </label>
          <div className="flex">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">
              https://github.com/
            </span>
            <input
              type="text"
              value={formData.github.replace(/.*github\.com\//i, "")}
              onChange={(e) =>
                handleChange(
                  "github",
                  e.target.value ? `https://github.com/${e.target.value}` : ""
                )
              }
              placeholder="yourusername"
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 ${
                errors.github ? "border-red-500" : ""
              }`}
            />
          </div>
          {errors.github && (
            <p className="mt-1 text-sm text-red-500">{errors.github}</p>
          )}
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <FaGlobe className="w-4 h-4 mr-2 text-green-600" />
            Portfolio
          </label>
          <div className="flex">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">
              https://
            </span>
            <input
              type="text"
              value={formData.portfolio.replace(/^https?:\/\//i, "")}
              onChange={(e) =>
                handleChange(
                  "portfolio",
                  e.target.value ? `https://${e.target.value}` : ""
                )
              }
              placeholder="yourportfolio.com"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
            <FaGlobe className="w-4 h-4 mr-2 text-gray-500" />
            Other website
          </label>
          <div className="flex">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">
              https://
            </span>
            <input
              type="text"
              value={formData.otherWebsite.replace(/^https?:\/\//i, "")}
              onChange={(e) =>
                handleChange(
                  "otherWebsite",
                  e.target.value ? `https://${e.target.value}` : ""
                )
              }
              placeholder="..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderBasicsStep();
      case 1:
        return renderEducationStep();
      case 2:
        return renderExperienceStep();
      case 3:
        return renderWorkAuthStep();
      case 4:
        return renderEEOStep();
      case 5:
        return renderSkillsStep();
      case 6:
        return renderPersonalStep();
      case 7:
        return renderLinksStep();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AutoFill Profile</h1>
          <p className="text-lg text-gray-600">
            Complete your profile once, autofill job applications forever.
          </p>
        </div>

        {/* Step Navigation */}
        {renderStepNav()}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-10 min-h-[500px]">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>

            <div className="flex items-center space-x-4">
              {saveMessage && (
                <span className="text-green-600 text-sm flex items-center">
                  <FaCheck className="w-4 h-4 mr-1" />
                  {saveMessage}
                </span>
              )}

              {currentStep < STEPS.length - 1 ? (
                <>
                  <button
                    type="button"
                    onClick={() => goToStep(currentStep + 1)}
                    className="text-gray-500 hover:text-gray-700 text-sm underline"
                  >
                    Skip this step
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={isSaving}
                    className="flex items-center px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-md"
                  >
                    {isSaving ? (
                      <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    Save and Continue
                    <FaArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all disabled:opacity-50 shadow-md"
                >
                  {isSaving ? (
                    <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <FaCheck className="w-4 h-4 mr-2" />
                  )}
                  Complete Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoFillProfile;
