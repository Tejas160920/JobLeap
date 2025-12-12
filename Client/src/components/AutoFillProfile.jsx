import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { syncProfileWithExtension } from "../utils/extensionBridge";
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
  FaPuzzlePiece,
  FaSync,
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
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

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

  // Load existing profile data on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

        const response = await fetch(`${API_URL}/api/auth/autofill-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const raw = data.raw; // Raw autofillProfile data from server

          if (raw && raw.firstName) {
            // Profile exists - load it into form data
            setProfileExists(true);

            // Map backend profile to form data
            setFormData((prev) => ({
              ...prev,
              firstName: raw.firstName || "",
              lastName: raw.lastName || "",
              phone: raw.personal?.phone || "",
              dateOfBirth: raw.personal?.dateOfBirth || "",
              currentLocation: raw.personal?.location || "",
              linkedIn: raw.links?.linkedin || "",
              github: raw.links?.github || "",
              portfolio: raw.links?.portfolio || "",
              skills: raw.skills || [],
              education: raw.education?.length
                ? raw.education.map((edu) => ({
                    schoolName: edu.school || "",
                    degreeType: edu.degree || "",
                    major: edu.major || "",
                    gpa: edu.gpa || "",
                    startMonth: edu.startDate?.split("-")[1] || "",
                    startYear: edu.startDate?.split("-")[0] || "",
                    endMonth: edu.endDate?.split("-")[1] || "",
                    endYear: edu.endDate?.split("-")[0] || "",
                  }))
                : prev.education,
              noExperience: raw.lookingForFirstJob || false,
              experience: raw.experience?.length
                ? raw.experience.map((exp) => ({
                    positionTitle: exp.position || "",
                    companyName: exp.company || "",
                    location: exp.location || "",
                    startMonth: exp.startDate?.split("-")[1] || "",
                    startYear: exp.startDate?.split("-")[0] || "",
                    endMonth: exp.endDate?.split("-")[1] || "",
                    endYear: exp.endDate?.split("-")[0] || "",
                    currentlyWorking: exp.current || false,
                  }))
                : prev.experience,
              authorizedUS: raw.workAuthorization?.authorizedUS || null,
              authorizedCanada: raw.workAuthorization?.authorizedCanada || null,
              authorizedUK: raw.workAuthorization?.authorizedUK || null,
              requiresSponsorship: raw.workAuthorization?.requireSponsorship || null,
              gender: raw.eeo?.gender || "",
              ethnicity: raw.eeo?.ethnicity ? [raw.eeo.ethnicity] : [],
              isVeteran: raw.eeo?.veteranStatus || null,
              hasDisability: raw.eeo?.disabilityStatus || null,
            }));

            // Show the completed profile view
            setIsCompleted(true);
          }
        }
      } catch (error) {
        console.log("Could not load existing profile:", error.message);
      } finally {
        setIsLoading(false);
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
      // Convert form data to autofill profile format
      const autofillProfile = {
        // Basics
        firstName: formData.firstName,
        lastName: formData.lastName,
        resumeFile: formData.resumeFile || "",
        // Education
        education: formData.education
          .filter((e) => e.schoolName)
          .map((e) => ({
            school: e.schoolName,
            degree: e.degree,
            major: e.major,
            gpa: e.gpa,
            startDate: e.startDate,
            endDate: e.endDate,
          })),
        // Experience
        lookingForFirstJob: formData.noExperience,
        experience: formData.noExperience
          ? []
          : formData.experience
              .filter((e) => e.positionTitle)
              .map((e) => ({
                position: e.positionTitle,
                company: e.companyName,
                location: e.location,
                startDate: e.startDate,
                endDate: e.endDate,
                current: e.currentlyWorking,
              })),
        // Work Authorization
        workAuthorization: {
          authorizedUS: formData.authorizedUS,
          authorizedCanada: formData.authorizedCanada,
          authorizedUK: formData.authorizedUK,
          requireSponsorship: formData.requiresSponsorship,
        },
        // EEO
        eeo: {
          gender: formData.gender,
          ethnicity: formData.ethnicity,
          veteranStatus: formData.isVeteran,
          disabilityStatus: formData.hasDisability,
        },
        // Skills
        skills: formData.skills,
        // Personal
        personal: {
          location: formData.currentLocation,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
        },
        // Links
        links: {
          linkedin: formData.linkedIn,
          github: formData.github,
          portfolio: formData.portfolio,
        },
      };

      const response = await fetch(`${API_URL}/api/auth/autofill-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(autofillProfile),
      });

      if (response.ok) {
        setSaveMessage("Progress saved!");
        setTimeout(() => setSaveMessage(""), 2000);

        // Update profileCompleted in localStorage
        localStorage.setItem("profileCompleted", "true");
        window.dispatchEvent(new Event("authChange"));

        // Sync profile to Chrome extension (if installed)
        syncProfileWithExtension(autofillProfile).catch(() => {
          // Extension not installed - that's okay
        });
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
      setProfileExists(true); // Now the profile exists in database
      setIsCompleted(true);
      setSaveMessage(profileExists ? "Profile updated successfully!" : "Profile completed successfully!");
    }
  };

  // Edit a specific section
  const editSection = (stepIndex) => {
    setIsCompleted(false);
    setCurrentStep(stepIndex);
  };

  // Render profile summary after completion
  const renderProfileSummary = () => {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaCheck className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {profileExists ? "Your AutoFill Profile" : "Profile Complete!"}
            </h1>
            <p className="text-lg text-gray-600">
              {profileExists
                ? "Your profile is saved and ready to autofill job applications."
                : "Your profile is ready to autofill job applications."}
            </p>
            {profileExists && (
              <p className="text-sm text-gray-500 mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            )}
          </div>

          {/* Profile Summary Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Section: Basics */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaUser className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <p className="font-medium text-gray-900">{formData.firstName} {formData.lastName}</p>
                    </div>
                    {formData.resumeFileName && (
                      <div>
                        <span className="text-gray-500">Resume:</span>
                        <p className="font-medium text-gray-900">{formData.resumeFileName}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => editSection(0)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Section: Education */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaGraduationCap className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Education
                  </h3>
                  {formData.education.filter(e => e.schoolName).length > 0 ? (
                    <div className="space-y-3">
                      {formData.education.filter(e => e.schoolName).map((edu, i) => (
                        <div key={i} className="text-sm">
                          <p className="font-medium text-gray-900">{edu.schoolName}</p>
                          <p className="text-gray-600">
                            {edu.degreeType} {edu.major && `in ${edu.major}`}
                            {edu.gpa && ` • GPA: ${edu.gpa}`}
                          </p>
                          {edu.startYear && (
                            <p className="text-gray-500 text-xs">
                              {edu.startMonth}/{edu.startYear} - {edu.endMonth}/{edu.endYear || 'Present'}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No education added</p>
                  )}
                </div>
                <button
                  onClick={() => editSection(1)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Section: Experience */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaBriefcase className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Work Experience
                  </h3>
                  {formData.noExperience ? (
                    <p className="text-gray-500 text-sm italic">Looking for first job</p>
                  ) : formData.experience.filter(e => e.positionTitle).length > 0 ? (
                    <div className="space-y-3">
                      {formData.experience.filter(e => e.positionTitle).map((exp, i) => (
                        <div key={i} className="text-sm">
                          <p className="font-medium text-gray-900">{exp.positionTitle}</p>
                          <p className="text-gray-600">
                            {exp.company} {exp.location && `• ${exp.location}`}
                          </p>
                          {exp.startYear && (
                            <p className="text-gray-500 text-xs">
                              {exp.startMonth}/{exp.startYear} - {exp.currentlyWorking ? 'Present' : `${exp.endMonth}/${exp.endYear}`}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No experience added</p>
                  )}
                </div>
                <button
                  onClick={() => editSection(2)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Section: Work Authorization */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaPassport className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Work Authorization
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${formData.authorizedUS === true ? 'bg-green-500' : formData.authorizedUS === false ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                      <span className="text-gray-600">US: </span>
                      <span className="font-medium ml-1">{formData.authorizedUS === true ? 'Yes' : formData.authorizedUS === false ? 'No' : 'Not set'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${formData.authorizedCanada === true ? 'bg-green-500' : formData.authorizedCanada === false ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                      <span className="text-gray-600">Canada: </span>
                      <span className="font-medium ml-1">{formData.authorizedCanada === true ? 'Yes' : formData.authorizedCanada === false ? 'No' : 'Not set'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${formData.authorizedUK === true ? 'bg-green-500' : formData.authorizedUK === false ? 'bg-red-500' : 'bg-gray-300'}`}></span>
                      <span className="text-gray-600">UK: </span>
                      <span className="font-medium ml-1">{formData.authorizedUK === true ? 'Yes' : formData.authorizedUK === false ? 'No' : 'Not set'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-2 ${formData.requiresSponsorship === true ? 'bg-yellow-500' : formData.requiresSponsorship === false ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      <span className="text-gray-600">Sponsorship: </span>
                      <span className="font-medium ml-1">{formData.requiresSponsorship === true ? 'Required' : formData.requiresSponsorship === false ? 'Not needed' : 'Not set'}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => editSection(3)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Section: EEO */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaUsers className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Equal Employment Opportunity
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <p className="font-medium text-gray-900">{formData.gender || 'Not set'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Ethnicity:</span>
                      <p className="font-medium text-gray-900">
                        {formData.declineEthnicity ? 'Declined' : formData.ethnicity.length > 0 ? formData.ethnicity.join(', ') : 'Not set'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Veteran:</span>
                      <p className="font-medium text-gray-900">{formData.isVeteran === true ? 'Yes' : formData.isVeteran === false ? 'No' : 'Not set'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Disability:</span>
                      <p className="font-medium text-gray-900">{formData.hasDisability === true ? 'Yes' : formData.hasDisability === false ? 'No' : 'Not set'}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => editSection(4)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Section: Skills */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaTools className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Skills
                  </h3>
                  {formData.skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-[#e6f3f3] text-[#095555] rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No skills added</p>
                  )}
                </div>
                <button
                  onClick={() => editSection(5)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Section: Personal */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <p className="font-medium text-gray-900">{formData.currentLocation || 'Not set'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p className="font-medium text-gray-900">{formData.phone ? `${formData.phoneCountryCode} ${formData.phone}` : 'Not set'}</p>
                    </div>
                    {formData.dateOfBirth && (
                      <div>
                        <span className="text-gray-500">Date of Birth:</span>
                        <p className="font-medium text-gray-900">{formData.dateOfBirth}</p>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => editSection(6)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>

            {/* Section: Links */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
                    <FaLink className="w-5 h-5 mr-2 text-[#0d6d6e]" />
                    Links
                  </h3>
                  <div className="space-y-2 text-sm">
                    {formData.linkedIn && (
                      <div className="flex items-center">
                        <FaLinkedin className="w-4 h-4 mr-2 text-blue-600" />
                        <a href={formData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-[#0d6d6e] hover:underline truncate">
                          {formData.linkedIn}
                        </a>
                      </div>
                    )}
                    {formData.github && (
                      <div className="flex items-center">
                        <FaGithub className="w-4 h-4 mr-2" />
                        <a href={formData.github} target="_blank" rel="noopener noreferrer" className="text-[#0d6d6e] hover:underline truncate">
                          {formData.github}
                        </a>
                      </div>
                    )}
                    {formData.portfolio && (
                      <div className="flex items-center">
                        <FaGlobe className="w-4 h-4 mr-2 text-green-600" />
                        <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" className="text-[#0d6d6e] hover:underline truncate">
                          {formData.portfolio}
                        </a>
                      </div>
                    )}
                    {formData.otherWebsite && (
                      <div className="flex items-center">
                        <FaGlobe className="w-4 h-4 mr-2 text-gray-500" />
                        <a href={formData.otherWebsite} target="_blank" rel="noopener noreferrer" className="text-[#0d6d6e] hover:underline truncate">
                          {formData.otherWebsite}
                        </a>
                      </div>
                    )}
                    {!formData.linkedIn && !formData.github && !formData.portfolio && !formData.otherWebsite && (
                      <p className="text-gray-500 italic">No links added</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => editSection(7)}
                  className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium flex items-center"
                >
                  Edit <FaArrowRight className="w-3 h-3 ml-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Chrome Extension CTA */}
          <div className="mt-8 bg-gradient-to-r from-[#e6f3f3] to-[#f0f9f9] border border-[#0d6d6e]/30 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[#e6f3f3] rounded-xl flex items-center justify-center flex-shrink-0">
                <FaPuzzlePiece className="text-[#0d6d6e] text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Get the JobLeap Chrome Extension
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Install our Chrome extension to autofill job applications on Workday, Greenhouse, Lever, and more. Your profile data syncs automatically.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://chrome.google.com/webstore/detail/jobleap-autofill"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-[#0d6d6e] text-white rounded-lg text-sm font-medium hover:bg-[#095555] transition-colors"
                  >
                    <FaPuzzlePiece className="mr-2" />
                    Install Extension
                  </a>
                  <span className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm">
                    <FaSync className="mr-2" />
                    Profile auto-syncs with extension
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-[#0d6d6e] text-white rounded-lg font-medium hover:bg-[#095555] transition-all shadow-md"
            >
              Start Applying to Jobs
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render step navigation
  const renderStepNav = () => (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-[#0d6d6e] h-2 rounded-full transition-all duration-300"
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
                  ? "bg-[#0d6d6e] text-white shadow-lg"
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
        <span className="text-lg font-semibold text-[#0d6d6e]">
          Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].label}
        </span>
      </div>
    </div>
  );

  // Render tip box
  const renderTip = (message) => (
    <div className="flex items-start bg-[#f0f9f9] border border-[#cce7e7] rounded-lg p-4 mb-6">
      <FaLightbulb className="w-5 h-5 text-[#0d6d6e] mt-0.5 mr-3 flex-shrink-0" />
      <p className="text-sm text-[#095555]">{message}</p>
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
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] ${
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
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] ${
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
              ? "border-[#0d6d6e] bg-[#f0f9f9] text-[#095555]"
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
              ? "border-[#0d6d6e] bg-[#f0f9f9] text-[#095555]"
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
                ? "border-[#0d6d6e] bg-[#f0f9f9] text-[#095555]"
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
              ? "border-[#0d6d6e] bg-[#f0f9f9]"
              : "border-gray-300 hover:border-[#0d6d6e]"
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
              <p className="text-[#0d6d6e] font-medium">{formData.resumeFileName}</p>
            ) : (
              <>
                <p className="text-[#0d6d6e] font-medium">Upload a file</p>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
        className="flex items-center text-[#0d6d6e] hover:text-[#095555] font-medium"
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
            className="w-4 h-4 text-[#0d6d6e] rounded focus:ring-[#0d6d6e]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e] disabled:bg-gray-100"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e] disabled:bg-gray-100"
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
                    className="w-4 h-4 text-[#0d6d6e] rounded focus:ring-[#0d6d6e]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
            className="flex items-center text-[#0d6d6e] hover:text-[#095555] font-medium"
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
                  ? "border-[#0d6d6e] bg-[#f0f9f9] text-[#095555]"
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
                  ? "border-[#0d6d6e] bg-[#f0f9f9] text-[#095555]"
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
          className="text-[#0d6d6e] hover:underline"
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0d6d6e]"
            />
            {isCustomSkill && (
              <button
                type="button"
                onClick={addCustomSkill}
                className="px-4 py-2 bg-[#0d6d6e] text-white rounded-lg hover:bg-[#095555] transition-all flex items-center"
              >
                <FaPlus className="w-4 h-4 mr-1" />
                Add
              </button>
            )}
          </div>
          {isCustomSkill && (
            <p className="text-sm text-[#0d6d6e] mt-1">
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
                  className="px-3 py-1.5 rounded-full border border-gray-300 text-sm text-gray-600 hover:border-[#0d6d6e] hover:text-[#0d6d6e] transition-all"
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
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#e6f3f3] text-[#095555] text-sm"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className="ml-2 text-[#0d6d6e] hover:text-[#095555]"
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
            className="px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#0d6d6e] bg-gray-50"
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
            className={`flex-1 px-4 py-2 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#0d6d6e] ${
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
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#0d6d6e] ${
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
              className={`flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#0d6d6e] ${
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#0d6d6e]"
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
              className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#0d6d6e]"
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

  // Show loading spinner while checking for existing profile
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-8 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#0d6d6e] mx-auto mb-4" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Show profile summary if completed
  if (isCompleted) {
    return renderProfileSummary();
  }

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
                    className="flex items-center px-8 py-3 bg-[#0d6d6e] text-white rounded-lg font-medium hover:bg-[#095555] transition-all disabled:opacity-50 shadow-md"
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
                  className="flex items-center px-8 py-3 bg-[#0d6d6e] text-white rounded-lg font-medium hover:bg-[#095555] transition-all disabled:opacity-50 shadow-md"
                >
                  {isSaving ? (
                    <FaSpinner className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <FaCheck className="w-4 h-4 mr-2" />
                  )}
                  {profileExists ? "Update Profile" : "Complete Profile"}
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
