import React, { useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';

import UnifiedNav from './components/UnifiedNav';
import WaitlistHero from './components/WaitlistHero';
import WaitlistHowItWorks from './components/WaitlistHowItWorks';
import WaitlistBenefits from './components/WaitlistBenefits';
import WaitlistFeatures from './components/WaitlistFeatures';
import WaitlistFooter from './components/WaitlistFooter';
import DesignSystem from './components/DesignSystem';
import StudioDashboard from './pages/StudioDashboard';
import ToolBuilder from './pages/ToolBuilder';
import ToolRunner from './pages/ToolRunner';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

// App entry point
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-[#261E19] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal relative" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="fixed inset-0 bg-[#261E19] z-0"></div>
      <div className="relative z-10">
        <UnifiedNav />
        <main className="relative z-10">
          <WaitlistHero />
          <WaitlistHowItWorks />
          <WaitlistBenefits />
          <WaitlistFeatures />
        </main>
        <WaitlistFooter />
      </div>
    </div>
  );
}

function App() {
  const location = useLocation();
  
  // Debug: Log current route
  useEffect(() => {
    console.log('Current route:', location.pathname);
    if (location.pathname === '/brandguidelines') {
      console.log('✅ BrandGuidelines route matched!');
    }
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/designsystem" element={<DesignSystem />} />
        <Route path="/brandguidelines" element={<DesignSystem />} />
        <Route path="/brand-guidelines" element={<DesignSystem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/studio" element={<StudioDashboard />} />
          <Route path="/studio/builder/:id" element={<ToolBuilder />} />
        </Route>
        <Route path="/tool/:id" element={<ToolRunner />} />
      </Routes>
    </>
  );
}

export default App;
