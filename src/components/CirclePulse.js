import React from 'react';

const CirclePulse = ({
  color = 'blue', // Default color
  size = 50, // Default size of the inner circle in pixels
  pulseSize = 80, // Default maximum size of the pulsing circle
  animationDuration = 2, // Default duration of one pulse cycle in seconds
}) => {
  const circleStyle = {
    width: size,
    height: size,
    backgroundColor: color,
    borderRadius: '50%',
    position: 'relative',
  };

  const pulseStyle = {
    width: size,
    height: size,
    border: `2px solid ${color}`,
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    animation: `pulse ${animationDuration}s infinite`,
  };

  return (
      <div style={pulseStyle}>
            <div style={circleStyle}>
        </div>
      </div>
  );
};

export default CirclePulse;
