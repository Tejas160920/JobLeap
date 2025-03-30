import React from "react";

const salaries = [
  { title: "Software Engineer", average: "$123,202", link: "#" },
  { title: "Registered Nurse", average: "$93,630", link: "#" },
  { title: "Accountant", average: "$65,977", link: "#" },
  { title: "Business Analyst", average: "$85,490", link: "#" },
  { title: "Nursing Assistant", average: "$45,817", link: "#" },
  { title: "Sales Executive", average: "$81,014", link: "#" },
  { title: "HR Specialist", average: "$60,219", link: "#" },
  { title: "Customer Service Rep", average: "$70,333", link: "#" },
  { title: "Store Manager", average: "$37,432", link: "#" },
];

const Salaries = () => {
  return (
    <main className="bg-white min-h-screen">
      {/* Header Section with Gradient */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4 text-center rounded-b-3xl shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover your earning potential
        </h1>
        <p className="text-lg text-gray-200">
          Explore high-paying careers by industry and location
        </p>

        {/* Search Bar */}
<div className="mt-10 bg-white rounded-lg p-4 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 shadow-md">
  <input
    type="text"
    placeholder="Job title (e.g., Software Engineer)"
    className="flex-1 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="text"
    placeholder="Location (e.g., San Francisco)"
    className="flex-1 px-4 py-3 rounded-md border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition">
    Search
  </button>
</div>

      </section>

      {/* Top Salaries Section */}
      <section className="mt-16 px-6 md:px-20">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Browse top paying jobs by industry
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salaries.map((job, idx) => (
            <div
              key={idx}
              className="border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {job.title}
              </h3>
              <p className="text-blue-600 font-medium mb-2">
                Average Salary {job.average} per year
              </p>
              <a
                href={job.link}
                className="text-sm text-blue-500 hover:underline"
              >
                View Job Openings →
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Salaries;
