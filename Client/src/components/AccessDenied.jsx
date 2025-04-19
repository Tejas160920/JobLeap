import React from "react";

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">403 - Access Denied</h1>
        <p className="text-gray-700">
          You are not authorized to view this page. Please log in as a hiring user to continue.
        </p>
      </div>
    </div>
  );
};

export default AccessDenied;
