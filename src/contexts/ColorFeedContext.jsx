import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { getWebSocketUrl, isWebSocketEnabled } from '../config/websocket';

const ColorFeedContext = createContext(null);

export const ColorFeedProvider = ({ children }) => {
  const [recentColors, setRecentColors] = useState([]);
  const [recentFavorites, setRecentFavorites] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  
  // Maximum items to keep in memory (matching server limit)
  const MAX_ITEMS = 1000;

  const connect = useCallback(() => {
    // Check if WebSocket is enabled
    if (!isWebSocketEnabled()) {
      setError('WebSocket disabled');
      return;
    }

    // Don't create a new connection if one already exists
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      const ws = new WebSocket(getWebSocketUrl());
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setError(null);
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          switch (data.type) {
            case 'initial':
              setRecentColors(data.recentColors || []);
              setRecentFavorites(data.recentFavorites || []);
              break;
              
            case 'newColor':
              setRecentColors(prev => {
                // Always add new color at the beginning and keep only MAX_ITEMS
                const newColors = [data.color, ...prev.slice(0, MAX_ITEMS - 1)];
                return newColors;
              });
              break;
              
            case 'newFavorite':
              setRecentFavorites(prev => {
                // Check if this favorite already exists (to prevent duplicates)
                const exists = prev.some(f => 
                  f.id === data.favorite.id || 
                  (f.colors[0] === data.favorite.colors[0] && f.colors[1] === data.favorite.colors[1])
                );
                if (exists) return prev;
                // Always add new favorite at the beginning and keep only MAX_ITEMS
                return [data.favorite, ...prev.slice(0, MAX_ITEMS - 1)];
              });
              break;
              
            default:
              console.warn('Unknown message type:', data.type);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('Connection error');
      };

      ws.onclose = () => {
        setIsConnected(false);
        wsRef.current = null;

        // Implement exponential backoff for reconnection
        const attempts = reconnectAttemptsRef.current;
        if (attempts < 5) {
          const delay = Math.min(1000 * Math.pow(2, attempts), 30000);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current += 1;
            connect();
          }, delay);
        } else {
          setError('Unable to connect to live feed');
        }
      };
    } catch (err) {
      console.error('Error creating WebSocket:', err);
      setError('Failed to connect');
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setIsConnected(false);
    reconnectAttemptsRef.current = 0;
  }, []);

  const sendColorGenerated = useCallback((colorData) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'colorGenerated',
        ...colorData
      }));
    }
  }, []);

  const sendColorFavorited = useCallback((colorData) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'colorFavorited',
        ...colorData
      }));
    }
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, []); // Empty dependency array - only run once

  const value = {
    recentColors,
    recentFavorites,
    isConnected,
    error,
    sendColorGenerated,
    sendColorFavorited
  };
  
  return (
    <ColorFeedContext.Provider value={value}>
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