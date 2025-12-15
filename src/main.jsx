// First, show something immediately
const rootElement = document.getElementById('root');
if (rootElement) {
  rootElement.innerHTML = '<div style="color: white; padding: 20px; font-size: 24px; background: red; position: fixed; top: 0; left: 0; z-index: 99999;">TEST: HTML is working. Loading React...</div>';
}

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

// Now try to load React
try {
  import('react').then(React => {
    import('react-dom/client').then(ReactDOM => {
      import('react-router-dom').then(Router => {
        import('./App.jsx').then(AppModule => {
          import('./index.css').catch(() => {}); // CSS is optional
          
          const { StrictMode } = React;
          const { createRoot } = ReactDOM;
          const { BrowserRouter } = Router;
          const App = AppModule.default;
          
          const root = document.getElementById('root');
          if (root) {
            createRoot(root).render(
              StrictMode.createElement(BrowserRouter, null,
                StrictMode.createElement(App, null)
              )
            );
            console.log('✅ React app mounted successfully');
          }
        }).catch(err => {
          console.error('❌ Error loading App:', err);
          showError('App module error', err);
        });
      }).catch(err => {
        console.error('❌ Error loading react-router-dom:', err);
        showError('Router error', err);
      });
    }).catch(err => {
      console.error('❌ Error loading react-dom:', err);
      showError('React DOM error', err);
    });
  }).catch(err => {
    console.error('❌ Error loading react:', err);
    showError('React error', err);
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
