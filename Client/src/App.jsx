// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobSection from './components/JobSection';
import CompanyReviews from './components/CompanyReviews';
import Salaries from './components/Salaries';
import Login from './components/Login';
import JobForm from './components/JobForm';
import Signup from './components/Signup';

function App() {
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
                  <Hero />
                  <JobSection />
                </>
              }
            />
            <Route path="/add-job" element={<JobForm />} />
            <Route path="/company-reviews" element={<CompanyReviews />} />
            <Route path="/salaries" element={<Salaries />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
