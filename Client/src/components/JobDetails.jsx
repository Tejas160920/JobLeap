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
  FaTags
} from "react-icons/fa";
import { API_BASE_URL } from "../config/api";

const JobDetails = ({ job }) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
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

  const handleApply = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/signup");
      return;
    }

    setIsApplying(true);

    try {
      // Track the application in the database
      const isExternal = job._id?.startsWith('remoteok_');

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

      const res = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(applicationData)
      });

      const data = await res.json();

      // For external jobs (RemoteOK), save and open the job URL
      if (job.url) {
        window.open(job.url, '_blank', 'noopener,noreferrer');
        return;
      }

      // For local jobs, check profile completion
      const hasProfile = localStorage.getItem("profileCompleted") === "true";
      if (!hasProfile) {
        setShowProfilePrompt(true);
        return;
      }

      // For local jobs with applicationUrl
      if (job.applicationUrl) {
        window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
        return;
      }

      // For local jobs with applicationEmail
      if (job.applicationEmail) {
        window.location.href = `mailto:${job.applicationEmail}?subject=Application for ${job.title}`;
        return;
      }
    } catch (err) {
      console.error("Error tracking application:", err);
      // Still open the job URL even if tracking fails
      if (job.url) {
        window.open(job.url, '_blank', 'noopener,noreferrer');
      }
    } finally {
      setIsApplying(false);
    }
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
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-b border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <div className="flex items-center text-xl font-semibold text-gray-700 mb-2">
              <FaBuilding className="mr-2 text-blue-600" />
              {job.company}
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              <span>{job.location}</span>
              <span className="mx-3">•</span>
              <FaCalendarAlt className="mr-2" />
              <span>Posted {getTimeAgo(job.postedAt)}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleLike}
              className="p-3 rounded-full hover:bg-white transition-colors"
            >
              {isLiked ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-gray-400" />
              )}
            </button>
            <button
              onClick={handleBookmark}
              className="p-3 rounded-full hover:bg-white transition-colors"
            >
              {isBookmarked ? (
                <FaBookmark className="text-blue-600" />
              ) : (
                <FaRegBookmark className="text-gray-400" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-full hover:bg-white transition-colors"
            >
              <FaShare className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Job badges */}
        <div className="flex flex-wrap gap-3 mb-6">
          {job.salary && (
            <div className="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
              <FaDollarSign className="mr-2" />
              {job.salary}
            </div>
          )}
          <div className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-medium">
            <FaBriefcase className="mr-2" />
            {job.jobType || job.type || "Full-time"}
          </div>
          <div className="flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium">
            <FaClock className="mr-2" />
            Remote Friendly
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-4">
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 btn-hover-lift flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isApplying ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Applying...
              </>
            ) : (
              <>
                Apply Now
                <FaExternalLinkAlt className="ml-2" />
              </>
            )}
          </button>
          <button
            onClick={handleBookmark}
            className={`px-6 py-3 border-2 rounded-lg font-semibold transition-colors flex items-center ${
              isBookmarked
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
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
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About {job.company}</h3>
          <p className="text-gray-700 mb-4">
            {job.company} is a leading company committed to innovation and excellence.
            We offer a dynamic work environment where talented individuals can grow their careers
            and make meaningful contributions to our success.
          </p>
          <button
            onClick={() => navigate('/company-reviews', { state: { companyFilter: job.company } })}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            View Company Profile →
          </button>
        </div>
      </div>

      {/* Profile Completion Popup */}
      {showProfilePrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaBriefcase className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Complete Your Profile
              </h3>
              <p className="text-gray-600 mb-6">
                To get better job matches and apply for positions, please complete your profile first.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowProfilePrompt(false);
                    navigate('/complete-profile');
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Complete Profile
                </button>
                <button
                  onClick={() => setShowProfilePrompt(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
