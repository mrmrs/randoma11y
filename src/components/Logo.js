import React from 'react';

const Logo = ({ colorPair, size }) => {
  const logoStyle = {
    width: size,
    height: size,
  };

  return (
<svg version="1.1" width={size} height={size} xmlns="http://www.w3.org/2000/svg" style={{overflow: 'visible'}}>
    <clipPath id="cut-off">
      <rect x="0" y={size/2} width={size} height={size/2} />
    </clipPath>

      <circle cx={size / 2} cy={size / 2 } r={size/2} fill={colorPair[0]} stroke={colorPair[1]} strokeWidth={2} />
      <circle cx={size / 2} cy={size / 2 } r={size/2} fill={colorPair[1]} clipPath="url(#cut-off)" />
</svg>
  );
};

export default Logo;
