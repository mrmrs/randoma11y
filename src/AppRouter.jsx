import React, { useState, useEffect } from 'react';
import App from './App.jsx';
import LiveFeed from './components/LiveFeed.jsx';

const AppRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Handle browser back/forward buttons
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Simple routing logic
  if (currentPath === '/live') {
    return <LiveFeed />;
  }

  // Default to main app
  return <App />;
};

export default AppRouter; 