import React from 'react';

const BarChart = ({ colorPair, borderRadius = 0, data }) => {

  const chartStyle = {
    width: '100%',
    height: '256px',
    display: 'flex',
    alignItems: 'flex-end',
    gap: '4px',
    justifyContent: 'space-around',
    backgroundColor: colorPair[0],
    padding: '48px',
    borderRadius: borderRadius,
    boxShadow: 'inset 0 0 0 1px currentColor'
  };

  const barStyle = {
    width: '100%',
    backgroundColor: colorPair[1],
    marginBottom: '4px',
    transition: 'height 1s ease',
  };

  const labelStyle = {
    fontFamily: 'monospace',
    color: colorPair[1],
    fontSize: '10px',
    textAlign: 'center',
    marginTop: '0px',
  };

  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div style={chartStyle}>
      {data.map((item) => (
        <div key={item.label} style={{ textAlign: 'center', height: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
          <div
            style={{
              ...barStyle,
              height: `${(item.value / maxValue) * 100}%`,
            }}
          />
          <div style={labelStyle}>{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default BarChart;
