import React, { useEffect, useRef } from 'react';

// Removed contrastValue and algorithm props
const ProgressBar = ({ colorPair, progress, borderRadius = 0 }) => {
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.setProperty('--progress-bar-bg-color', colorPair[1]);
      progressBarRef.current.style.setProperty('--progress-bar-text-color', colorPair[0]);
    }
  }, [colorPair]);

  // Define the SVG pattern using CSS variable for color
  // Using an 8x8 pattern unit with a 2px stroke width for the diagonal
  const svgPatternDef = `
    <pattern id="progressBarStripePattern" patternUnits="userSpaceOnUse" width="8" height="8">
      <path d="M-2,2 l4,-4 M0,8 l8,-8 M6,10 l4,-4" 
            style="stroke:var(--progress-bar-bg-color); stroke-width:2" />
    </pattern>
  `;

  const progressBarStyle = {
    position: 'relative', // Needed for absolute positioning of SVG background
    height: '24px',
    borderRadius: borderRadius,
    overflow: 'hidden',
    boxShadow: '0 0 0 1px var(--progress-bar-bg-color)',
    backgroundColor: 'transparent', // Outer div shouldn't have a background itself
  };

  const svgBackgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 0, // Ensure it's behind the progress fill
  };

  const progressStyle = {
    position: 'relative', // Ensure progress is above SVG background
    zIndex: 1,            // Ensure progress is above SVG background
    backgroundColor: 'var(--progress-bar-bg-color)',
    color: 'var(--progress-bar-text-color)',
    width: `${progress}%`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    transition: 'width 0.2s ease',
    fontSize: '10px',
    fontFamily: 'monospace', // Added monospace font
    paddingRight: '8px',
  };

  return (
    <div ref={progressBarRef} style={progressBarStyle}>
      {/* SVG Background Pattern */}
      <svg style={svgBackgroundStyle} aria-hidden="true">
        <defs dangerouslySetInnerHTML={{__html: svgPatternDef}} />
        <rect width="100%" height="100%" fill="url(#progressBarStripePattern)" />
      </svg>
      {/* Display the progress percentage */}
      <div style={progressStyle}>{progress.toFixed(1)}%</div>
    </div>
  );
};

export default ProgressBar;
