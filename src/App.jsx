import React, { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";

import Header from './components/Header';
import WaitlistHero from './components/WaitlistHero';
import WaitlistHowItWorks from './components/WaitlistHowItWorks';
import WaitlistBenefits from './components/WaitlistBenefits';
import WaitlistFeatures from './components/WaitlistFeatures';
import WaitlistFooter from './components/WaitlistFooter';
import BrandGuidelines from './components/BrandGuidelines';
import StudioDashboard from './pages/StudioDashboard';
import ToolBuilder from './pages/ToolBuilder';
import ToolRunner from './pages/ToolRunner';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#261E19] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal">
      <Header />
      <main className="relative">
        <WaitlistHero />
        <WaitlistHowItWorks />
        <WaitlistBenefits />
        <WaitlistFeatures />
      </main>
      <WaitlistFooter />
    </div>
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/brandguidelines" element={<BrandGuidelines />} />
        <Route path="/studio" element={<StudioDashboard />} />
        <Route path="/studio/builder/:id" element={<ToolBuilder />} />
        <Route path="/tool/:id" element={<ToolRunner />} />
      </Routes>
      <Analytics />
    </>
  );
}

export default App;
