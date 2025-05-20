import React, { useState } from 'react';
import { Slider } from '@base-ui-components/react/slider';

const BaseSlider = ({ colorPair, defaultValue = 50, borderRadius = 0 }) => {
  const [val, setVal] = useState(defaultValue);
  const fg = colorPair ? colorPair[1] : 'currentColor';
  const bg = colorPair ? colorPair[0] : 'transparent';

  return (
    <>
      <style>{`
        .slider-root {
          width: 128px;
          display: inline-flex;
          align-items: center;
          color: ${fg};
        }
        .slider-track {
          position: relative;
          flex: 1;
          height: 8px;
          background: ${bg};
          border: 1px solid ${fg};
          border-radius: ${borderRadius};
        }
        .slider-indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: ${fg};
        }
        .slider-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${fg};
          border: 1px solid ${bg};
        }
        .slider-value {
          margin-left: 8px;
          font-size: 10px;
          font-family: monospace;
        }
      `}</style>
      <Slider.Root
        value={val}
        onValueChange={setVal}
        className="slider-root"
        min={0}
        max={100}
        step={1}
      >
        <Slider.Control className="slider-track">
          <Slider.Indicator className="slider-indicator" />
          <Slider.Thumb className="slider-thumb" />
        </Slider.Control>
        <Slider.Value className="slider-value" />
      </Slider.Root>
    </>
  );
};

export default BaseSlider;
