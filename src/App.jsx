import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import WaitlistHero from './components/WaitlistHero'
import WaitlistHowItWorks from './components/WaitlistHowItWorks'
import WaitlistBenefits from './components/WaitlistBenefits'
import WaitlistFeatures from './components/WaitlistFeatures'
import WaitlistFooter from './components/WaitlistFooter'
import BrandGuidelines from './components/BrandGuidelines'
import Studio from './components/Studio'

function LandingPage() {
  return (
    <>
      <Header />
      <WaitlistHero />
      <WaitlistHowItWorks />
      <WaitlistBenefits />
      <WaitlistFeatures />
      <WaitlistFooter />
    </>
  );
}

function App() {
  return (
    <>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-[100]"></div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/brandguidelines" element={<BrandGuidelines />} />
        <Route path="/studio" element={<Studio />} />
      </Routes>
    </>
  )
}

export default App
