import React from 'react';

// Accept an additionalStyles prop (object) and merge it with the base styles
const PatternDisplay = React.memo(({ background, className = '', additionalStyles = {} }) => {
  const style = {
    width: '100%',
    aspectRatio: 'var(--aspectRatio)',
    minHeight: 'var(--minHeight)',
    boxShadow: 'inset 0 0 0 1px currentColor',
    background: background, // Apply the background prop
    ...additionalStyles, // Merge additional styles here
  };

  return <div className={className} style={style}></div>;
});

export default PatternDisplay; 