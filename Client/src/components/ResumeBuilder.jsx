import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaEye,
  FaDownload,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaArrowRight,
  FaTools,
  FaProjectDiagram,
  FaCertificate,
  FaMagic,
  FaSpinner,
  FaLightbulb,
  FaTimes,
  FaCheck
} from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL + "/api" || "http://localhost:5000/api";

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const totalSteps = 5;

  // AI Enhancement state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiTargetField, setAiTargetField] = useState({ section: null, index: null, field: null });

  // Skill input state
  const [skillInput, setSkillInput] = useState("");

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Action verbs for suggestions
  const actionVerbs = [
    "Achieved", "Implemented", "Developed", "Led", "Managed", "Created", "Designed",
    "Improved", "Increased", "Reduced", "Streamlined", "Launched", "Built", "Delivered",
    "Collaborated", "Coordinated", "Executed", "Generated", "Mentored", "Negotiated",
    "Optimized", "Orchestrated", "Pioneered", "Resolved", "Spearheaded", "Transformed"
  ];

  // Initialize state
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
      github: "",
      summary: ""
    },
    experience: [{
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }],
    education: [{
      degree: "",
      institution: "",
      location: "",
      graduationDate: "",
      gpa: "",
      relevantCourses: ""
    }],
    skills: {
      technical: [],
      soft: [],
      tools: [],
      languages: []
    },
    projects: [{
      name: "",
      description: "",
      technologies: "",
      link: "",
      startDate: "",
      endDate: ""
    }],
    certifications: [{
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
      link: ""
    }]
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    const savedStep = localStorage.getItem('resumeBuilderStep');
    const savedTemplate = localStorage.getItem('resumeBuilderTemplate');

    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Merge with default structure to handle new fields
        setResumeData(prev => ({
          ...prev,
          ...parsed,
          skills: {
            technical: [],
            soft: [],
            tools: [],
            languages: [],
            ...(parsed.skills || {})
          },
          projects: parsed.projects?.length ? parsed.projects : prev.projects,
          certifications: parsed.certifications?.length ? parsed.certifications : prev.certifications
        }));
      } catch (error) {
        console.error('Error loading saved resume data:', error);
      }
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    if (savedTemplate) {
      setSelectedTemplate(parseInt(savedTemplate));
    }
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem('resumeBuilderStep', currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem('resumeBuilderTemplate', selectedTemplate.toString());
  }, [selectedTemplate]);

  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "Clean and modern design perfect for corporate roles",
      colors: { primary: "#2563eb", secondary: "#3b82f6", accent: "#1e40af" }
    },
    {
      id: 2,
      name: "Creative",
      description: "Eye-catching layout ideal for design and creative positions",
      colors: { primary: "#7c3aed", secondary: "#a855f7", accent: "#6d28d9" }
    },
    {
      id: 3,
      name: "Minimal",
      description: "Simple and elegant format that focuses on content",
      colors: { primary: "#374151", secondary: "#6b7280", accent: "#1f2937" }
    },
    {
      id: 4,
      name: "Executive",
      description: "Sophisticated design for senior-level positions",
      colors: { primary: "#059669", secondary: "#10b981", accent: "#047857" }
    },
    {
      id: 5,
      name: "Modern",
      description: "Contemporary design with vibrant accents",
      colors: { primary: "#dc2626", secondary: "#ef4444", accent: "#b91c1c" }
    },
    {
      id: 6,
      name: "Tech",
      description: "Perfect for technology and engineering roles",
      colors: { primary: "#0891b2", secondary: "#06b6d4", accent: "#0e7490" }
    }
  ];

  const handleInputChange = (section, field, value, index = null) => {
    if (index !== null) {
      setResumeData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      }));
    } else if (section === 'skills') {
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [field]: value
        }
      }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    }
  };

  const addSection = (section) => {
    const newItems = {
      experience: { jobTitle: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" },
      education: { degree: "", institution: "", location: "", graduationDate: "", gpa: "", relevantCourses: "" },
      projects: { name: "", description: "", technologies: "", link: "", startDate: "", endDate: "" },
      certifications: { name: "", issuer: "", date: "", credentialId: "", link: "" }
    };

    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItems[section]]
    }));
  };

  const removeSection = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  // Skills management
  const addSkill = (category) => {
    if (skillInput.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], skillInput.trim()]
        }
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (category, index) => {
    setResumeData(prev => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((_, i) => i !== index)
      }
    }));
  };

  // AI Enhancement function
  const enhanceWithAI = async (text, type = "experience") => {
    setAiLoading(true);
    try {
      const response = await axios.post(`${API_URL}/ats/enhance-text`, {
        text: text,
        type: type  // Backend expects 'type' not 'prompt'
      });

      if (response.data.success) {
        setAiSuggestion(response.data.enhanced);
        setShowAiModal(true);
      }
    } catch (error) {
      console.error("AI enhancement error:", error);
      // Fallback suggestions if API fails
      const fallbackSuggestions = [
        `• ${actionVerbs[Math.floor(Math.random() * actionVerbs.length)]} ${text.toLowerCase()}`,
        `Consider adding specific metrics like percentages, dollar amounts, or time saved.`,
        `Try starting with: "${actionVerbs[Math.floor(Math.random() * actionVerbs.length)]}" for more impact.`
      ];
      setAiSuggestion(fallbackSuggestions.join("\n\n"));
      setShowAiModal(true);
    } finally {
      setAiLoading(false);
    }
  };

  const applyAiSuggestion = () => {
    if (aiTargetField.section && aiTargetField.field) {
      handleInputChange(aiTargetField.section, aiTargetField.field, aiSuggestion, aiTargetField.index);
    }
    setShowAiModal(false);
    setAiSuggestion("");
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,20}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateURL = (url) => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    const { personalInfo } = resumeData;

    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!personalInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!personalInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(personalInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!personalInfo.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (personalInfo.website && !validateURL(personalInfo.website)) {
      newErrors.website = 'Please enter a valid URL';
    }
    if (personalInfo.linkedin && !validateURL(personalInfo.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    resumeData.experience.forEach((exp, index) => {
      if (!exp.jobTitle.trim()) {
        newErrors[`experience_${index}_jobTitle`] = 'Job title is required';
      }
      if (!exp.company.trim()) {
        newErrors[`experience_${index}_company`] = 'Company name is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const getFieldError = (field) => {
    return touched[field] && errors[field];
  };

  // Generate resume HTML
  const generateResumeHTML = () => {
    const template = templates.find(t => t.id === selectedTemplate);
    const colors = template?.colors || { primary: "#2563eb", secondary: "#3b82f6", accent: "#1e40af" };
    const allSkills = [
      ...resumeData.skills.technical,
      ...resumeData.skills.soft,
      ...resumeData.skills.tools,
      ...resumeData.skills.languages
    ];

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.5; color: #333; font-size: 11px; }
        .resume { max-width: 800px; margin: 0 auto; padding: 30px; }
        .header { text-align: center; border-bottom: 3px solid ${colors.primary}; padding-bottom: 15px; margin-bottom: 20px; }
        .name { font-size: 28px; font-weight: bold; color: ${colors.accent}; margin-bottom: 8px; letter-spacing: 1px; }
        .contact { font-size: 11px; color: #666; }
        .contact a { color: ${colors.primary}; text-decoration: none; }
        .section { margin-bottom: 18px; }
        .section-title { font-size: 13px; font-weight: bold; color: ${colors.accent}; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid ${colors.secondary}; padding-bottom: 4px; margin-bottom: 10px; }
        .item { margin-bottom: 12px; }
        .item-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
        .item-title { font-weight: bold; font-size: 12px; color: #1f2937; }
        .item-subtitle { font-size: 11px; color: #4b5563; }
        .item-date { font-size: 10px; color: #6b7280; font-style: italic; }
        .item-description { margin-left: 15px; font-size: 11px; color: #374151; }
        .item-description li { margin-bottom: 3px; }
        .skills-container { display: flex; flex-wrap: wrap; gap: 6px; }
        .skill-tag { background: ${colors.primary}15; color: ${colors.accent}; padding: 3px 10px; border-radius: 12px; font-size: 10px; border: 1px solid ${colors.primary}30; }
        .summary { font-size: 11px; color: #4b5563; line-height: 1.6; }
        .two-column { display: flex; gap: 8px; }
        .two-column > div { flex: 1; }
        @media print {
            body { font-size: 10px; }
            .resume { padding: 15px; }
            @page { margin: 0.4in; }
        }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <div class="name">${resumeData.personalInfo.fullName || 'Your Name'}</div>
            <div class="contact">
                ${resumeData.personalInfo.email || 'email@example.com'}
                ${resumeData.personalInfo.phone ? ` | ${resumeData.personalInfo.phone}` : ''}
                ${resumeData.personalInfo.location ? ` | ${resumeData.personalInfo.location}` : ''}
                <br>
                ${resumeData.personalInfo.linkedin ? `<a href="${resumeData.personalInfo.linkedin}">LinkedIn</a>` : ''}
                ${resumeData.personalInfo.github ? ` | <a href="${resumeData.personalInfo.github}">GitHub</a>` : ''}
                ${resumeData.personalInfo.website ? ` | <a href="${resumeData.personalInfo.website}">Portfolio</a>` : ''}
            </div>
        </div>

        ${resumeData.personalInfo.summary ? `
        <div class="section">
            <div class="section-title">Professional Summary</div>
            <p class="summary">${resumeData.personalInfo.summary}</p>
        </div>
        ` : ''}

        ${resumeData.experience.some(e => e.jobTitle || e.company) ? `
        <div class="section">
            <div class="section-title">Professional Experience</div>
            ${resumeData.experience.filter(e => e.jobTitle || e.company).map(exp => `
            <div class="item">
                <div class="item-header">
                    <div>
                        <span class="item-title">${exp.jobTitle || 'Position'}</span>
                        <span class="item-subtitle"> | ${exp.company || 'Company'}${exp.location ? `, ${exp.location}` : ''}</span>
                    </div>
                    <span class="item-date">${exp.startDate || 'Start'} - ${exp.current ? 'Present' : exp.endDate || 'End'}</span>
                </div>
                ${exp.description ? `<ul class="item-description">${exp.description.split('\n').filter(line => line.trim()).map(line => `<li>${line.replace(/^[•\-\*]\s*/, '')}</li>`).join('')}</ul>` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.projects.some(p => p.name) ? `
        <div class="section">
            <div class="section-title">Projects</div>
            ${resumeData.projects.filter(p => p.name).map(proj => `
            <div class="item">
                <div class="item-header">
                    <div>
                        <span class="item-title">${proj.name}</span>
                        ${proj.technologies ? `<span class="item-subtitle"> | ${proj.technologies}</span>` : ''}
                    </div>
                    ${proj.startDate || proj.endDate ? `<span class="item-date">${proj.startDate || ''} ${proj.startDate && proj.endDate ? '-' : ''} ${proj.endDate || ''}</span>` : ''}
                </div>
                ${proj.description ? `<ul class="item-description">${proj.description.split('\n').filter(line => line.trim()).map(line => `<li>${line.replace(/^[•\-\*]\s*/, '')}</li>`).join('')}</ul>` : ''}
                ${proj.link ? `<div style="margin-left: 15px; font-size: 10px;"><a href="${proj.link}" style="color: ${colors.primary};">View Project</a></div>` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${allSkills.length > 0 ? `
        <div class="section">
            <div class="section-title">Skills</div>
            <div class="skills-container">
                ${allSkills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
        ` : ''}

        ${resumeData.education.some(e => e.degree || e.institution) ? `
        <div class="section">
            <div class="section-title">Education</div>
            ${resumeData.education.filter(e => e.degree || e.institution).map(edu => `
            <div class="item">
                <div class="item-header">
                    <div>
                        <span class="item-title">${edu.degree || 'Degree'}</span>
                        <span class="item-subtitle"> | ${edu.institution || 'Institution'}${edu.location ? `, ${edu.location}` : ''}</span>
                    </div>
                    <span class="item-date">${edu.graduationDate || 'Graduation Date'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</span>
                </div>
                ${edu.relevantCourses ? `<div class="item-description" style="margin-top: 3px;"><em>Relevant Coursework:</em> ${edu.relevantCourses}</div>` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}

        ${resumeData.certifications.some(c => c.name) ? `
        <div class="section">
            <div class="section-title">Certifications</div>
            ${resumeData.certifications.filter(c => c.name).map(cert => `
            <div class="item">
                <div class="item-header">
                    <div>
                        <span class="item-title">${cert.name}</span>
                        ${cert.issuer ? `<span class="item-subtitle"> | ${cert.issuer}</span>` : ''}
                    </div>
                    ${cert.date ? `<span class="item-date">${cert.date}</span>` : ''}
                </div>
                ${cert.credentialId ? `<div style="margin-left: 15px; font-size: 10px; color: #666;">Credential ID: ${cert.credentialId}</div>` : ''}
            </div>
            `).join('')}
        </div>
        ` : ''}
    </div>
</body>
</html>`;
  };

  const downloadResume = () => {
    if (!validateStep2()) {
      alert('Please fill in all required personal information fields.');
      return;
    }

    const htmlContent = generateResumeHTML();
    const element = document.createElement('a');
    const file = new Blob([htmlContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const generatePDF = () => {
    if (!validateStep2()) {
      alert('Please fill in all required personal information fields.');
      return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(generateResumeHTML());
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
  };

  const nextStep = () => {
    let isValid = true;

    if (currentStep === 2) {
      isValid = validateStep2();
      if (!isValid) {
        setTouched({
          fullName: true, email: true, phone: true, location: true,
          website: true, linkedin: true, summary: true
        });
      }
    } else if (currentStep === 3) {
      isValid = validateStep3();
    }

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      setErrors({});
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Step 1: Template Selection
  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FaFileAlt className="text-4xl text-[#0d6d6e] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a resume template that matches your style and industry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'border-[#0d6d6e] bg-[#e6f3f3] transform scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-md mb-4 h-32 flex flex-col justify-center p-4 border-l-4" style={{ borderLeftColor: template.colors.primary }}>
                <div className="text-xs font-bold mb-2" style={{ color: template.colors.primary }}>
                  {resumeData.personalInfo.fullName || 'JOHN DOE'}
                </div>
                <div className="text-xs text-gray-600 mb-2">Professional Summary</div>
                <div className="text-xs font-semibold" style={{ color: template.colors.accent }}>EXPERIENCE • SKILLS • EDUCATION</div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>

              <div className="flex items-center space-x-1 mt-2">
                <span className="text-xs text-gray-500">Colors:</span>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.primary }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.secondary }}></div>
              </div>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-[#0d6d6e] rounded-full flex items-center justify-center">
                <FaCheck className="text-white text-xs" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  // Step 2: Personal Information
  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FaUser className="text-4xl text-[#0d6d6e] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Add your contact details and professional summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
          <input
            type="text"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            onBlur={() => handleBlur('fullName')}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
              getFieldError('fullName') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {getFieldError('fullName') && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
              getFieldError('email') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {getFieldError('email') && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
              getFieldError('phone') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="+1 (555) 123-4567"
          />
          {getFieldError('phone') && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
            onBlur={() => handleBlur('location')}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
              getFieldError('location') ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="New York, NY"
          />
          {getFieldError('location') && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">LinkedIn</label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">GitHub</label>
          <input
            type="url"
            value={resumeData.personalInfo.github}
            onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
            placeholder="https://github.com/yourusername"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Portfolio Website</label>
          <input
            type="url"
            value={resumeData.personalInfo.website}
            onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Professional Summary
          <span className="font-normal text-gray-500 ml-2">({resumeData.personalInfo.summary.length}/500)</span>
        </label>
        <textarea
          value={resumeData.personalInfo.summary}
          onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
          rows="3"
          maxLength={500}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none resize-none"
          placeholder="Results-driven software engineer with 5+ years of experience building scalable web applications..."
        />
        <p className="text-xs text-gray-500 mt-1">
          <FaLightbulb className="inline mr-1" />
          Tip: Keep it concise. Focus on your key achievements and what you bring to the table.
        </p>
      </div>
    </div>
  );

  // Step 3: Experience
  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <FaBriefcase className="text-4xl text-[#0d6d6e] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your professional experience with measurable achievements</p>
      </div>

      {/* Action Verb Suggestions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <FaLightbulb className="text-blue-600" />
          <span className="font-medium text-blue-900">Pro Tip: Start bullet points with action verbs</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {actionVerbs.slice(0, 12).map((verb, i) => (
            <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">{verb}</span>
          ))}
        </div>
      </div>

      {resumeData.experience.map((exp, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-5 relative">
          {resumeData.experience.length > 1 && (
            <button
              onClick={() => removeSection('experience', index)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700"
            >
              <FaMinus />
            </button>
          )}

          <h3 className="font-semibold text-gray-900 mb-4">Experience #{index + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title *</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => handleInputChange('experience', 'jobTitle', e.target.value, index)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
                  getFieldError(`experience_${index}_jobTitle`) ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                className={`w-full px-4 py-2.5 border rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none ${
                  getFieldError(`experience_${index}_company`) ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Google"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                className="rounded border-gray-300 text-[#0d6d6e] focus:ring-[#0d6d6e]"
              />
              <label className="text-sm text-gray-700">Currently working here</label>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
              />
            </div>

            {!exp.current && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                />
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold text-gray-700">
                Description (use bullet points)
              </label>
              {exp.description && (
                <button
                  onClick={() => {
                    setAiTargetField({ section: 'experience', index, field: 'description' });
                    enhanceWithAI(exp.description, 'experience');
                  }}
                  disabled={aiLoading}
                  className="flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700"
                >
                  {aiLoading ? <FaSpinner className="animate-spin" /> : <FaMagic />}
                  <span>Enhance with AI</span>
                </button>
              )}
            </div>
            <textarea
              value={exp.description}
              onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
              rows="4"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none resize-none"
              placeholder="• Developed and maintained web applications using React and Node.js&#10;• Led a team of 5 engineers to deliver features 20% faster&#10;• Reduced server costs by 30% through optimization"
            />
          </div>
        </div>
      ))}

      <button
        onClick={() => addSection('experience')}
        className="flex items-center space-x-2 text-[#0d6d6e] hover:text-[#095555] font-medium"
      >
        <FaPlus />
        <span>Add More Experience</span>
      </button>
    </div>
  );

  // Step 4: Skills & Projects
  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FaTools className="text-4xl text-[#0d6d6e] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Projects</h2>
        <p className="text-gray-600">Showcase your technical skills and notable projects</p>
      </div>

      {/* Skills Section */}
      <div className="bg-gray-50 rounded-lg p-5">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaTools className="text-[#0d6d6e]" />
          Skills
        </h3>

        {['technical', 'tools', 'soft', 'languages'].map((category) => (
          <div key={category} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
              {category === 'technical' ? 'Technical Skills' :
               category === 'tools' ? 'Tools & Technologies' :
               category === 'soft' ? 'Soft Skills' : 'Languages'}
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill(category))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-sm"
                placeholder={`Add ${category} skill...`}
              />
              <button
                onClick={() => addSkill(category)}
                className="px-4 py-2 bg-[#0d6d6e] text-white rounded-lg hover:bg-[#095555] transition-colors"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills[category].map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(category, idx)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Projects Section */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaProjectDiagram className="text-[#0d6d6e]" />
          Projects
        </h3>

        {resumeData.projects.map((proj, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-5 relative mb-4">
            {resumeData.projects.length > 1 && (
              <button
                onClick={() => removeSection('projects', index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <FaMinus />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Project Name</label>
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) => handleInputChange('projects', 'name', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="E-commerce Platform"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Technologies Used</label>
                <input
                  type="text"
                  value={proj.technologies}
                  onChange={(e) => handleInputChange('projects', 'technologies', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Project Link</label>
                <input
                  type="url"
                  value={proj.link}
                  onChange={(e) => handleInputChange('projects', 'link', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Start</label>
                  <input
                    type="month"
                    value={proj.startDate}
                    onChange={(e) => handleInputChange('projects', 'startDate', e.target.value, index)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">End</label>
                  <input
                    type="month"
                    value={proj.endDate}
                    onChange={(e) => handleInputChange('projects', 'endDate', e.target.value, index)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                value={proj.description}
                onChange={(e) => handleInputChange('projects', 'description', e.target.value, index)}
                rows="3"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none resize-none"
                placeholder="• Built a full-stack e-commerce platform with 10k+ users&#10;• Implemented payment processing with Stripe API"
              />
            </div>
          </div>
        ))}

        <button
          onClick={() => addSection('projects')}
          className="flex items-center space-x-2 text-[#0d6d6e] hover:text-[#095555] font-medium"
        >
          <FaPlus />
          <span>Add More Projects</span>
        </button>
      </div>
    </div>
  );

  // Step 5: Education & Certifications
  const renderStep5 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FaGraduationCap className="text-4xl text-[#0d6d6e] mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Certifications</h2>
        <p className="text-gray-600">Add your educational background and professional certifications</p>
      </div>

      {/* Education */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaGraduationCap className="text-[#0d6d6e]" />
          Education
        </h3>

        {resumeData.education.map((edu, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-5 relative mb-4">
            {resumeData.education.length > 1 && (
              <button
                onClick={() => removeSection('education', index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <FaMinus />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="Stanford University"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => handleInputChange('education', 'location', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="Stanford, CA"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Graduation</label>
                  <input
                    type="month"
                    value={edu.graduationDate}
                    onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">GPA</label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Relevant Coursework</label>
                <input
                  type="text"
                  value={edu.relevantCourses}
                  onChange={(e) => handleInputChange('education', 'relevantCourses', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="Data Structures, Algorithms, Machine Learning, Database Systems"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => addSection('education')}
          className="flex items-center space-x-2 text-[#0d6d6e] hover:text-[#095555] font-medium mb-8"
        >
          <FaPlus />
          <span>Add More Education</span>
        </button>
      </div>

      {/* Certifications */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FaCertificate className="text-[#0d6d6e]" />
          Certifications
        </h3>

        {resumeData.certifications.map((cert, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-5 relative mb-4">
            {resumeData.certifications.length > 1 && (
              <button
                onClick={() => removeSection('certifications', index)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700"
              >
                <FaMinus />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleInputChange('certifications', 'name', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="AWS Solutions Architect"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => handleInputChange('certifications', 'issuer', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Date Earned</label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => handleInputChange('certifications', 'date', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Credential ID</label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) => handleInputChange('certifications', 'credentialId', e.target.value, index)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  placeholder="ABC123XYZ"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => addSection('certifications')}
          className="flex items-center space-x-2 text-[#0d6d6e] hover:text-[#095555] font-medium"
        >
          <FaPlus />
          <span>Add More Certifications</span>
        </button>
      </div>

      {/* Download Section */}
      <div className="bg-gradient-to-r from-[#0d6d6e] to-[#095555] rounded-lg p-6 text-white text-center">
        <h3 className="text-xl font-bold mb-2">Your Resume is Ready!</h3>
        <p className="mb-4 opacity-90">Preview your resume and download it in your preferred format</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center justify-center gap-2 bg-white text-[#0d6d6e] px-6 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <FaEye />
            <span>Preview</span>
          </button>

          <button
            onClick={generatePDF}
            className="flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
          >
            <FaDownload />
            <span>Print / Save as PDF</span>
          </button>

          <button
            onClick={downloadResume}
            className="flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-white/30 transition-colors border border-white/30"
          >
            <FaDownload />
            <span>Download HTML</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* AI Suggestion Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <FaMagic className="text-purple-600" />
                AI Suggestion
              </h3>
              <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-gray-600">
                <FaTimes />
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4 whitespace-pre-wrap text-sm">
              {aiSuggestion}
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={applyAiSuggestion}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Apply Suggestion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg">Resume Preview</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={generatePDF}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#0d6d6e] text-white rounded-lg text-sm hover:bg-[#095555]"
                >
                  <FaDownload className="text-xs" />
                  <span>Print/PDF</span>
                </button>
                <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
                  <FaTimes className="text-xl" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 bg-gray-100">
              <iframe
                srcDoc={generateResumeHTML()}
                className="w-full h-full border rounded-lg bg-white shadow-lg"
                style={{ minHeight: '800px' }}
                title="Resume Preview"
              />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create a professional, ATS-friendly resume in minutes</p>

          {/* Quick Preview Button */}
          <button
            onClick={() => setShowPreview(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
          >
            <FaEye />
            <span>Quick Preview</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {Array.from({ length: totalSteps }, (_, i) => {
              const stepNumber = i + 1;
              const isActive = currentStep === stepNumber;
              const isCompleted = currentStep > stepNumber;

              return (
                <React.Fragment key={stepNumber}>
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-colors ${
                      isCompleted ? "bg-green-600 text-white" :
                      isActive ? "bg-[#0d6d6e] text-white" :
                      "bg-gray-200 text-gray-600"
                    }`}>
                      {isCompleted ? <FaCheck /> : stepNumber}
                    </div>
                    <p className={`text-xs mt-1 hidden sm:block ${isActive ? "text-[#0d6d6e] font-medium" : "text-gray-500"}`}>
                      {stepNumber === 1 && "Template"}
                      {stepNumber === 2 && "Personal"}
                      {stepNumber === 3 && "Experience"}
                      {stepNumber === 4 && "Skills"}
                      {stepNumber === 5 && "Education"}
                    </p>
                  </div>
                  {stepNumber < totalSteps && (
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${
                      currentStep > stepNumber ? "bg-green-600" : "bg-gray-200"
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-5 py-2.5 text-gray-600 hover:text-gray-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FaArrowLeft />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-2 px-4 py-2 text-[#0d6d6e] hover:bg-[#0d6d6e]/10 rounded-lg transition-colors"
                >
                  <FaEye />
                  <span className="hidden sm:inline">Preview</span>
                </button>
                <span className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </span>
              </div>

              {currentStep < totalSteps && (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-[#0d6d6e] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
                >
                  <span>Next</span>
                  <FaArrowRight />
                </button>
              )}

              {currentStep === totalSteps && (
                <button
                  onClick={generatePDF}
                  className="flex items-center gap-2 bg-[#0d6d6e] text-white px-5 py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
                >
                  <FaDownload />
                  <span>Download Resume</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
