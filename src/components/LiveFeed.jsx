import React from 'react';
import { useColorFeed } from '../hooks/useColorFeed';
import Color from 'colorjs.io';

const ColorPairCard = ({ colorData, type }) => {
  const [bg, fg] = colorData.colors;
  const timeSince = new Date() - new Date(colorData.timestamp);
  const seconds = Math.floor(timeSince / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  const timeAgo = hours > 0 
    ? `${hours}h ago` 
    : minutes > 0 
      ? `${minutes}m ago` 
      : `${seconds}s ago`;

  return (
    <div 
      className="color-pair-card"
      style={{ 
        backgroundColor: bg,
        color: fg,
        padding: '1.5rem',
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        position: 'relative',
        transition: 'all 0.3s ease',
        animation: 'slideIn 0.5s ease-out'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '0.5rem'
      }}>
        <div>
          <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
            {type === 'generated' ? '✨ Generated' : '❤️ Favorited'}
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            {colorData.algorithm}: {Math.abs(colorData.contrast).toFixed(2)}
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
          {timeAgo}
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '1rem',
        fontSize: '0.875rem',
        fontFamily: 'monospace'
      }}>
        <div>
          <div style={{ opacity: 0.7 }}>Background</div>
          <div>{bg}</div>
        </div>
        <div>
          <div style={{ opacity: 0.7 }}>Foreground</div>
          <div>{fg}</div>
        </div>
      </div>
    </div>
  );
};

const LiveFeed = () => {
  const { 
    recentColors, 
    recentFavorites, 
    isConnected, 
    error 
  } = useColorFeed();

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#111',
      color: '#fff',
      padding: '2rem'
    }}>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .color-pair-card:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        
        .feed-section {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .connection-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 0.5rem;
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700',
              marginBottom: '0.5rem' 
            }}>
              Randoma11y Live Feed
            </h1>
            <p style={{ opacity: 0.7 }}>
              Real-time feed of accessible color combinations being generated worldwide
            </p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '2rem'
            }}>
              <span 
                className="connection-indicator"
                style={{ 
                  backgroundColor: isConnected ? '#0f0' : '#f00',
                  animation: isConnected ? 'pulse 2s infinite' : 'none'
                }}
              />
              <span style={{ fontSize: '0.875rem' }}>
                {isConnected ? 'Connected' : error || 'Disconnected'}
              </span>
            </div>
            
            <a 
              href="/"
              style={{ 
                padding: '0.5rem 1.5rem',
                backgroundColor: '#fff',
                color: '#000',
                textDecoration: 'none',
                borderRadius: '0.25rem',
                fontWeight: '500'
              }}
            >
              Back to Generator
            </a>
          </div>
        </header>

        {error === 'WebSocket disabled' && (
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '0.5rem',
            padding: '2rem',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>🚀 WebSocket Not Configured</h3>
            <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
              To enable the live feed, you need to deploy the Cloudflare Worker first.
            </p>
            <ol style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
              <li>Deploy the worker: <code>cd cloudflare-workers && wrangler deploy</code></li>
              <li>Update <code>src/config/websocket.js</code> with your worker URL</li>
              <li>Restart the development server</li>
            </ol>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '3rem'
        }}>
          <div className="feed-section">
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>✨</span> Recently Generated
              <span style={{ 
                fontSize: '0.875rem', 
                opacity: 0.5,
                fontWeight: 'normal'
              }}>
                ({recentColors.length})
              </span>
            </h2>
            
            {recentColors.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem',
                opacity: 0.5 
              }}>
                Waiting for new color generations...
              </div>
            ) : (
              <div>
                {recentColors.map((colorData) => (
                  <ColorPairCard 
                    key={colorData.id} 
                    colorData={colorData} 
                    type="generated"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="feed-section">
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>❤️</span> Recently Favorited
              <span style={{ 
                fontSize: '0.875rem', 
                opacity: 0.5,
                fontWeight: 'normal'
              }}>
                ({recentFavorites.length})
              </span>
            </h2>
            
            {recentFavorites.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '3rem',
                opacity: 0.5 
              }}>
                Waiting for favorites...
              </div>
            ) : (
              <div>
                {recentFavorites.map((colorData) => (
                  <ColorPairCard 
                    key={colorData.id} 
                    colorData={colorData} 
                    type="favorited"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {!isConnected && (
          <div style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            backgroundColor: '#ff4444',
            color: '#fff',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {error || 'Connection lost. Attempting to reconnect...'}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveFeed; 