import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import JobSection from './components/JobSection';
import CompanyReviews from './components/CompanyReviews';
import Salaries from './components/Salaries';
import Login from './components/Login';



function App() {
  const [activeTab, setActiveTab] = useState("jobs");

  return (
    <div className="bg-white min-h-screen">
      {/* Pass state to Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="pt-20 px-4">
        {activeTab === "jobs" && (
          <>
            <Hero />
            <JobSection />
          </>
        )}

        {activeTab === "reviews" && <CompanyReviews />}

        {activeTab === "salaries" && <Salaries />}

        {activeTab === "login" && <Login />}
      </main>
    </div>
  );
}

export default App;
