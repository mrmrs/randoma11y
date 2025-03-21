import React, { useState } from 'react';
import curatedPalettes from '../data/curatedPalettes';

export default function CopyCodeSnippet({ colorPair }) {
  const [copied, setCopied] = useState(false);

  // Generate combined CSS code with variables and classes that use them
  const cssCode = `:root {
  --color-1: ${colorPair[0]};
  --color-2: ${colorPair[1]};
}

/* Normal theme */
.combo-1 {
  color: var(--color-1);
  background-color: var(--color-2);
}

/* Inverse theme */
.combo-2 {
  color: var(--color-2);
  background-color: var(--color-1);
}`;

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '100%',
      padding: '16px', 
      boxShadow: 'inset 0 0 0 1px currentColor',
      backgroundColor: 'transparent',
      color: 'currentColor',
      borderRadius: '0px',
     
       display: 'flex',
      
       flexDirection: 'column',
    }}>

      <pre style={{ 
      
 
        borderRadius: '0px',
        overflowX: 'auto',
        whiteSpace: 'pre-wrap',
        fontSize: '12px',
        fontFamily: 'monospace',
        position: 'relative',
        margin: 0
      }}>
        <code>{cssCode}</code>
      </pre>
      
      <button
        onClick={handleCopy}
        style={{
          marginTop: 'auto',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          gap: '4px',
          padding: '8px 12px',
          
          border: '1px solid currentColor',
          background: colorPair[1],
          color: colorPair[0],
          cursor: 'pointer',
          fontSize: '12px',
        alignSelf: 'flex-end',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </button>
    </div>
  );
} 