import React from 'react';

const OpacityScale = ({ color, borderRadius = 0, ...props }) => {
    return (
      <article style={{ display: 'flex', gap: '8px' }}>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '100%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '90%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '80%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '70%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '60%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '50%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '40%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '30%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '20%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '10%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '5%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: '2.5%' }}></div>
      <div style={{ boxshadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '64px', backgroundColor: color, opacity: '1.25%' }}></div>
      </article>
    );
};

export default OpacityScale;
