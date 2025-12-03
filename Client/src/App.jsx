import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobSection from './components/JobSection';
import CompanyReviews from './components/CompanyReviews';
import Login from './components/Login';
import JobForm from './components/JobForm';
import Signup from './components/Signup';
import ProfileCompletion from './components/ProfileCompletion';
import MyApplications from './components/MyApplications';
import MyJobs from './components/MyJobs';
import EditJob from './components/EditJob';
import Settings from './components/Settings';
import CareerAdvice from './components/CareerAdvice';
import ResumeBuilder from './components/ResumeBuilder';
import SignupModal from './components/SignupModal';
import OAuthCallback from './components/OAuthCallback';
import RoleSelection from './components/RoleSelection';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import VerifyEmail from './components/VerifyEmail';
import NotFound from './components/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';

// Create a separate component for the main app logic to use useLocation
function AppContent() {
  const location = useLocation();
  const [filters, setFilters] = useState({ title: "", location: "" });
  const [showJobs, setShowJobs] = useState(true);  // Show jobs by default
  const [viewAllJobs, setViewAllJobs] = useState(true);  // View all jobs by default
  const [showSignupModal, setShowSignupModal] = useState(false);

  useEffect(() => {
    // Show signup modal for new users
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");
    const token = localStorage.getItem("token");
    
    if (!hasSeenWelcome && !token) {
      setTimeout(() => setShowSignupModal(true), 1000); // Show after 1 second
    }
  }, []);

  // Handle navigation from CompanyReviews
  useEffect(() => {
    if (location.state?.companyFilter) {
      setFilters({ title: location.state.companyFilter, location: "" });
      setShowJobs(true);
      setViewAllJobs(false);
    } else if (location.state?.industryFilter) {
      setFilters({ title: location.state.industryFilter, location: "" });
      setShowJobs(true);
      setViewAllJobs(false);
    }
  }, [location.state]);

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

  const handleCompanyClick = (companyName) => {
    // Set filters to show jobs for the specific company
    setFilters({ title: companyName, location: "" });
    setShowJobs(true);
    setViewAllJobs(false);
  };

  const handleIndustryClick = (industry) => {
    // Set filters to show jobs for the specific industry
    setFilters({ title: industry, location: "" });
    setShowJobs(true);
    setViewAllJobs(false);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
      />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero 
                  onSearch={handleSearch} 
                  onViewAllJobs={handleViewAllJobs} 
                  onCompanyClick={handleCompanyClick}
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
          <Route path="/post-job" element={<JobForm />} />
          <Route path="/my-jobs" element={<MyJobs />} />
          <Route path="/edit-job/:id" element={<EditJob />} />
          <Route path="/company-reviews" element={<CompanyReviews />} />
          <Route path="/career-advice" element={<CareerAdvice />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complete-profile" element={<ProfileCompletion />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
          <Route path="/select-role" element={<RoleSelection />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
