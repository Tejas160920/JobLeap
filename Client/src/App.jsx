import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobSection from './components/JobSection';
import CompanyReviews from './components/CompanyReviews';
import Salaries from './components/Salaries';
import Login from './components/Login';
import JobForm from './components/JobForm';
import Signup from './components/Signup';
import ProfileCompletion from './components/ProfileCompletion';
import MyApplications from './components/MyApplications';
import Settings from './components/Settings';

function App() {
  const [filters, setFilters] = useState({ title: "", location: "" });
  const [showJobs, setShowJobs] = useState(false);
  const [viewAllJobs, setViewAllJobs] = useState(false);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
    setShowJobs(true);
    setViewAllJobs(false);
  };

  const handleViewAllJobs = () => {
    setFilters({ title: "", location: "" });
    setShowJobs(true);
    setViewAllJobs(true);
  };

  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Navbar />
        <main className="pt-20 px-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero 
                    onSearch={handleSearch} 
                    onViewAllJobs={handleViewAllJobs} 
                    showCompactMode={showJobs || viewAllJobs}
                  />
                  {(showJobs || viewAllJobs) && (
                    <div id="jobs-section">
                      <JobSection 
                        filters={filters} 
                        showAll={viewAllJobs}
                        onBackToHome={() => setShowJobs(false)}
                      />
                    </div>
                  )}
                </>
              }
            />
            <Route path="/add-job" element={<JobForm />} />
            <Route path="/company-reviews" element={<CompanyReviews />} />
            <Route path="/salaries" element={<Salaries />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/complete-profile" element={<ProfileCompletion />} />
            <Route path="/my-applications" element={<MyApplications />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
