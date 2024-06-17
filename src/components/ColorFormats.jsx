import React from 'react';
import Color from 'colorjs.io';
import { v4 as uuidv4 } from 'uuid';

const ColorFormats = ({ color, ...props }) => {

    const formatMapping = {
      hex: 'srgb',
      rgb: 'srgb',
      hsl: 'hsl',
      rec2020: 'rec2020',
      p3: 'p3',
      lab: 'lab',
      lch: 'lch',
      oklch: 'oklch',
      oklab: 'oklab',
    };

    const generateColorFormats = (color) => {
      const formats = ['hex', 'rgb', 'hsl', 'lab', 'rec2020', 'p3', 'lch', 'oklch', 'oklab' ];
      return formats.map((format) => {
        const formattedColor = color.to(formatMapping[format]).toString({ format });
        const inGamut = color.to(formatMapping[format]).inGamut();
        return { format, color: formattedColor, inGamut };
      });
    };


    return (
      <article>
        {generateColorFormats(new Color(color)).map(({ format, color, inGamut }) => (
          <div key={uuidv4()}>
            <dl style={{ margin: 0 }}>
                <dt style={{ fontSize: '10px', display: 'none' }}>{format.toUpperCase()}</dt>
            <dd style={{ margin: 0, fontFamily: 'monospace' }}>
                <span style={{ marginRight: '4px', borderRadius: '9999px', display: 'inline-block', height: '8px', width: '8px', backgroundColor: color, boxShadow: '0 0 0 1px currentColor' }}></span>
                {color}
                <span style={{ fontSize: '10px'}}>{inGamut ? ' ' : ' (Out of Gamut)'}</span>
            </dd>
            </dl>
          </div>
        ))}
      </article>
    );
};

export default ColorFormats;
