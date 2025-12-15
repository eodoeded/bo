// Initialize root element
const rootElement = document.getElementById('root');

// Add comprehensive error handlers
window.addEventListener('error', (e) => {
  console.error('Global error:', e);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace; background: red; position: fixed; top: 0; left: 0; z-index: 99999;">
      <h1>Error Loading App</h1>
      <p>${e.message}</p>
      <p>File: ${e.filename}</p>
      <p>Line: ${e.lineno}</p>
      <pre>${e.stack || 'No stack trace'}</pre>
    </div>`;
  }
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e);
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace; background: red; position: fixed; top: 0; left: 0; z-index: 99999;">
      <h1>Promise Rejection Error</h1>
      <p>${String(e.reason)}</p>
    </div>`;
  }
});

// Optimized loading: Use Promise.all for parallel imports
try {
  Promise.all([
    import('react'),
    import('react-dom/client'),
    import('react-router-dom'),
    import('./App.jsx'),
    import('./index.css').catch(() => {}) // CSS is optional
  ]).then(([React, ReactDOM, Router, AppModule]) => {
    const { StrictMode, createElement } = React;
    const { createRoot } = ReactDOM;
    const { BrowserRouter } = Router;
    const App = AppModule.default;
    
    const root = document.getElementById('root');
    if (root) {
      // Render immediately but mark as loaded after a microtask
      createRoot(root).render(
        createElement(StrictMode, null,
          createElement(BrowserRouter, null,
            createElement(App, null)
          )
        )
      );
      
      // Mark body as loaded after render to prevent flash
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.classList.add('loaded');
        });
      });
      console.log('✅ React app mounted successfully');
    }
  }).catch(err => {
    console.error('❌ Error loading modules:', err);
    showError('Module loading error', err);
  });
} catch (error) {
  console.error('❌ Error in main.jsx:', error);
  showError('Critical error', error);
}

function showError(title, error) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `<div style="color: white; padding: 20px; font-family: monospace; background: red; position: fixed; top: 0; left: 0; z-index: 99999; width: 100%;">
      <h1>${title}</h1>
      <p>${error.message || String(error)}</p>
      <pre>${error.stack || 'No stack trace'}</pre>
    </div>`;
  }
}
