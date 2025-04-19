// src/components/JobSection.jsx
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";

const JobSection = ({ filters }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      let query = "";

      if (filters.title) {
        query += `title=${encodeURIComponent(filters.title)}&`;
      }
      if (filters.location) {
        query += `location=${encodeURIComponent(filters.location)}`;
      }

      const res = await fetch(`http://localhost:5000/api/jobs?${query}`);
      const data = await res.json();
      setJobs(data);
      setSelectedJob(data[0] || null);
    };

    fetchJobs();
  }, [filters]);

  if (jobs.length === 0) {
    return <p className="text-center mt-10 text-gray-500">No jobs found.</p>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            isSelected={selectedJob && job._id === selectedJob._id}
            onSelect={() => setSelectedJob(job)}
          />
        ))}
      </div>
      <div className="md:col-span-2">
        <JobDetails job={selectedJob} />
      </div>
    </section>
  );
};

export default JobSection;
