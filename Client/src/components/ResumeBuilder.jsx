import React, { useState, useEffect } from "react";
import { 
  FaFileAlt, 
  FaUser, 
  FaBriefcase, 
  FaGraduationCap,
  FaCog,
  FaEye,
  FaDownload,
  FaEdit,
  FaPlus,
  FaMinus,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const totalSteps = 4;

  // Initialize state first
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedin: "",
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
      gpa: ""
    }],
    skills: [],
    certifications: [],
    projects: []
  });

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    const savedStep = localStorage.getItem('resumeBuilderStep');
    const savedTemplate = localStorage.getItem('resumeBuilderTemplate');
    
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
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
    const newItem = section === 'experience' 
      ? { jobTitle: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "" }
      : section === 'education'
      ? { degree: "", institution: "", location: "", graduationDate: "", gpa: "" }
      : "";
      
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const removeSection = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const downloadResume = () => {
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
      alert('Please fill in at least your name and email before downloading');
      return;
    }

    const template = templates.find(t => t.id === selectedTemplate);
    const colors = template?.colors || { primary: "#2563eb", secondary: "#3b82f6", accent: "#1e40af" };

    // Create HTML resume content for better formatting
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; }
        .header { text-align: center; border-bottom: 3px solid ${colors.primary}; padding-bottom: 20px; margin-bottom: 30px; }
        .name { font-size: 32px; font-weight: bold; color: ${colors.accent}; margin-bottom: 10px; }
        .contact { font-size: 14px; color: #666; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; color: ${colors.accent}; border-bottom: 2px solid ${colors.secondary}; padding-bottom: 5px; margin-bottom: 15px; }
        .job { margin-bottom: 20px; }
        .job-title { font-weight: bold; font-size: 16px; color: #1f2937; }
        .job-details { font-size: 14px; color: #6b7280; margin-bottom: 8px; }
        .job-description { margin-left: 20px; }
        .education-item { margin-bottom: 15px; }
        .skills { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill { background: ${colors.primary}20; color: ${colors.accent}; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
        .template-info { text-align: center; margin-top: 20px; padding: 15px; background: ${colors.primary}10; border-radius: 8px; color: ${colors.accent}; }
        @media print { body { margin: 0; padding: 20px; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${resumeData.personalInfo.fullName}</div>
        <div class="contact">
            ${resumeData.personalInfo.email}
            ${resumeData.personalInfo.phone ? ` • ${resumeData.personalInfo.phone}` : ''}
            ${resumeData.personalInfo.location ? ` • ${resumeData.personalInfo.location}` : ''}
            <br>
            ${resumeData.personalInfo.linkedin ? `LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}
            ${resumeData.personalInfo.website ? ` • Website: ${resumeData.personalInfo.website}` : ''}
        </div>
    </div>

    ${resumeData.personalInfo.summary ? `
    <div class="section">
        <div class="section-title">PROFESSIONAL SUMMARY</div>
        <p>${resumeData.personalInfo.summary}</p>
    </div>
    ` : ''}

    <div class="section">
        <div class="section-title">WORK EXPERIENCE</div>
        ${resumeData.experience.map(exp => `
        <div class="job">
            <div class="job-title">${exp.jobTitle || 'Position'}</div>
            <div class="job-details">
                ${exp.company || 'Company'} ${exp.location ? `• ${exp.location}` : ''}
                <br>
                ${exp.startDate || 'Start Date'} - ${exp.current ? 'Present' : exp.endDate || 'End Date'}
            </div>
            ${exp.description ? `<div class="job-description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">EDUCATION</div>
        ${resumeData.education.map(edu => `
        <div class="education-item">
            <strong>${edu.degree || 'Degree'}</strong><br>
            ${edu.institution || 'Institution'} ${edu.location ? `• ${edu.location}` : ''}
            <br>
            Graduated: ${edu.graduationDate || 'Date not specified'}
            ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
        </div>
        `).join('')}
    </div>

    <div class="template-info">
        <strong>${template?.name || 'Professional'} Template</strong><br>
        Generated by JobLeap Resume Builder • ${new Date().toLocaleDateString()}
    </div>
</body>
</html>
    `;

    // Create and download HTML file
    const element = document.createElement('a');
    const file = new Blob([htmlContent], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show success message with instructions
    alert('Resume downloaded as HTML! You can:\n• Open it in any browser and print as PDF\n• Use browser\'s "Print to PDF" option\n• Copy content to Word/Google Docs\n• Email directly to employers');
  };

  const generatePDF = () => {
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
      alert('Please fill in at least your name and email before generating PDF');
      return;
    }

    const template = templates.find(t => t.id === selectedTemplate);
    const colors = template?.colors || { primary: "#2563eb", secondary: "#3b82f6", accent: "#1e40af" };

    // Create optimized HTML for PDF
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${resumeData.personalInfo.fullName} - Resume</title>
    <style>
        @media print {
            @page { margin: 0.5in; }
            body { margin: 0; padding: 0; }
        }
        body { font-family: Arial, sans-serif; line-height: 1.4; color: #333; font-size: 12px; }
        .header { text-align: center; border-bottom: 3px solid ${colors.primary}; padding-bottom: 15px; margin-bottom: 20px; }
        .name { font-size: 24px; font-weight: bold; color: ${colors.accent}; margin-bottom: 8px; }
        .contact { font-size: 11px; color: #666; }
        .section { margin-bottom: 20px; page-break-inside: avoid; }
        .section-title { font-size: 14px; font-weight: bold; color: ${colors.accent}; border-bottom: 2px solid ${colors.secondary}; padding-bottom: 3px; margin-bottom: 10px; }
        .job { margin-bottom: 15px; page-break-inside: avoid; }
        .job-title { font-weight: bold; font-size: 13px; color: #1f2937; }
        .job-details { font-size: 11px; color: #6b7280; margin-bottom: 5px; }
        .job-description { margin-left: 15px; font-size: 11px; }
        .education-item { margin-bottom: 10px; }
        .template-footer { text-align: center; margin-top: 30px; font-size: 9px; color: #999; }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">${resumeData.personalInfo.fullName}</div>
        <div class="contact">
            ${resumeData.personalInfo.email}
            ${resumeData.personalInfo.phone ? ` • ${resumeData.personalInfo.phone}` : ''}
            ${resumeData.personalInfo.location ? ` • ${resumeData.personalInfo.location}` : ''}
            <br>
            ${resumeData.personalInfo.linkedin ? `LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}
            ${resumeData.personalInfo.website ? ` • Website: ${resumeData.personalInfo.website}` : ''}
        </div>
    </div>

    ${resumeData.personalInfo.summary ? `
    <div class="section">
        <div class="section-title">PROFESSIONAL SUMMARY</div>
        <p>${resumeData.personalInfo.summary}</p>
    </div>
    ` : ''}

    <div class="section">
        <div class="section-title">WORK EXPERIENCE</div>
        ${resumeData.experience.map(exp => `
        <div class="job">
            <div class="job-title">${exp.jobTitle || 'Position'}</div>
            <div class="job-details">
                ${exp.company || 'Company'} ${exp.location ? `• ${exp.location}` : ''}
                <br>
                ${exp.startDate || 'Start Date'} - ${exp.current ? 'Present' : exp.endDate || 'End Date'}
            </div>
            ${exp.description ? `<div class="job-description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
        `).join('')}
    </div>

    <div class="section">
        <div class="section-title">EDUCATION</div>
        ${resumeData.education.map(edu => `
        <div class="education-item">
            <strong>${edu.degree || 'Degree'}</strong><br>
            ${edu.institution || 'Institution'} ${edu.location ? `• ${edu.location}` : ''}
            <br>
            Graduated: ${edu.graduationDate || 'Date not specified'}
            ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
        </div>
        `).join('')}
    </div>

    <div class="template-footer">
        ${template?.name || 'Professional'} Template • Generated by JobLeap Resume Builder
    </div>
</body>
</html>
    `;

    // Open print dialog for PDF generation
    const printWindow = window.open('', '_blank');
    printWindow.document.write(pdfContent);
    printWindow.document.close();
    
    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
    };
    
    alert('PDF print dialog opened! Choose "Save as PDF" or your PDF printer to generate the PDF file.');
  };

  const previewResume = () => {
    if (!resumeData.personalInfo.fullName || !resumeData.personalInfo.email) {
      alert('Please fill in at least your name and email before previewing');
      return;
    }

    // Create a preview window with the resume content
    const previewContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Resume Preview - ${resumeData.personalInfo.fullName}</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 40px; background: #f8fafc; }
        .resume { background: white; padding: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px; }
        .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
        .name { font-size: 32px; font-weight: bold; color: #1e40af; margin-bottom: 10px; }
        .contact { font-size: 14px; color: #666; }
        .section { margin-bottom: 30px; }
        .section-title { font-size: 20px; font-weight: bold; color: #1e40af; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; margin-bottom: 15px; }
        .job { margin-bottom: 20px; }
        .job-title { font-weight: bold; font-size: 16px; color: #1f2937; }
        .job-details { font-size: 14px; color: #6b7280; margin-bottom: 8px; }
        .job-description { margin-left: 20px; }
        .education-item { margin-bottom: 15px; }
        .preview-note { background: #dbeafe; color: #1e40af; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
    </style>
</head>
<body>
    <div class="preview-note">
        📄 Resume Preview - This is how your resume will look when downloaded
    </div>
    <div class="resume">
        <div class="header">
            <div class="name">${resumeData.personalInfo.fullName}</div>
            <div class="contact">
                ${resumeData.personalInfo.email}
                ${resumeData.personalInfo.phone ? ` • ${resumeData.personalInfo.phone}` : ''}
                ${resumeData.personalInfo.location ? ` • ${resumeData.personalInfo.location}` : ''}
                <br>
                ${resumeData.personalInfo.linkedin ? `LinkedIn: ${resumeData.personalInfo.linkedin}` : ''}
                ${resumeData.personalInfo.website ? ` • Website: ${resumeData.personalInfo.website}` : ''}
            </div>
        </div>

        ${resumeData.personalInfo.summary ? `
        <div class="section">
            <div class="section-title">PROFESSIONAL SUMMARY</div>
            <p>${resumeData.personalInfo.summary}</p>
        </div>
        ` : ''}

        <div class="section">
            <div class="section-title">WORK EXPERIENCE</div>
            ${resumeData.experience.map(exp => `
            <div class="job">
                <div class="job-title">${exp.jobTitle || 'Position'}</div>
                <div class="job-details">
                    ${exp.company || 'Company'} ${exp.location ? `• ${exp.location}` : ''}
                    <br>
                    ${exp.startDate || 'Start Date'} - ${exp.current ? 'Present' : exp.endDate || 'End Date'}
                </div>
                ${exp.description ? `<div class="job-description">${exp.description.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
            `).join('')}
        </div>

        <div class="section">
            <div class="section-title">EDUCATION</div>
            ${resumeData.education.map(edu => `
            <div class="education-item">
                <strong>${edu.degree || 'Degree'}</strong><br>
                ${edu.institution || 'Institution'} ${edu.location ? `• ${edu.location}` : ''}
                <br>
                Graduated: ${edu.graduationDate || 'Date not specified'}
                ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
            </div>
            `).join('')}
        </div>
    </div>
</body>
</html>
    `;

    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(previewContent);
    previewWindow.document.close();
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderStep1 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FaFileAlt className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a resume template that matches your style and industry</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-300 ${
              selectedTemplate === template.id
                ? 'border-blue-500 bg-blue-50 transform scale-105'
                : 'border-gray-200 hover:border-gray-300 hover:transform hover:scale-102'
            }`}
          >
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-md mb-4 h-40 flex flex-col justify-center p-4 border-l-4" style={{ borderLeftColor: template.colors.primary }}>
                <div className="text-xs font-bold mb-2" style={{ color: template.colors.primary }}>
                  {resumeData.personalInfo.fullName || 'JOHN DOE'}
                </div>
                <div className="text-xs text-gray-600 mb-2">Professional Summary</div>
                <div className="flex space-x-1 mb-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="h-1 flex-1 bg-gray-200 rounded" style={{ backgroundColor: i === 1 ? template.colors.secondary : '#e5e7eb' }}></div>
                  ))}
                </div>
                <div className="text-xs font-semibold mb-1" style={{ color: template.colors.accent }}>EXPERIENCE</div>
                <div className="text-xs font-semibold" style={{ color: template.colors.accent }}>EDUCATION</div>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
              
              <div className="flex items-center space-x-1 mt-2">
                <span className="text-xs text-gray-500">Colors:</span>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.primary }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.secondary }}></div>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.colors.accent }}></div>
              </div>
            </div>
            {selectedTemplate === template.id && (
              <div className="absolute top-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FaUser className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Add your contact details and professional summary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            value={resumeData.personalInfo.fullName}
            onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
          <input
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            value={resumeData.personalInfo.location}
            onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="New York, NY"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={resumeData.personalInfo.website}
            onChange={(e) => handleInputChange('personalInfo', 'website', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="https://yourwebsite.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn</label>
          <input
            type="url"
            value={resumeData.personalInfo.linkedin}
            onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Professional Summary</label>
        <textarea
          value={resumeData.personalInfo.summary}
          onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)}
          rows="4"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
          placeholder="A brief overview of your professional background, key skills, and career objectives..."
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FaBriefcase className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Work Experience</h2>
        <p className="text-gray-600">Add your professional experience and achievements</p>
      </div>

      {resumeData.experience.map((exp, index) => (
        <div key={index} className="bg-gray-50 rounded-2xl p-6 relative">
          {resumeData.experience.length > 1 && (
            <button
              onClick={() => removeSection('experience', index)}
              className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            >
              <FaMinus />
            </button>
          )}
          
          <h3 className="font-semibold text-gray-900 mb-4">Experience #{index + 1}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Job Title *</label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) => handleInputChange('experience', 'jobTitle', e.target.value, index)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Software Engineer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Tech Corp"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => handleInputChange('experience', 'location', e.target.value, index)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="San Francisco, CA"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) => handleInputChange('experience', 'current', e.target.checked, index)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">Currently working here</label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            
            {!exp.current && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Job Description</label>
            <textarea
              value={exp.description}
              onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-vertical"
              placeholder="• Developed and maintained web applications using React and Node.js&#10;• Collaborated with cross-functional teams to deliver high-quality software solutions&#10;• Improved application performance by 30% through code optimization"
            />
          </div>
        </div>
      ))}
      
      <button
        onClick={() => addSection('experience')}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
      >
        <FaPlus />
        <span>Add More Experience</span>
      </button>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-8">
      <div className="text-center">
        <FaGraduationCap className="text-4xl text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education & Skills</h2>
        <p className="text-gray-600">Add your educational background and key skills</p>
      </div>

      {/* Education Section */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Education</h3>
        {resumeData.education.map((edu, index) => (
          <div key={index} className="bg-gray-50 rounded-2xl p-6 relative mb-4">
            {resumeData.education.length > 1 && (
              <button
                onClick={() => removeSection('education', index)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700"
              >
                <FaMinus />
              </button>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Degree *</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Bachelor of Science in Computer Science"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="University of California, Berkeley"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Graduation Date</label>
                <input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => handleInputChange('education', 'graduationDate', e.target.value, index)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => handleInputChange('education', 'gpa', e.target.value, index)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => addSection('education')}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-8"
        >
          <FaPlus />
          <span>Add More Education</span>
        </button>
      </div>

      {/* Final Preview Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Resume is Ready!</h3>
        <p className="text-gray-600 mb-6">Preview your resume and download it as HTML (easily convertible to PDF)</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={previewResume}
            className="flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            <FaEye />
            <span>Preview Resume</span>
          </button>
          
          <button 
            onClick={generatePDF}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FaDownload />
            <span>Generate PDF</span>
          </button>
          
          <button 
            onClick={downloadResume}
            className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <FaDownload />
            <span>Download HTML</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-6 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resume{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Builder
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create a professional resume that gets you hired
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
                    {stepNumber}
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                      Step {stepNumber}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stepNumber === 1 && "Template"}
                      {stepNumber === 2 && "Personal Info"}
                      {stepNumber === 3 && "Experience"}
                      {stepNumber === 4 && "Education"}
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
          <div className="p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
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

              {currentStep < totalSteps && (
                <button
                  onClick={nextStep}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <span>Next Step</span>
                  <FaArrowRight />
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