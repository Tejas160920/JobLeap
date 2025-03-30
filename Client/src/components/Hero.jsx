// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="w-full flex justify-center mt-8">
      <div className="bg-gray-50 shadow-sm rounded-lg p-8 w-full max-w-5xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find your next job
        </h1>

        <p className="text-gray-600 text-lg mb-8">
          Search for jobs, companies, and locations.
        </p>

        <form className="flex flex-col md:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Job title or keyword"
            className="w-full md:w-1/3 px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full md:w-1/3 px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded w-full md:w-auto"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
