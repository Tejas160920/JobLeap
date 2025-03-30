// src/components/JobSection.jsx
import React, { useState } from "react";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";

// 🧪 Mock data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    location: "Bangalore, India",
    salary: "$120,000 / year",
    type: "Full-time",
    description:
      "We're looking for a skilled frontend developer with React and Tailwind experience.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Amazon",
    location: "Hyderabad, India",
    salary: "$135,000 / year",
    type: "Full-time",
    description:
      "Join our team to build scalable APIs using Node.js and MongoDB.",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "Microsoft",
    location: "Remote",
    salary: "$110,000 / year",
    type: "Contract",
    description:
      "Manage cloud infrastructure and CI/CD pipelines across environments.",
  },
];

const JobSection = () => {
  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* LEFT: Job Cards List */}
      <div className="md:col-span-1 space-y-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            isSelected={job.id === selectedJob.id}
            onSelect={() => setSelectedJob(job)}
          />
        ))}
      </div>

      {/* RIGHT: Job Description */}
      <div className="md:col-span-2">
        <JobDetails job={selectedJob} />
      </div>
    </section>
  );
};

export default JobSection;
