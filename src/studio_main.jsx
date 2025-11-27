import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './studio/App.jsx'

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Studio app error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'monospace', color: 'red' }}>
          <h1>Error loading Studio</h1>
          <p>{this.state.error?.message}</p>
          <pre>{this.state.error?.stack}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

function StudioApp() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen w-full overflow-x-hidden">
      <App />
    </div>
  );
}

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <StudioApp />
      </ErrorBoundary>
    </StrictMode>,
  );
} catch (error) {
  console.error('Failed to render Studio app:', error);
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: monospace; color: red;">
        <h1>Error loading Studio</h1>
        <p>${error.message}</p>
        <pre>${error.stack}</pre>
        <p>Check browser console for more details.</p>
      </div>
    `;
  }
}
