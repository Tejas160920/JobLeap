import React, { useState, useRef } from "react";
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
  FaBriefcase,
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
  FaTimes,
  FaCheckCircle
} from "react-icons/fa";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const CoverLetterGenerator = () => {
  // Job details
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");

  // Resume upload
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Options
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("standard");

  // Output
  const [coverLetter, setCoverLetter] = useState("");
  const [, setParsedContact] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [showTips, setShowTips] = useState(true);

  // Handle file selection
  const handleFileSelect = (file) => {
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
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
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const removeFile = () => {
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Generate cover letter
  const generateCoverLetter = async () => {
    if (!resumeFile) {
      setError("Please upload your resume");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste the job description");
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
    setParsedContact(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);
      formData.append("jobTitle", jobTitle);
      formData.append("company", companyName);
      formData.append("tone", tone);
      formData.append("length", length);

      const response = await axios.post(`${API_URL}/ats/generate-cover-letter`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        setCoverLetter(response.data.coverLetter);
        setParsedContact(response.data.contactInfo || null);
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

  const downloadAsPDF = () => {
    // Create a printable HTML version
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Cover Letter - ${companyName}</title>
        <style>
          @page { margin: 1in; size: letter; }
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 12pt;
            line-height: 1.5;
            color: #000;
            max-width: 6.5in;
            margin: 0 auto;
            padding: 0;
          }
          .header {
            margin-bottom: 24pt;
          }
          .header .name {
            font-size: 14pt;
            font-weight: bold;
            margin-bottom: 4pt;
          }
          .header .contact {
            font-size: 10pt;
            color: #333;
          }
          .header .contact a {
            color: #333;
            text-decoration: none;
          }
          .date {
            margin-bottom: 24pt;
          }
          .recipient {
            margin-bottom: 24pt;
          }
          .body {
            text-align: justify;
          }
          .body p {
            margin-bottom: 12pt;
            text-indent: 0;
          }
          .signature {
            margin-top: 24pt;
          }
          @media print {
            body { margin: 0; padding: 0; }
          }
        </style>
      </head>
      <body>
        <pre style="white-space: pre-wrap; font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6;">${coverLetter}</pre>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  const regenerate = () => {
    generateCoverLetter();
  };

  const toneOptions = [
    { value: "professional", label: "Professional", description: "Formal & polished" },
    { value: "friendly", label: "Friendly", description: "Warm & personable" },
    { value: "confident", label: "Confident", description: "Bold & assertive" },
    { value: "enthusiastic", label: "Enthusiastic", description: "Passionate & energetic" }
  ];

  const lengthOptions = [
    { value: "short", label: "Short", description: "~150 words, ½ page" },
    { value: "standard", label: "Standard", description: "~250 words, 1 page" },
    { value: "detailed", label: "Detailed", description: "~400 words, full" }
  ];

  const tips = [
    "Upload your most recent, tailored resume",
    "Paste the complete job description for better keyword matching",
    "Choose a tone that matches the company culture",
    "Review and personalize the generated letter",
    "Use 'Standard' length for most applications"
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
            Upload your resume and job description to generate a personalized, ATS-optimized cover letter
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Resume Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaCloudUploadAlt className="text-[#0d6d6e]" />
                Upload Your Resume
              </h2>

              {!resumeFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragging
                      ? "border-[#0d6d6e] bg-[#e6f3f3]"
                      : "border-gray-300 hover:border-[#0d6d6e] hover:bg-gray-50"
                  }`}
                >
                  <FaCloudUploadAlt className={`text-4xl mx-auto mb-3 ${isDragging ? "text-[#0d6d6e]" : "text-gray-400"}`} />
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium text-[#0d6d6e]">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">PDF or DOCX (max 5MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    {resumeFile.type === "application/pdf" ? (
                      <FaFilePdf className="text-2xl text-red-500" />
                    ) : (
                      <FaFileWord className="text-2xl text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 truncate max-w-[200px]">{resumeFile.name}</p>
                      <p className="text-sm text-gray-500">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    <button
                      onClick={removeFile}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Job Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FaBriefcase className="text-[#0d6d6e]" />
                Job Details
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#0d6d6e] focus:border-[#0d6d6e] outline-none resize-none"
                    />
                    <button
                      onClick={async () => {
                        try {
                          const text = await navigator.clipboard.readText();
                          setJobDescription(text);
                        } catch {
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

            {/* Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Options
              </h2>

              <div className="space-y-5">
                {/* Length Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Length
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {lengthOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setLength(option.value)}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          length === option.value
                            ? "border-[#0d6d6e] bg-[#e6f3f3] text-[#0d6d6e]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{option.label}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tone Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {toneOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTone(option.value)}
                        className={`p-2.5 rounded-lg border text-center transition-all ${
                          tone === option.value
                            ? "border-[#0d6d6e] bg-[#e6f3f3] text-[#0d6d6e]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-medium text-sm">{option.label}</div>
                      </button>
                    ))}
                  </div>
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
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-5 mb-4 max-h-[500px] overflow-y-auto border border-gray-200">
                  <pre className="whitespace-pre-wrap font-serif text-gray-800 text-sm leading-relaxed">
                    {coverLetter}
                  </pre>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-[#0d6d6e] text-white py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors flex items-center justify-center gap-2"
                  >
                    {copied ? <FaCheck /> : <FaCopy />}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                  <button
                    onClick={downloadAsPDF}
                    className="flex-1 border border-[#0d6d6e] text-[#0d6d6e] py-2.5 rounded-lg font-medium hover:bg-[#e6f3f3] transition-colors flex items-center justify-center gap-2"
                  >
                    <FaFilePdf />
                    PDF
                  </button>
                  <button
                    onClick={downloadAsTxt}
                    className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaDownload />
                    TXT
                  </button>
                </div>

                {/* Word Count */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{coverLetter.split(/\s+/).filter(w => w).length} words</span>
                    <span>{coverLetter.length} characters</span>
                    <span>~{Math.ceil(coverLetter.split(/\s+/).filter(w => w).length / 250)} page(s)</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="text-center py-12">
                  <FaFileAlt className="text-5xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cover letter will appear here
                  </h3>
                  <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Upload your resume, fill in the job details, and click "Generate" to create your personalized cover letter
                  </p>
                </div>
              </div>
            )}

            {/* Tips Section */}
            {showTips && !coverLetter && (
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

            {/* Format Info */}
            <div className="bg-gray-100 rounded-xl p-5">
              <h3 className="font-medium text-gray-900 mb-3">Cover Letter Format</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>✓ Your contact info (from resume)</p>
                <p>✓ Today's date</p>
                <p>✓ Hiring Manager salutation</p>
                <p>✓ {length === "short" ? "2" : length === "standard" ? "3" : "4-5"} tailored paragraphs</p>
                <p>✓ Professional closing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverLetterGenerator;
