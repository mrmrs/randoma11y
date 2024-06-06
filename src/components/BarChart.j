import React from 'react';

const BarChart = ({ colorPair, data }) => {
  const data = [
    { label: 'A', value: Math.floor(Math.random() * 100) },
    { label: 'B', value: Math.floor(Math.random() * 100) },
    { label: 'C', value: Math.floor(Math.random() * 100) },
    { label: 'D', value: Math.floor(Math.random() * 100) },
    { label: 'E', value: Math.floor(Math.random() * 100) },
  ];

  const chartStyle = {
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: colorPair[0],
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const barStyle = {
    width: '60px',
    backgroundColor: colorPair[1],
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
    marginBottom: '8px',
    transition: 'height 0.5s ease',
  };

  const labelStyle = {
    color: colorPair[1],
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '8px',
  };

  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div style={chartStyle}>
      {data.map((item) => (
        <div key={item.label} style={{ height: '100%' }}>
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
