import React, { createContext, useContext } from 'react';
import { useColorFeed } from '../hooks/useColorFeed';

const ColorFeedContext = createContext(null);

export const ColorFeedProvider = ({ children }) => {
  const colorFeedData = useColorFeed();
  
  return (
    <ColorFeedContext.Provider value={colorFeedData}>
      {children}
    </ColorFeedContext.Provider>
  );
};

export const useColorFeedContext = () => {
  const context = useContext(ColorFeedContext);
  if (!context) {
    throw new Error('useColorFeedContext must be used within a ColorFeedProvider');
  }
  return context;
}; 