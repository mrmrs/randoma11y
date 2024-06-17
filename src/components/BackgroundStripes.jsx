import React from 'react';

const BackgroundStripes = ({ colorPair, degree = 0, ...props }) => {
    return (
        <div style={{
          width: '100%',
          minHeight: '64pX',
          aspectRatio: '6/4',
          boxShadow: 'inset 0 0 0 1px currentColor',
          backgroundImage: 'repeating-linear-gradient('+degree+'deg, transparent, transparent 5px, currentcolor 5px, currentcolor 6px)'
        }} {...props} />

    );
};

export default BackgroundStripes;
