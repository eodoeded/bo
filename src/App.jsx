import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import StepsSection from './components/StepsSection'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-[100]"></div>
         <Header />
         <Hero/>
         <StepsSection />
         <Footer />
    </>
  )
}

export default App
