// src/components/JobCard.jsx
import React from "react";

const JobCard = ({ job, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`cursor-pointer border rounded-lg p-4 shadow-sm ${
        isSelected ? "border-blue-500 bg-blue-50" : "bg-white"
      } hover:shadow-md transition`}
    >
      <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
      <p className="text-gray-600">{job.company}</p>
      <p className="text-gray-500 text-sm">{job.location}</p>

      <div className="mt-2 flex flex-wrap gap-2 text-sm">
        <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
          {job.salary}
        </span>
        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
          {job.type}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
