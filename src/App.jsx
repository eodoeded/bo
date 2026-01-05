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
import DroneMap from './pages/DroneMap';
import ProtectedRoute from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

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
    <div className="min-h-screen bg-[#261E19] text-white selection:bg-[#E3E3FD] selection:text-black font-montreal relative" style={{ minHeight: '100vh', position: 'relative', zIndex: 1, contain: 'layout style paint' }}>
      <div className="fixed inset-0 bg-[#261E19] z-0" style={{ willChange: 'auto' }}></div>
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
    console.log('✅ App component mounted');
    console.log('Current route:', location.pathname);
    if (location.pathname === '/brandguidelines') {
      console.log('✅ BrandGuidelines route matched!');
    }
  }, [location.pathname]);

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/brand-guidelines" element={<DesignSystem />} />
        {/* Redirect old routes to canonical route */}
        <Route path="/designsystem" element={<DesignSystem />} />
        <Route path="/brandguidelines" element={<DesignSystem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dronemap" element={<DroneMap />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/studio" element={<StudioDashboard />} />
          <Route path="/studio/builder/:id" element={
            <ErrorBoundary>
              <ToolBuilder />
            </ErrorBoundary>
          } />
        </Route>
        <Route path="/tool/:id" element={
          <ErrorBoundary>
            <ToolRunner />
          </ErrorBoundary>
        } />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
