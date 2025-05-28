import React, { useState } from 'react';
import App from './App';
import LiveFeed from './components/LiveFeed';
import { ColorFeedProvider } from './contexts/ColorFeedContext';

function AppRouter() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  React.useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return (
    <ColorFeedProvider>
      {currentPath === '/live' ? <LiveFeed /> : <App />}
    </ColorFeedProvider>
  );
}

export default AppRouter; 