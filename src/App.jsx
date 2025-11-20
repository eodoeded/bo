import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Proceses from './components/Proceses'
import Divider from './components/Devider'

function App() {


  return (
    <>
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none z-[100]"></div>
         <Header />
         <Hero/>
         <Proceses />
         <Divider />
    </>
  )
}

export default App
