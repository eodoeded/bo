import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './studio/App.jsx'

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

function StudioApp() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen w-full overflow-x-hidden">
      <App />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudioApp />
  </StrictMode>,
)
