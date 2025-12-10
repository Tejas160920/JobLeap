import React, { useState, useEffect } from "react";
import {
  FaFileAlt,
  FaMagic,
  FaSpinner,
  FaCopy,
  FaDownload,
  FaCheck,
  FaLightbulb,
  FaPaste,
  FaRedo,
  FaBuilding,
  FaBriefcase
} from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const CoverLetterGenerator = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tone, setTone] = useState("professional");
  const [resumeText, setResumeText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [showTips, setShowTips] = useState(true);

  // Load saved resume data from localStorage if available
  useEffect(() => {
    const savedResume = localStorage.getItem("resumeData");
    if (savedResume) {
      try {
        const data = JSON.parse(savedResume);
        // Build a summary from saved resume data
        const summary = buildResumeSummary(data);
        if (summary) {
          setResumeText(summary);
        }
      } catch (e) {
        console.error("Error loading saved resume:", e);
      }
    }
  }, []);

  const buildResumeSummary = (data) => {
    let summary = "";

    if (data.personalInfo) {
      const p = data.personalInfo;
      summary += `Name: ${p.fullName || ""}\n`;
      if (p.summary) summary += `Summary: ${p.summary}\n`;
    }

    if (data.experience && data.experience.length > 0) {
      summary += "\nExperience:\n";
      data.experience.forEach(exp => {
        summary += `- ${exp.title} at ${exp.company} (${exp.startDate} - ${exp.current ? "Present" : exp.endDate})\n`;
        if (exp.description) summary += `  ${exp.description}\n`;
      });
    }

    if (data.skills) {
      const allSkills = [
        ...(data.skills.technical || []),
        ...(data.skills.soft || []),
        ...(data.skills.tools || [])
      ];
      if (allSkills.length > 0) {
        summary += `\nSkills: ${allSkills.join(", ")}\n`;
      }
    }

    if (data.education && data.education.length > 0) {
      summary += "\nEducation:\n";
      data.education.forEach(edu => {
        summary += `- ${edu.degree} from ${edu.institution}\n`;
      });
    }

    return summary.trim();
  };

  const generateCoverLetter = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description");
      return;
    }
    if (!jobTitle.trim()) {
      setError("Please enter the job title");
      return;
    }
    if (!companyName.trim()) {
      setError("Please enter the company name");
      return;
    }

    setError("");
    setIsGenerating(true);
    setCoverLetter("");

    try {
      const response = await axios.post(`${API_URL}/ats/generate-cover-letter`, {
        jobDescription,
        jobTitle,
        company: companyName,
        resumeText: resumeText || undefined,
        tone
      });

      if (response.data.success) {
        setCoverLetter(response.data.coverLetter);
        setShowTips(false);
      } else {
        setError(response.data.message || "Failed to generate cover letter");
      }
    } catch (err) {
      console.error("Error generating cover letter:", err);
      setError(err.response?.data?.message || "Failed to generate cover letter. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadAsTxt = () => {
    const blob = new Blob([coverLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${companyName.replace(/\s+/g, "-").toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const regenerate = () => {
    generateCoverLetter();
  };

  const toneOptions = [
    { value: "professional", label: "Professional", description: "Formal and business-appropriate" },
    { value: "friendly", label: "Friendly", description: "Warm and personable" },
    { value: "confident", label: "Confident", description: "Bold and assertive" },
    { value: "enthusiastic", label: "Enthusiastic", description: "Passionate and energetic" }
  ];

  const tips = [
    "Paste the complete job description for better keyword matching",
    "Add your resume summary for personalized content",
    "Choose a tone that matches the company culture",
    "Edit the generated letter to add personal touches",
    "Keep the final version to 3-4 paragraphs"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0d6d6e]/10 rounded-full mb-4">
            <FaFileAlt className="text-3xl text-[#0d6d6e]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Cover Letter Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate a personalized, ATS-optimized cover letter tailored to any job description using AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Job Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaBriefcase className="text-[#0d6d6e]" />
                Job Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g., Software Engineer"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaBuilding className="inline mr-1" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g., Google"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description *
                  </label>
                  <div className="relative">
                    <textarea
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste the full job description here..."
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none resize-none"
                    />
                    <button
                      onClick={async () => {
                        try {
                          const text = await navigator.clipboard.readText();
                          setJobDescription(text);
                        } catch (err) {
                          console.error("Failed to read clipboard");
                        }
                      }}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-[#0d6d6e] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Paste from clipboard"
                    >
                      <FaPaste />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Settings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Customization (Optional)
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {toneOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTone(option.value)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          tone === option.value
                            ? "border-[#0d6d6e] bg-[#e6f3f3] text-[#0d6d6e]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Background (for personalization)
                  </label>
                  <textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume summary or key experience here to personalize the cover letter..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none resize-none text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {resumeText ? "Your saved resume data has been loaded" : "This helps create a more personalized cover letter"}
                  </p>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={generateCoverLetter}
              disabled={isGenerating}
              className="w-full bg-[#0d6d6e] text-white py-4 rounded-xl font-semibold hover:bg-[#095555] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Generating Cover Letter...
                </>
              ) : (
                <>
                  <FaMagic />
                  Generate Cover Letter
                </>
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-6">
            {coverLetter ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FaCheck className="text-green-600" />
                    Your Cover Letter
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={regenerate}
                      disabled={isGenerating}
                      className="p-2 text-gray-500 hover:text-[#0d6d6e] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Regenerate"
                    >
                      <FaRedo />
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 text-gray-500 hover:text-[#0d6d6e] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy to clipboard"
                    >
                      {copied ? <FaCheck className="text-green-600" /> : <FaCopy />}
                    </button>
                    <button
                      onClick={downloadAsTxt}
                      className="p-2 text-gray-500 hover:text-[#0d6d6e] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Download as text file"
                    >
                      <FaDownload />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-[500px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 text-sm leading-relaxed">
                    {coverLetter}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-[#0d6d6e] text-white py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </button>
                  <button
                    onClick={downloadAsTxt}
                    className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center py-8">
                  <FaFileAlt className="text-5xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cover letter will appear here
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Fill in the job details and click "Generate" to create your personalized cover letter
                  </p>
                </div>
              </div>
            )}

            {/* Tips Section */}
            {showTips && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <FaLightbulb className="text-amber-500" />
                  Tips for a Great Cover Letter
                </h3>
                <ul className="space-y-2">
                  {tips.map((tip, index) => (
                    <li key={index} className="text-amber-700 text-sm flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Word Count & Stats */}
            {coverLetter && (
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Words: {coverLetter.split(/\s+/).length}</span>
                  <span>Characters: {coverLetter.length}</span>
                  <span>Paragraphs: {coverLetter.split(/\n\n+/).length}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
