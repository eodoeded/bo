import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HeroCarousel from './components/HeroCarousel.jsx'
import Header from './components/Header.jsx'

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

function CarouselApp() {
  return (
    <div className="bg-[#12110D] min-h-screen w-full overflow-x-hidden">
      <Header />
      <HeroCarousel />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarouselApp />
  </StrictMode>,
)

