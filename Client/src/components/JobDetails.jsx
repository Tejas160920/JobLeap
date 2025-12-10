import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaClock,
  FaDollarSign,
  FaBriefcase,
  FaBookmark,
  FaRegBookmark,
  FaShare,
  FaExternalLinkAlt,
  FaBuilding,
  FaCalendarAlt,
  FaHeart,
  FaRegHeart,
  FaTags,
  FaSearch,
  FaCheckCircle
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";
import ATSCheckModal from "./ATSCheckModal";

const JobDetails = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [showATSModal, setShowATSModal] = useState(false);
  const [showApplicationConfirm, setShowApplicationConfirm] = useState(false);
  const [pendingApplicationData, setPendingApplicationData] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Check if job is bookmarked on load
  useEffect(() => {
    const checkBookmark = async () => {
      const token = localStorage.getItem("token");
      if (!token || !job) return;

      try {
        const jobId = job._id?.startsWith('remoteok_') ? null : job._id;
        const externalJobId = job._id?.startsWith('remoteok_') ? job._id : null;

        const query = jobId ? `jobId=${jobId}` : `externalJobId=${externalJobId}`;
        const res = await fetch(`${API_BASE_URL}/bookmarks/check?${query}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setIsBookmarked(data.isBookmarked);
        }
      } catch (err) {
        console.error("Error checking bookmark:", err);
      }
    };

    checkBookmark();
  }, [job]);

  if (!job) {
    return (
      <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <FaBriefcase className="mx-auto text-4xl mb-4" />
          <p className="text-lg font-medium">Select a job to view details</p>
          <p className="text-sm">Click on any job card to see full information</p>
        </div>
      </div>
    );
  }

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) return "Just now";
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`;
  };

  // Clean and sanitize HTML description
  const cleanDescription = (html) => {
    if (!html) return null;

    // Remove the "Please mention the word" spam text
    let cleaned = html.replace(/Please mention the word \*\*\w+\*\* and tag.*?human\./gi, '');
    cleaned = cleaned.replace(/<br\s*\/?>\s*<br\s*\/?>\s*Please mention.*$/gi, '');

    // Fix common encoding issues
    cleaned = cleaned.replace(/â/g, "'");
    cleaned = cleaned.replace(/â/g, '"');
    cleaned = cleaned.replace(/â/g, '"');
    cleaned = cleaned.replace(/â/g, "–");
    cleaned = cleaned.replace(/â¢/g, "•");
    cleaned = cleaned.replace(/&nbsp;/g, ' ');
    cleaned = cleaned.replace(/&#x27;/g, "'");
    cleaned = cleaned.replace(/&amp;/g, '&');

    return cleaned;
  };

  // Function to handle direct apply (called after ATS check or when skipping)
  const proceedToApply = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    setIsApplying(true);

    try {
      // Prepare application data for later saving
      // Check if job is external (has a prefix like remoteok_, joinrise_, etc. or has a url but no valid MongoDB ObjectId)
      const isValidObjectId = /^[a-f\d]{24}$/i.test(job._id);
      const isExternal = !isValidObjectId || job._id?.includes('_');

      const applicationData = isExternal ? {
        externalJobId: job._id,
        externalJobData: {
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          jobType: job.jobType,
          url: job.url,
          logo: job.logo,
          postedAt: job.postedAt,
          source: job.source || 'RemoteOK'
        }
      } : {
        jobId: job._id
      };

      // For external jobs (RemoteOK), open the URL first then ask for confirmation
      if (job.url) {
        window.open(job.url, '_blank', 'noopener,noreferrer');
        // Store application data and show confirmation popup
        setPendingApplicationData(applicationData);
        setShowApplicationConfirm(true);
        return;
      }

      // For local jobs, check profile completion
      const hasProfile = localStorage.getItem("profileCompleted") === "true";
      if (!hasProfile) {
        setShowProfilePrompt(true);
        return;
      }

      // For local jobs with applicationUrl - open first then confirm
      if (job.applicationUrl) {
        window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
        setPendingApplicationData(applicationData);
        setShowApplicationConfirm(true);
        return;
      }

      // For local jobs with applicationEmail - open first then confirm
      if (job.applicationEmail) {
        window.location.href = `mailto:${job.applicationEmail}?subject=Application for ${job.title}`;
        setPendingApplicationData(applicationData);
        setShowApplicationConfirm(true);
        return;
      }
    } catch (err) {
      console.error("Error during application process:", err);
      // Still open the job URL even if there's an error
      if (job.url) {
        window.open(job.url, '_blank', 'noopener,noreferrer');
      }
    } finally {
      setIsApplying(false);
    }
  };

  // Function to confirm and save the application
  const confirmApplication = async (didApply) => {
    setShowApplicationConfirm(false);

    if (!didApply || !pendingApplicationData) {
      setPendingApplicationData(null);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      console.log("Saving application:", pendingApplicationData);

      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(pendingApplicationData)
      });

      const data = await res.json();
      console.log("Application save response:", data);

      if (data.success) {
        // Show success message
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 3000);
      } else {
        // Show error to user with full details
        const errorMsg = data.error ? `${data.message}: ${data.error}` : data.message;
        const details = data.details ? `\nDetails: ${data.details.join(', ')}` : '';
        alert(errorMsg + details || "Failed to save application. Please try again.");
        console.error("Failed to save application:", data);
      }
    } catch (err) {
      console.error("Error saving application:", err);
      alert("Error saving application. Please try again.");
    } finally {
      setPendingApplicationData(null);
    }
  };

  // Show ATS modal when user clicks Apply
  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    // Show ATS check modal
    setShowATSModal(true);
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    try {
      if (isBookmarked) {
        // Remove bookmark
        const jobId = job._id?.startsWith('remoteok_') ? null : job._id;
        const externalJobId = job._id?.startsWith('remoteok_') ? job._id : null;

        const endpoint = jobId
          ? `${API_BASE_URL}/bookmarks/${jobId}`
          : `${API_BASE_URL}/bookmarks/external/${externalJobId}`;

        await fetch(endpoint, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Add bookmark
        const isExternal = job._id?.startsWith('remoteok_');

        await fetch(`${API_BASE_URL}/bookmarks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(isExternal ? {
            externalJobId: job._id,
            externalJobData: {
              title: job.title,
              company: job.company,
              location: job.location,
              salary: job.salary,
              jobType: job.jobType,
              description: job.description,
              url: job.url,
              logo: job.logo,
              postedAt: job.postedAt,
              source: job.source
            }
          } : {
            jobId: job._id
          })
        });
      }

      setIsBookmarked(!isBookmarked);
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  const handleLike = () => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      navigate("/signup");
      return;
    }
    
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this ${job.title} position at ${job.company}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Job link copied to clipboard!");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex items-center text-lg text-gray-700 mb-2">
              <FaBuilding className="mr-2 text-gray-500" />
              {job.company}
            </div>
            <div className="flex items-center text-gray-500 text-sm">
              <FaMapMarkerAlt className="mr-2" />
              <span>{job.location}</span>
              <span className="mx-3">•</span>
              <FaCalendarAlt className="mr-2" />
              <span>Posted {getTimeAgo(job.postedAt)}</span>
            </div>
          </div>

          <div className="flex space-x-1">
            <button
              onClick={handleLike}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
            </button>
            <button
              onClick={handleBookmark}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isBookmarked ? (
                <FaBookmark className="text-[#0d6d6e]" />
              ) : (
                <FaRegBookmark className="text-gray-400" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaShare className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Job badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {job.salary && (
            <div className="flex items-center bg-[#e6f3f3] text-[#0d6d6e] px-3 py-1.5 rounded text-sm font-medium">
              <FaDollarSign className="mr-1" />
              {job.salary}
            </div>
          )}
          <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm font-medium">
            <FaBriefcase className="mr-1" />
            {job.jobType || job.type || "Full-time"}
          </div>
          <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-sm font-medium">
            <FaClock className="mr-1" />
            Remote Friendly
          </div>
          {job.sponsorsVisa && (
            <div className="flex items-center bg-green-100 text-green-700 px-3 py-1.5 rounded text-sm font-medium">
              <FaCheckCircle className="mr-1" />
              Sponsors H1B Visa
            </div>
          )}
        </div>

        {/* Visa Sponsorship Info Box */}
        {job.sponsorsVisa && job.sponsorData && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FaCheckCircle className="text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">H1B Visa Sponsorship Available</h4>
                <p className="text-green-700 text-sm mb-2">
                  {job.sponsorData.name} has a history of sponsoring H1B visas for international candidates.
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-green-600">
                  <span><strong>{job.sponsorData.totalLCAs?.toLocaleString()}</strong> LCAs filed</span>
                  <span><strong>{job.sponsorData.approvalRate}%</strong> approval rate</span>
                  {job.sponsorData.avgSalary && (
                    <span><strong>${job.sponsorData.avgSalary?.toLocaleString()}</strong> avg salary</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="flex-1 bg-[#0d6d6e] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#095555] transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isApplying ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Applying...
              </>
            ) : (
              <>
                Apply Now
                <FaExternalLinkAlt className="ml-2 text-sm" />
              </>
            )}
          </button>
          <button
            onClick={handleBookmark}
            className={`px-5 py-3 border rounded-lg font-medium transition-colors flex items-center ${
              isBookmarked
                ? 'border-[#0d6d6e] bg-[#e6f3f3] text-[#0d6d6e]'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isBookmarked ? <FaBookmark className="mr-2" /> : <FaRegBookmark className="mr-2" />}
            {isBookmarked ? 'Saved' : 'Save for Later'}
          </button>
        </div>
      </div>

      {/* Job Description */}
      <div className="p-6">
        {/* Tags/Skills */}
        {job.tags && job.tags.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <FaTags className="text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Skills & Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Description</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed
            prose-headings:text-gray-900 prose-headings:font-semibold
            prose-p:mb-4 prose-p:text-gray-700
            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2
            prose-li:text-gray-700
            prose-strong:text-gray-900
            prose-a:text-blue-600 prose-a:hover:underline">
            {job.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: cleanDescription(job.description) }}
                className="job-description"
              />
            ) : (
              <div className="space-y-4">
                <p>We are looking for a talented {job.title} to join our growing team at {job.company}.</p>
                <p>This is an excellent opportunity to work with cutting-edge technologies and contribute to innovative projects that make a real impact.</p>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">What you'll do:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Collaborate with cross-functional teams to deliver high-quality solutions</li>
                  <li>Contribute to the development and maintenance of our products</li>
                  <li>Participate in code reviews and maintain coding standards</li>
                  <li>Stay up-to-date with industry trends and best practices</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">What we're looking for:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Strong technical skills and problem-solving abilities</li>
                  <li>Excellent communication and teamwork skills</li>
                  <li>Passion for learning and professional growth</li>
                  <li>Experience with relevant technologies and frameworks</li>
                </ul>

                <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Benefits:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Competitive salary and comprehensive benefits</li>
                  <li>Flexible working arrangements</li>
                  <li>Professional development opportunities</li>
                  <li>Great company culture and team environment</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Company info */}
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <h3 className="text-base font-semibold text-gray-900 mb-2">About {job.company}</h3>
          <p className="text-gray-600 text-sm mb-3">
            {job.company} is a leading company committed to innovation and excellence.
            We offer a dynamic work environment where talented individuals can grow their careers.
          </p>
          <button
            onClick={() => navigate('/company-reviews', { state: { companyFilter: job.company } })}
            className="text-[#0d6d6e] hover:text-[#095555] text-sm font-medium transition-colors"
          >
            View Company Profile →
          </button>
        </div>
      </div>

      {/* Profile Completion Popup */}
      {showProfilePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e6f3f3] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaBriefcase className="text-[#0d6d6e] text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Complete Your Profile
              </h3>
              <p className="text-gray-600 mb-5 text-sm">
                To get better job matches and apply for positions, please complete your profile first.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowProfilePrompt(false);
                    navigate('/complete-profile');
                  }}
                  className="flex-1 bg-[#0d6d6e] text-white py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
                >
                  Complete Profile
                </button>
                <button
                  onClick={() => setShowProfilePrompt(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Confirmation Popup */}
      {showApplicationConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#e6f3f3] rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-[#0d6d6e] text-lg" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Did you apply?
              </h3>
              <p className="text-gray-600 mb-5 text-sm">
                Did you complete your application for <span className="font-semibold">{job.title}</span> at <span className="font-semibold">{job.company}</span>?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => confirmApplication(true)}
                  className="flex-1 bg-[#0d6d6e] text-white py-2.5 rounded-lg font-medium hover:bg-[#095555] transition-colors"
                >
                  Yes, I applied
                </button>
                <button
                  onClick={() => confirmApplication(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  No, not yet
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                This helps us track your applications accurately.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ATS Check Modal */}
      <ATSCheckModal
        isOpen={showATSModal}
        onClose={() => setShowATSModal(false)}
        job={job}
        onProceedToApply={proceedToApply}
      />

      {/* Success Message Toast */}
      {showSuccessMessage && (
        <div className="fixed bottom-6 right-6 bg-[#0d6d6e] text-white px-5 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 fade-in">
          <FaCheckCircle className="text-lg" />
          <div>
            <p className="font-medium text-sm">Application Tracked!</p>
            <p className="text-xs text-white/80">View it in My Applications</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
