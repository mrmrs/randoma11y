import * as React from 'react';
import { Checkbox } from '@base-ui-components/react/checkbox';

export default function InputCheckbox({ label = "Enable notifications", colorPair }) {
  // Extract colors from colorPair if provided
  const foregroundColor = colorPair ? colorPair[1] : 'currentColor';
  const backgroundColor = colorPair ? colorPair[0] : 'white';
  
  return (
    <>
      <style>
        {`
          .checkbox-root {
            width: 16px;
            height: 16px;
            border-radius: 0px;
            color: ${foregroundColor};
            border: 1px solid ${foregroundColor};
            background-color: ${foregroundColor};
            display: flex;
            align-items: center;
            justify-content: center;
            
          }
          
          .checkbox-root[data-state="checked"] {
            color: ${foregroundColor};
          }

            .checkbox-root[data-unchecked] {
    border: 1px solid currentColor;
    background-color: transparent;
  }

  .checkbox-root[data-checked] {
    background-color: ${foregroundColor};
  }

  .checkbox-root:focus-visible {
    outline: 2px solid ${foregroundColor};
    outline-offset: 2px;
  }
          
          .checkbox-indicator {
            color: ${foregroundColor};
          }
          
          .checkbox-label {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            user-select: none;
            color: ${foregroundColor};
          }
            .checkbox-icon {
            color: ${backgroundColor};
        }
            
        `}
      </style>
      
      <label className="checkbox-label">
        <Checkbox.Root defaultChecked className="checkbox-root">
          <Checkbox.Indicator className="checkbox-indicator">
            <CheckIcon className='checkbox-icon'/>
          </Checkbox.Indicator>
        </Checkbox.Root>
        {label}
      </label>
    </>
  );
}

function CheckIcon(props) {
  return (
    <svg fill="currentcolor" width="10" height="10" viewBox="0 0 10 10" {...props}>
      <path d="M9.1603 1.12218C9.50684 1.34873 9.60427 1.81354 9.37792 2.16038L5.13603 8.66012C5.01614 8.8438 4.82192 8.96576 4.60451 8.99384C4.3871 9.02194 4.1683 8.95335 4.00574 8.80615L1.24664 6.30769C0.939709 6.02975 0.916013 5.55541 1.19372 5.24822C1.47142 4.94102 1.94536 4.91731 2.2523 5.19524L4.36085 7.10461L8.12299 1.33999C8.34934 0.993152 8.81376 0.895638 9.1603 1.12218Z" />
    </svg>
  );
}