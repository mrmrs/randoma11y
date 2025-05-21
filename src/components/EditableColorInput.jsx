import React from 'react';

const EditableColorInput = React.memo((
  { 
    label,
    id,
    value, // The raw string input from the user
    actualColor, // The current valid color string for visual feedback
    onChange,
    onBlur,
    onLockToggle,
    isLocked,
    isValidInput = true, // Assume valid until externally told otherwise
    colorPairForStyling // To style the input text against its own background
  }
) => {

  const inputStyle = {
    appearance: 'none',
    WebkitAppearance: 'none',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: isValidInput ? colorPairForStyling[1] : 'red', // Use FG for border, or red if invalid
    color: colorPairForStyling[1], // Text color is FG
    backgroundColor: colorPairForStyling[0], // Background of input is the actual color it represents
    padding: '8px', // Increased padding for better text visibility
    fontSize: '14px', // Larger font size
    fontFamily: 'monospace',
    width: '100%', 
    borderRadius: '0px', // Consistent with other inputs
    minHeight: '40px', // Ensure consistent height
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
  };

  const buttonStyle = {
    appearance: 'none',
    WebkitAppearance: 'none',
    borderWidth: '0px',
    borderStyle: 'solid',
    borderColor: colorPairForStyling[0],
    background: 'transparent',
    color: 'inherit',
   // background: isLocked ? colorPairForStyling[0] : colorPairForStyling[1],
    //color: isLocked ? colorPairForStyling[1] : colorPairForStyling[0],
    padding: '8px',
    fontSize: '12px',
    cursor: 'pointer',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    right: '0px'
  };

  const wrapperStyle = {
    display: 'flex',
    width: '100%',
    gap: '1px', // Minimal gap to show distinct elements
    alignItems: 'center',
    position: 'relative',
  };

  return (
    <div style={{width: '100%'}}>
      {label && <label htmlFor={id} style={{ display: 'block', marginBottom: '4px', fontSize: '12px', fontWeight: 'bold' }}>{label}</label>}
      <div style={wrapperStyle}>
        <input
          type="text"
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          style={inputStyle}
          spellCheck="false"
        />
        <button onClick={onLockToggle} style={buttonStyle} title={isLocked ? "Unlock color" : "Lock color"}>
          {isLocked ? 
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="currentColor" strokeLinecap="round" strokeLinejoin="round" class="css-i6dzq1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
            : 
            <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" class="css-i6dzq1"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
          }
        </button>
      </div>
    </div>
  );
});

export default EditableColorInput; 