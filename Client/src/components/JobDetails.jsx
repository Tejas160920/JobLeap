// src/components/JobDetails.jsx
import React from "react";

const JobDetails = ({ job }) => {
  if (!job) return null;

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.title}</h2>
      <p className="text-gray-700 font-medium">{job.company}</p>
      <p className="text-gray-500 text-sm mb-4">{job.location}</p>

      <div className="flex gap-4 mb-4 text-sm">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded">
          {job.salary}
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
          {job.type}
        </span>
      </div>

      <p className="text-gray-700 leading-relaxed">{job.description}</p>
    </div>
  );
};

export default JobDetails;
