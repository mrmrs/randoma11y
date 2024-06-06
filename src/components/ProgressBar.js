import React from 'react';

const ProgressBar = ({ colorPair, progress, borderRadius = 0 }) => {
  const progressBarStyle = {
    backgroundImage: `repeating-linear-gradient(
      45deg,
      ${colorPair[1]},
      ${colorPair[1]} 1px,
      transparent 1px,
      transparent 6px
    )`,
    height: '24px',
    borderRadius: borderRadius,
    overflow: 'hidden',
    boxShadow: '0 0 0 1px ' + colorPair[1],
  };

  const progressStyle = {
    backgroundColor: colorPair[1],
    color: colorPair[0],
    width: `${progress}%`,
    height: '100%',
    display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    transition: 'width 0.2s ease',
      fontSize: '10px',
      paddingRight: '8px',
  };

  return (
    <div style={progressBarStyle}>
      <div style={progressStyle}>{parseInt(progress).toFixed(2)}%</div>
    </div>
  );
};

export default ProgressBar;
