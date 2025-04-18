import React, { useState, useEffect } from "react";
import axios from "axios";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    // Fetch jobs from backend
    axios
      .get("http://localhost:5000/api/jobs")
      .then((res) => {
        setJobs(res.data);
        setSelectedJob(res.data[0]); // Show first job by default
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT: Job Cards List */}
      <div className="md:col-span-1 space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            isSelected={selectedJob?._id === job._id}
            onSelect={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {/* RIGHT: Job Description */}
      <div className="md:col-span-2">
        {selectedJob && <JobDetails job={selectedJob} />}
      </div>
    </section>
  );
};

export default JobSection;
