import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

if ('scrollRestoration' in history) { history.scrollRestoration = 'manual'; }
window.scrollTo(0, 0);

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Studio app error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', fontFamily: 'monospace', color: 'red', background: 'white', minHeight: '100vh' }}>
          <h1>Error loading Studio</h1>
          <p><strong>Error:</strong> {this.state.error?.message}</p>
          <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>{this.state.error?.stack}</pre>
          {this.state.errorInfo && (
            <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>{this.state.errorInfo.componentStack}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

function StudioApp() {
  const [App, setApp] = React.useState(null);
  const [loadingError, setLoadingError] = React.useState(null);

  React.useEffect(() => {
    import('./studio/App.jsx')
      .then((module) => {
        setApp(() => module.default);
      })
      .catch((error) => {
        console.error('Failed to load App:', error);
        setLoadingError(error);
      });
  }, []);

  if (loadingError) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace', color: 'red', background: 'white', minHeight: '100vh' }}>
        <h1>Failed to load Studio App</h1>
        <p><strong>Error:</strong> {loadingError.message}</p>
        <pre style={{ background: '#f0f0f0', padding: '10px', overflow: 'auto' }}>{loadingError.stack}</pre>
      </div>
    );
  }

  if (!App) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace', background: 'white', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading Studio...</div>
      </div>
    );
  }

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
      <div style="padding: 20px; font-family: monospace; color: red; background: white; min-height: 100vh;">
        <h1>Error loading Studio</h1>
        <p><strong>Error:</strong> ${error.message}</p>
        <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${error.stack}</pre>
        <p>Check browser console for more details.</p>
      </div>
    `;
  }
}
