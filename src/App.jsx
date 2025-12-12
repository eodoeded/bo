import './App.css'
import Header from './components/Header'
import WaitlistHero from './components/WaitlistHero'
import WaitlistHowItWorks from './components/WaitlistHowItWorks'
import WaitlistBenefits from './components/WaitlistBenefits'
import WaitlistFeatures from './components/WaitlistFeatures'
import WaitlistFooter from './components/WaitlistFooter'

function App() {
  return (
    <>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-[100]"></div>
         <Header />
         <WaitlistHero />
         <WaitlistHowItWorks />
         <WaitlistBenefits />
         <WaitlistFeatures />
         <WaitlistFooter />
    </>
  )
}

export default App
