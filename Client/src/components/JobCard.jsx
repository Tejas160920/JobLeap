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
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div
      onClick={onSelect}
      className={`group cursor-pointer rounded-xl p-6 transition-all duration-300 card-hover border ${
        isSelected 
          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg" 
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg"
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {job.title}
          </h3>
          <p className="text-lg font-semibold text-gray-700 mb-1">{job.company}</p>
        </div>
        <button
          onClick={handleBookmark}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          {isBookmarked ? (
            <FaBookmark className="text-blue-600" />
          ) : (
            <FaRegBookmark className="text-gray-400 group-hover:text-gray-600" />
          )}
        </button>
      </div>

      <div className="flex items-center text-gray-600 mb-3">
        <FaMapMarkerAlt className="mr-2 text-sm" />
        <span className="text-sm">{job.location}</span>
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        {job.salary && (
          <div className="flex items-center bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium">
            <FaDollarSign className="mr-1 text-xs" />
            {job.salary}
          </div>
        )}
        <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
          <FaBriefcase className="mr-1 text-xs" />
          {job.jobType || job.type || "Full-time"}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center text-gray-500 text-sm">
          <FaClock className="mr-1" />
          {getTimeAgo(job.postedAt)}
        </div>
        <div className={`text-sm font-medium ${isSelected ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"} transition-colors`}>
          View Details →
        </div>
      </div>

      {/* Subtle gradient overlay when selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-xl pointer-events-none"></div>
      )}
    </div>
  );
};

export default JobCard;
