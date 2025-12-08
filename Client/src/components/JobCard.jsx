import React from "react";
import { FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaBookmark, FaRegBookmark, FaBuilding, FaExternalLinkAlt } from "react-icons/fa";

const JobCard = ({ job, isSelected, onSelect }) => {
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleBookmark = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffHours < 24) return "New";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) === 1 ? '' : 's'} ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) === 1 ? '' : 's'} ago`;
  };

  const isNew = () => {
    const date = new Date(job.postedAt);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    return diffHours < 48;
  };

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer bg-white rounded-lg p-5 transition-all duration-200 border ${
        isSelected
          ? "border-[#0d6d6e] ring-1 ring-[#0d6d6e]"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Company header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain rounded" />
            ) : (
              <FaBuilding className="text-gray-400" />
            )}
          </div>
          <span className="text-sm font-medium text-gray-600">{job.company}</span>
        </div>
        <button
          onClick={handleBookmark}
          className="p-1.5 rounded hover:bg-gray-100 transition-colors"
        >
          {isBookmarked ? (
            <FaBookmark className="text-[#0d6d6e] text-sm" />
          ) : (
            <FaRegBookmark className="text-gray-400 text-sm" />
          )}
        </button>
      </div>

      {/* Job title */}
      <h3 className="text-base font-semibold text-gray-900 mb-2 leading-snug">
        {job.title}
      </h3>

      {/* Location and type */}
      <div className="flex items-center text-sm text-gray-500 mb-3">
        <FaMapMarkerAlt className="mr-1.5 text-xs" />
        <span>{job.location}</span>
        {job.jobType && (
          <>
            <span className="mx-2">·</span>
            <span>{job.jobType || "Full-time"}</span>
          </>
        )}
      </div>

      {/* Salary */}
      {job.salary && (
        <div className="text-sm font-medium text-gray-700 mb-4">
          <FaDollarSign className="inline mr-1 text-xs text-gray-400" />
          {job.salary}
        </div>
      )}

      {/* Footer with badge and apply button */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2">
          {isNew() && (
            <span className="px-2 py-0.5 bg-[#e6f3f3] text-[#0d6d6e] text-xs font-medium rounded">
              New
            </span>
          )}
          <span className="text-xs text-gray-400">
            {!isNew() && getTimeAgo(job.postedAt)}
          </span>
        </div>
        <button
          className="flex items-center space-x-1 bg-[#0d6d6e] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#095555] transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        >
          <span>Apply</span>
          <FaExternalLinkAlt className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
