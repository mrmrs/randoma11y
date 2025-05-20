import React from 'react';
import { Meter } from '@base-ui-components/react/meter';

const BaseMeter = ({ colorPair, value = 50, borderRadius = 0 }) => {
  const fg = colorPair ? colorPair[1] : 'currentColor';
  const bg = colorPair ? colorPair[0] : 'transparent';
  return (
    <>
      <style>{`
        .meter-root {
          display: inline-flex;
          flex-direction: column;
          gap: 4px;
          color: ${fg};
        }
        .meter-track {
          position: relative;
          width: 128px;
          height: 8px;
          background: ${bg};
          border: 1px solid ${fg};
          border-radius: ${borderRadius};
        }
        .meter-indicator {
          display: block;
          height: 100%;
          background: ${fg};
        }
        .meter-value {
          font-size: 10px;
          font-family: monospace;
        }
      `}</style>
      <Meter.Root value={value} className="meter-root">
        <Meter.Track className="meter-track">
          <Meter.Indicator className="meter-indicator" />
        </Meter.Track>
        <Meter.Value className="meter-value" />
      </Meter.Root>
    </>
  );
};

export default BaseMeter;
