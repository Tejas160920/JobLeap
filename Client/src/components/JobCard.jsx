import React from "react";
import { FaMapMarkerAlt, FaClock, FaDollarSign, FaBriefcase, FaBookmark, FaRegBookmark } from "react-icons/fa";

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

  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer rounded-lg p-5 transition-all duration-200 border ${
        isSelected
          ? "border-[#0d6d6e] bg-[#f0f9f9] shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-1 ${isSelected ? 'text-[#0d6d6e]' : 'text-gray-900'}`}>
            {job.title}
          </h3>
          <p className="text-base text-gray-700">{job.company}</p>
        </div>
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
      </div>

      <div className="flex items-center text-gray-500 mb-3 text-sm">
        <FaMapMarkerAlt className="mr-2 text-xs" />
        <span>{job.location}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {job.salary && (
          <div className="flex items-center bg-[#e6f3f3] text-[#0d6d6e] px-3 py-1 rounded text-sm font-medium">
            <FaDollarSign className="mr-1 text-xs" />
            {job.salary}
          </div>
        )}
        <div className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm font-medium">
          <FaBriefcase className="mr-1 text-xs" />
          {job.jobType || job.type || "Full-time"}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center text-gray-500 text-sm">
          <FaClock className="mr-1 text-xs" />
          {getTimeAgo(job.postedAt)}
        </div>
        <div className={`text-sm font-medium ${isSelected ? "text-[#0d6d6e]" : "text-gray-500"}`}>
          View Details →
        </div>
      </div>
    </div>
  );
};

export default JobCard;
