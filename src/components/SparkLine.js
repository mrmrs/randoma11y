import React from 'react';

const Sparkline = ({ data, colorPair, borderRadius = 0 }) => {
  const defaultColors = ['#000000', '#ffffff']; // Default color pair
  const [primaryColor, secondaryColor] = colorPair || defaultColors;

  if (!data || data.length === 0) return null;

  // Find peak value
  const peak = Math.max(...data);

  // Prepare data for sparkline
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const svgHeight = 128;
  const svgWidth = 512;
  const xScale = svgWidth / (data.length - 1);
  const yScale = svgHeight / (maxValue - minValue);

  const generatePathData = (data) => {
    return data.reduce((acc, point, i) => {
      const x = i * xScale;
      const y = svgHeight - (point - minValue) * yScale;

      // For the first point, move to it without drawing a line
      if (i === 0) return `M ${x},${y}`;

      // For other points, draw a curve from the previous point
      const prevX = (i - 1) * xScale;
      const prevY = svgHeight - (data[i - 1] - minValue) * yScale;
      const controlX = (prevX + x) / 2;

      return `${acc} C ${controlX},${prevY} ${controlX},${y} ${x},${y}`;
    }, '');
  };

  const pathData = generatePathData(data);

  const graphStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: primaryColor,
    color: secondaryColor,
    padding: '32px',
    gap: '16px',
    borderRadius: borderRadius,
    boxShadow: 'inset 0 0 0 1px currentColor',
  };

  return (
    <div style={graphStyle}>
      <div>
        <h2 style={{ margin: '0', fontWeight: 700, fontSize: '10px' }}>Peak Value</h2>
        <p style={{ margin: '0', fontSize: '64px', fontWeight: 400, fontFamily: 'monospace' }}>{parseInt(peak).toFixed(2)}</p>
      </div>
      <svg height={svgHeight} width={svgWidth} style={{ width: '100%', overflow: 'visible' }}>
        <path 
          d={pathData}
          fill="none" 
          stroke={secondaryColor} 
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Sparkline;
