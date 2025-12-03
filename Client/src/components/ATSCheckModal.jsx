import React, { useState, useRef } from 'react';
import {
  FaFileUpload,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaChartLine,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaSpinner,
  FaFilePdf,
  FaFileWord,
  FaArrowRight,
  FaExternalLinkAlt,
  FaSearch
} from 'react-icons/fa';
import { API_BASE_URL } from '../config/api';

const ATSCheckModal = ({ isOpen, onClose, job, onProceedToApply }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

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
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (file) => {
    setError(null);

    if (!file) return;

    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setFile(file);
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume first');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);
      formData.append('jobDescription', job.description || `${job.title} at ${job.company}`);
      formData.append('jobTitle', job.title);
      formData.append('company', job.company);

      const response = await fetch(`${API_BASE_URL}/ats/check`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || 'Failed to analyze resume');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err.message || 'Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreRing = (score) => {
    if (score >= 80) return 'ring-green-500';
    if (score >= 60) return 'ring-yellow-500';
    return 'ring-red-500';
  };

  const handleClose = () => {
    setFile(null);
    setAnalysis(null);
    setError(null);
    onClose();
  };

  const handleProceed = () => {
    handleClose();
    onProceedToApply();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FaSearch className="text-xl" />
                <h2 className="text-2xl font-bold">ATS Resume Checker</h2>
              </div>
              <p className="text-blue-100 text-sm">
                Check if your resume is optimized for: <span className="font-semibold">{job.title}</span> at {job.company}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!analysis ? (
            // Upload & Analysis View
            <>
              {/* File Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50'
                    : file
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.docx"
                  className="hidden"
                />

                {file ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      {file.name.endsWith('.pdf') ? (
                        <FaFilePdf className="text-3xl text-red-500" />
                      ) : (
                        <FaFileWord className="text-3xl text-blue-500" />
                      )}
                    </div>
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <p className="text-sm text-green-600 mt-2 flex items-center">
                      <FaCheckCircle className="mr-1" /> Ready to analyze
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <FaFileUpload className="text-3xl text-gray-400" />
                    </div>
                    <p className="font-semibold text-gray-800">
                      Drop your resume here or click to upload
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supports PDF and DOCX (max 5MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <FaExclamationTriangle className="text-red-500 mt-0.5" />
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleAnalyze}
                  disabled={!file || isAnalyzing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isAnalyzing ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FaChartLine />
                      Check ATS Compatibility
                    </>
                  )}
                </button>
                <button
                  onClick={handleProceed}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Skip & Apply
                </button>
              </div>
            </>
          ) : (
            // Results View
            <>
              {/* Main Score */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBg(analysis.score)} ring-4 ${getScoreRing(analysis.score)} mb-4`}>
                  <div className="text-center">
                    <span className={`text-4xl font-bold ${getScoreColor(analysis.score)}`}>
                      {analysis.score}
                    </span>
                    <span className={`text-lg ${getScoreColor(analysis.score)}`}>/100</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">ATS Compatibility Score</h3>
                <p className="text-gray-600">{analysis.summary}</p>
              </div>

              {/* Category Scores */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <FaBriefcase className="text-2xl text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{analysis.experienceMatch?.score || 0}</p>
                  <p className="text-sm text-gray-600">Experience</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <FaCode className="text-2xl text-purple-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{analysis.skillsMatch?.score || 0}</p>
                  <p className="text-sm text-gray-600">Skills</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <FaGraduationCap className="text-2xl text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{analysis.educationMatch?.score || 0}</p>
                  <p className="text-sm text-gray-600">Education</p>
                </div>
              </div>

              {/* Keywords */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Matched Keywords */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCheckCircle className="text-green-600" />
                    <h4 className="font-semibold text-gray-800">Matched Keywords</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.matchedKeywords?.slice(0, 8).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                    {analysis.matchedKeywords?.length > 8 && (
                      <span className="px-2 py-1 text-green-600 text-xs">
                        +{analysis.matchedKeywords.length - 8} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div className="bg-red-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FaExclamationTriangle className="text-red-600" />
                    <h4 className="font-semibold text-gray-800">Missing Keywords</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords?.slice(0, 8).map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                    {analysis.missingKeywords?.length > 8 && (
                      <span className="px-2 py-1 text-red-600 text-xs">
                        +{analysis.missingKeywords.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Strengths */}
              {analysis.strengths && analysis.strengths.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCheckCircle className="text-green-600" />
                    <h4 className="font-semibold text-gray-800">Strengths</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-green-500 mt-1">+</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Improvements */}
              {analysis.improvements && analysis.improvements.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaLightbulb className="text-yellow-500" />
                    <h4 className="font-semibold text-gray-800">Suggestions to Improve</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.improvements.map((improvement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-yellow-500 mt-1">!</span>
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Format Issues */}
              {analysis.formatIssues && analysis.formatIssues.length > 0 && (
                <div className="mb-6 bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FaExclamationTriangle className="text-orange-600" />
                    <h4 className="font-semibold text-gray-800">Format Issues</h4>
                  </div>
                  <ul className="space-y-2">
                    {analysis.formatIssues.map((issue, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="text-orange-500 mt-1">-</span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6 pt-4 border-t">
                <button
                  onClick={() => {
                    setAnalysis(null);
                    setFile(null);
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Upload Different Resume
                </button>
                <button
                  onClick={handleProceed}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Proceed to Apply
                  <FaExternalLinkAlt />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSCheckModal;
