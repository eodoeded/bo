import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import './index.css'
import App from './App.jsx'

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

// Add error boundary
window.addEventListener('error', (e) => {
  console.error('Global error:', e);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace;">
      <h1>Error Loading App</h1>
      <p>${e.message}</p>
      <p>Check console for details.</p>
    </div>`;
  }
});

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <BrowserRouter>
          <App />
          <Analytics />
        </BrowserRouter>
      </StrictMode>
    );
    console.log('✅ React app mounted successfully');
  } catch (error) {
    console.error('❌ Error mounting React app:', error);
    rootElement.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace;">
      <h1>React Mount Error</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>`;
  }
} else {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color: white; padding: 20px;">Error: Root element not found!</div>';
}
