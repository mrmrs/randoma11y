import React from 'react';
import { useColorFeedContext } from '../contexts/ColorFeedContext';
import Color from 'colorjs.io';
import Logo from './Logo.jsx'

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

  const handleClick = () => {
    // Encode colors for URL path segments
    const encodedBg = encodeURIComponent(bg);
    const encodedFg = encodeURIComponent(fg);
    
    // Full page navigation to load colors properly using the new path format
    window.location.href = `/${encodedBg}/${encodedFg}`;
  };

  return (
    <div 
      className="color-pair-card"
      onClick={handleClick}
      title={`color: ${fg} / background: ${bg}`}
      style={{ 
        backgroundColor: bg,
        color: fg,
        padding: '1.5rem',
        position: 'relative',
        transition: 'all 0.3s ease',
        animation: 'slideIn 0.5s ease-out',
        cursor: 'pointer'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '.5rem',
      }}>
        <div style={{ height: '8px', borderRadius: '9999px', width: '8px', aspectRatio: 1, background: fg }}></div>
          <p style={{ margin: 0, fontWeight: '600' }}>
            {colorData.algorithm}: {Math.abs(colorData.contrast).toFixed(2)}
          </p>
        <time style={{ marginLeft: 'auto', fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.7 }}>
          {timeAgo}
        </time>
      </div>
      
      <div style={{ 
        fontSize: '0.875rem',
          fontFamily: 'monospace',
        display: 'none',
      }}>
        <div>
          <code>
            background: {bg}<br />
            color: {fg}
          </code>
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
  } = useColorFeedContext();

  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#111',
      color: '#fff',
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
          z-index: 10;
        }
        
        .color-pair-card:active {
          transform: scale(0.98);
        }
        
        
        .connection-indicator {
          width: 6px;
          height: 6px;
          border-radius: 100%;
          display: inline-block;
          margin-right: 0.5rem;
          font-size: 12px;
        }
      `}</style>


      <div>
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
<a 
              href="/"
              style={{ 
                padding: '1.25rem 1rem',
                backgroundColor: 'transparent',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '0.25rem',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
                
              }}
            >
    <Logo colorPair={['black', 'white', ]} size={20} />
  <b className='dn db-m' style={{ fontSize: '12px', letterSpacing: '-0.05em', fontWeight: 900 }}>RandomA11y</b>
            </a>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '1rem'
          }}>
            <div style={{ 
              marginRight: '1rem',
              display: 'flex', 
              alignItems: 'center',
              padding: '0.25rem .5rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '6px'
            }}>
              <span 
                className="connection-indicator"
                style={{ 
                  backgroundColor: isConnected ? '#0f0' : '#f00',
                  animation: isConnected ? 'pulse 2s infinite' : 'none'
                }}
              />
              <span style={{ fontSize: '10px', fontFamily: 'monospace' }}>
                {isConnected ? 'Connected' : error || 'Disconnected'}
              </span>
            </div>
            
            
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
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'minmax(320px, 3fr) minmax(320px, 1fr)',
            padding: '0 1rem',
            gap: '1rem',
        }}>
          <div className="feed-section">
            <h2 style={{ 
              fontSize: '1rem', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span>✨</span> Generated
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
              <div style={{ display: 'grid', gap: '1rem' }}>
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
              fontSize: '1rem', 
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>❤️</span> Favorites
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
              <div style={{ display: 'grid', gap: '1rem' }}>
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
