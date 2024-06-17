import React from 'react';

const GradientPanel = ({ colorPair, ...props}) => {
    return (
    <div style={{ marginBottom: '8px', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '384px', padding: '128px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colorPair[0], backgroundImage: 'radial-gradient(circle, currentColor 0%, transparent 110%)' }}>
    <blockquote style={{ color: colorPair[0], maxWidth: '24ch', fontSize: '48px'}}>
      <p style={{ fontSize: '48px', fontWeight: 900, margin: 0 }}>Color is my day-long obsession, joy, and torment.</p>
    <p style={{ marginTop: '8px', fontSize: '20px', }}><small>Claude Monet</small></p>
    </blockquote>
    </div>
    );
};

export default GradientPanel;
