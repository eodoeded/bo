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

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  createRoot(rootElement).render(
    <StrictMode>
      <StudioApp />
    </StrictMode>,
  );
} catch (error) {
  console.error('Failed to render Studio app:', error);
  document.body.innerHTML = `
    <div style="padding: 20px; font-family: monospace;">
      <h1>Error loading Studio</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `;
}
