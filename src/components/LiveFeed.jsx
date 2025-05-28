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

  return (
    <div 
      className="color-pair-card"
      style={{ 
        backgroundColor: bg,
        color: fg,
        padding: '1.5rem',
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
          <div style={{ fontSize: '1.25rem', fontWeight: '600' }}>
            {colorData.algorithm}: {Math.abs(colorData.contrast).toFixed(2)}
          </div>
        </div>
        <time style={{ fontSize: '0.75rem', fontFamily: 'monospace', opacity: 0.7 }}>
          {timeAgo}
        </time>
      </div>
      
      <div style={{ 
        fontSize: '0.875rem',
        fontFamily: 'monospace'
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
          gridTemplateColumns: '3fr 1fr',
            padding: '0 1rem',
            gap: '1rem',
        }}>
          <div className="feed-section">
            <h2 style={{ 
              fontSize: '1rem', 
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
            }}>
              <span>✨</span> Generated
              <span style={{ 
                marginLeft: '.5rem',
                fontSize: '0.75rem', 
                opacity: 0.75,
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
              fontSize: '1rem', 
              fontWeight: '600',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>❤️</span> Favorites
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
