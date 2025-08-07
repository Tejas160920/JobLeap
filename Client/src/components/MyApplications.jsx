import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaBriefcase, 
  FaMapMarkerAlt, 
  FaClock, 
  FaDollarSign,
  FaSpinner,
  FaCheck,
  FaTimes,
  FaEye,
  FaBuilding,
  FaArrowLeft
} from "react-icons/fa";

const MyApplications = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Simulate loading applications
    setTimeout(() => {
      // Mock application data - in real app this would come from API
      setApplications([
        {
          id: 1,
          jobTitle: "Frontend Developer",
          company: "TechCorp Inc.",
          location: "San Francisco, CA",
          appliedDate: "2024-01-15",
          status: "pending",
          salary: "$80,000 - $120,000"
        },
        {
          id: 2,
          jobTitle: "Backend Developer",
          company: "StartupXYZ",
          location: "Remote",
          appliedDate: "2024-01-10",
          status: "interviewed",
          salary: "$90,000 - $130,000"
        },
        {
          id: 3,
          jobTitle: "Full Stack Developer",
          company: "MegaCorp",
          location: "New York, NY",
          appliedDate: "2024-01-05",
          status: "rejected",
          salary: "$100,000 - $140,000"
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, [navigate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pending</span>;
      case 'interviewed':
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">Interviewed</span>;
      case 'accepted':
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Accepted</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">Rejected</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mb-6"
          >
            <FaArrowLeft />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Applications
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Track your job applications and their status
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-16">
            <FaBriefcase className="text-6xl text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No applications yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start applying for jobs to see them here. Your application history and status will be tracked.
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Find Jobs
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {application.jobTitle}
                        </h3>
                        <div className="flex items-center space-x-4 text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <FaBuilding className="text-sm" />
                            <span>{application.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt className="text-sm" />
                            <span>{application.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <FaClock />
                            <span>Applied {formatDate(application.appliedDate)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaDollarSign />
                            <span>{application.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className="md:ml-4">
                        {getStatusBadge(application.status)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 md:mt-0 md:ml-6">
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <FaEye />
                      <span>View Details</span>
                    </button>
                    {application.status === 'pending' && (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        <FaTimes />
                        <span>Withdraw</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;