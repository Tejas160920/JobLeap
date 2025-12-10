import React, { useState, useRef } from "react";
import {
  FaUpload,
  FaFileAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
  FaSpinner,
  FaLightbulb,
  FaChartBar,
  FaTimes,
  FaClipboardList,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaRedo,
  FaInfoCircle,
  FaGlobe
} from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL + "/api" || "http://localhost:5000/api";

const ATSOptimizer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [visaStatus, setVisaStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const fileInputRef = useRef(null);

  const visaOptions = [
    { value: "", label: "Select your visa status" },
    { value: "citizen", label: "US Citizen" },
    { value: "green_card", label: "Green Card Holder" },
    { value: "h1b", label: "H1B Visa" },
    { value: "h4_ead", label: "H4 EAD" },
    { value: "l1", label: "L1 Visa" },
    { value: "f1_opt", label: "F1 OPT" },
    { value: "f1_cpt", label: "F1 CPT" },
    { value: "need_sponsorship", label: "Need Sponsorship" },
    { value: "other", label: "Other" }
  ];

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF or DOCX file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
      setError("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a PDF or DOCX file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setResumeFile(file);
      setError("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const analyzeResume = async () => {
    if (!resumeFile) {
      setError("Please upload your resume");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);
      formData.append("jobTitle", jobTitle || "Not specified");
      formData.append("company", company || "Not specified");
      formData.append("visaStatus", visaStatus || "not_specified");

      const response = await axios.post(`${API_URL}/ats/optimize`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        setAnalysis(response.data.analysis);
      } else {
        setError(response.data.message || "Analysis failed");
      }
    } catch (err) {
      console.error("Analysis error:", err);
      setError(err.response?.data?.message || "Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setAnalysis(null);
    setResumeFile(null);
    setJobDescription("");
    setJobTitle("");
    setCompany("");
    setVisaStatus("");
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getScoreRingColor = (score) => {
    if (score >= 80) return "#22c55e";
    if (score >= 60) return "#eab308";
    return "#ef4444";
  };

  const ScoreRing = ({ score, size = 120, label }) => {
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (score / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg className="transform -rotate-90" width={size} height={size}>
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
              fill="none"
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={getScoreRingColor(score)}
              strokeWidth={strokeWidth}
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
          </div>
        </div>
        {label && <span className="text-sm text-gray-600 mt-2">{label}</span>}
      </div>
    );
  };

  return (
    <main className="pt-16 bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-[#0d6d6e] to-[#095555]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              ATS Resume <span className="text-[#7dd3d5]">Optimizer</span>
            </h1>
            <p className="text-xl text-gray-200 mb-4 max-w-3xl mx-auto">
              Get AI-powered feedback to optimize your resume for Applicant Tracking Systems
              and increase your chances of landing interviews
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-[#7dd3d5]" />
                <span>AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-[#7dd3d5]" />
                <span>Keyword Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-[#7dd3d5]" />
                <span>Actionable Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {!analysis ? (
          /* Input Section */
          <div className="grid md:grid-cols-2 gap-8">
            {/* Resume Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaFileAlt className="text-[#0d6d6e]" />
                Upload Your Resume
              </h2>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  resumeFile
                    ? "border-green-400 bg-green-50"
                    : "border-gray-300 hover:border-[#0d6d6e] hover:bg-gray-50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {resumeFile ? (
                  <div className="flex flex-col items-center">
                    <FaCheckCircle className="text-4xl text-green-500 mb-3" />
                    <p className="font-medium text-gray-900">{resumeFile.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(resumeFile.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setResumeFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                      className="mt-3 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <FaUpload className="text-4xl text-gray-400 mb-3" />
                    <p className="font-medium text-gray-700">
                      Drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supports PDF and DOCX (max 5MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Job Description */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaClipboardList className="text-[#0d6d6e]" />
                Job Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="e.g., Software Engineer"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g., Google"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaGlobe className="inline mr-1 text-[#0d6d6e]" />
                    Your Visa Status (Optional)
                  </label>
                  <select
                    value={visaStatus}
                    onChange={(e) => setVisaStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-sm"
                  >
                    {visaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    We'll check if this job/company is visa-friendly
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description *
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description here..."
                    rows={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none text-sm resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {jobDescription.length} characters
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Analysis Results</h2>
                <button
                  onClick={resetAnalysis}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0d6d6e] transition-colors"
                >
                  <FaRedo />
                  <span>Analyze Another</span>
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {/* Overall Score */}
                <div className="md:col-span-1 flex justify-center">
                  <ScoreRing score={analysis.score} size={140} label="Overall Match" />
                </div>

                {/* Section Scores */}
                <div className="md:col-span-3 grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${getScoreBgColor(analysis.skillsMatch?.score || 0)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <FaTools className="text-gray-600" />
                      <span className="font-medium text-gray-900">Skills</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.skillsMatch?.score || 0)}`}>
                      {analysis.skillsMatch?.score || 0}%
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{analysis.skillsMatch?.feedback}</p>
                  </div>

                  <div className={`p-4 rounded-lg ${getScoreBgColor(analysis.experienceMatch?.score || 0)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <FaBriefcase className="text-gray-600" />
                      <span className="font-medium text-gray-900">Experience</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.experienceMatch?.score || 0)}`}>
                      {analysis.experienceMatch?.score || 0}%
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{analysis.experienceMatch?.feedback}</p>
                  </div>

                  <div className={`p-4 rounded-lg ${getScoreBgColor(analysis.educationMatch?.score || 0)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <FaGraduationCap className="text-gray-600" />
                      <span className="font-medium text-gray-900">Education</span>
                    </div>
                    <div className={`text-2xl font-bold ${getScoreColor(analysis.educationMatch?.score || 0)}`}>
                      {analysis.educationMatch?.score || 0}%
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{analysis.educationMatch?.feedback}</p>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{analysis.summary}</p>
              </div>
            </div>

            {/* Visa Status Section */}
            {analysis.visaVerdict && (
              <div className={`rounded-xl shadow-sm border p-6 ${
                analysis.visaVerdict.status === 'eligible' ? 'bg-green-50 border-green-200' :
                analysis.visaVerdict.status === 'sponsor_available' ? 'bg-green-50 border-green-200' :
                analysis.visaVerdict.status === 'no_sponsorship' ? 'bg-red-50 border-red-200' :
                analysis.visaVerdict.status === 'likely_sponsors' ? 'bg-blue-50 border-blue-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <FaGlobe className={`${
                    analysis.visaVerdict.status === 'eligible' ? 'text-green-500' :
                    analysis.visaVerdict.status === 'sponsor_available' ? 'text-green-500' :
                    analysis.visaVerdict.status === 'no_sponsorship' ? 'text-red-500' :
                    analysis.visaVerdict.status === 'likely_sponsors' ? 'text-blue-500' :
                    'text-gray-500'
                  }`} />
                  Visa Sponsorship
                </h3>
                <div className="flex items-start gap-3">
                  {analysis.visaVerdict.status === 'eligible' && (
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  )}
                  {analysis.visaVerdict.status === 'sponsor_available' && (
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                  )}
                  {analysis.visaVerdict.status === 'no_sponsorship' && (
                    <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                  )}
                  {analysis.visaVerdict.status === 'likely_sponsors' && (
                    <FaInfoCircle className="text-blue-500 mt-1 flex-shrink-0" />
                  )}
                  {analysis.visaVerdict.status === 'unknown' && (
                    <FaInfoCircle className="text-gray-500 mt-1 flex-shrink-0" />
                  )}
                  <p className={`${
                    analysis.visaVerdict.status === 'eligible' ? 'text-green-700' :
                    analysis.visaVerdict.status === 'sponsor_available' ? 'text-green-700' :
                    analysis.visaVerdict.status === 'no_sponsorship' ? 'text-red-700' :
                    analysis.visaVerdict.status === 'likely_sponsors' ? 'text-blue-700' :
                    'text-gray-700'
                  }`}>
                    {analysis.visaVerdict.message}
                  </p>
                </div>
              </div>
            )}

            {/* Keywords Section */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Matched Keywords */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Matched Keywords ({analysis.matchedKeywords?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedKeywords?.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                  {(!analysis.matchedKeywords || analysis.matchedKeywords.length === 0) && (
                    <p className="text-gray-500 text-sm">No matched keywords found</p>
                  )}
                </div>
              </div>

              {/* Missing Keywords */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaExclamationTriangle className="text-yellow-500" />
                  Missing Keywords ({analysis.missingKeywords?.length || 0})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords?.map((keyword, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                  {(!analysis.missingKeywords || analysis.missingKeywords.length === 0) && (
                    <p className="text-gray-500 text-sm">No missing keywords - great job!</p>
                  )}
                </div>
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {analysis.strengths?.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Improvements */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaLightbulb className="text-yellow-500" />
                  Suggested Improvements
                </h3>
                <ul className="space-y-3">
                  {analysis.improvements?.map((improvement, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaLightbulb className="text-yellow-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Format Issues */}
            {analysis.formatIssues && analysis.formatIssues.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <FaTimesCircle className="text-red-500" />
                  ATS Format Issues
                </h3>
                <ul className="space-y-3">
                  {analysis.formatIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <FaTimesCircle className="text-red-500 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* Analyze Button */}
        {!analysis && (
          <div className="mt-8 text-center">
            <button
              onClick={analyzeResume}
              disabled={loading || !resumeFile || !jobDescription.trim()}
              className="px-8 py-4 bg-[#0d6d6e] text-white rounded-lg font-medium text-lg hover:bg-[#095555] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span>Analyzing Resume...</span>
                </>
              ) : (
                <>
                  <FaChartBar />
                  <span>Analyze My Resume</span>
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 mt-3">
              Free AI-powered analysis using advanced language models
            </p>
          </div>
        )}
      </div>

      {/* How It Works Section */}
      {!analysis && (
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e6f3f3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#0d6d6e]">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Upload Resume</h3>
                <p className="text-sm text-gray-600">
                  Upload your resume in PDF or DOCX format
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e6f3f3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#0d6d6e]">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Paste Job Description</h3>
                <p className="text-sm text-gray-600">
                  Copy and paste the job posting you're applying for
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#e6f3f3] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-[#0d6d6e]">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Get AI Insights</h3>
                <p className="text-sm text-gray-600">
                  Receive detailed feedback and optimization tips
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tips Section */}
      {!analysis && (
        <section className="py-8 bg-gray-100 border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-start gap-3">
              <FaInfoCircle className="text-[#0d6d6e] mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Pro Tips for Better Results</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Paste the complete job description including requirements and qualifications</li>
                  <li>• Use a clean, simple resume format without tables, images, or fancy formatting</li>
                  <li>• Include relevant keywords naturally throughout your resume</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ATSOptimizer;
