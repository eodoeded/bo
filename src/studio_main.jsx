import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './studio/App.jsx'
import Header from './components/Header.jsx'

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

function StudioApp() {
  return (
    <div className="bg-[#12110D] min-h-screen w-full overflow-x-hidden">
      <Header />
      <App />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudioApp />
  </StrictMode>,
)
