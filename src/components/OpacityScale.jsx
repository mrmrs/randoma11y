import React from 'react';

const OpacityScale = ({ color, borderRadius = 0, ...props }) => {
    return (
      <article style={{ display: 'flex', gap: '8px', padding: '8px', border: '1px solid', color: color }}>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 1 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.9 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.8 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.7 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.6 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.5 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.4 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.3 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.2 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.1 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.05 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '48px', backgroundColor: color, opacity: 0.025 }}></div>
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', width: '100%', minHeight: '64px', backgroundColor: color, opacity: 0.0125 }}></div>
      </article>
    );
};

export default OpacityScale;
