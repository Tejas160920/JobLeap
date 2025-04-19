import React, { useEffect, useState } from "react";
import AccessDenied from "./AccessDenied";

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
  });

  const [isAuthorized, setIsAuthorized] = useState(null); // null = loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (token && role === "hiring") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Send token to backend
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Job posted successfully!");
        setFormData({
          title: "",
          company: "",
          location: "",
          salary: "",
          type: "Full-time",
          description: "",
        });
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      alert("Error posting job.");
    }
  };

  // 👇 Show loading or redirect based on auth
  if (isAuthorized === null) return null;
  if (!isAuthorized) return <AccessDenied />;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>
        <textarea
          name="description"
          rows="4"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;
