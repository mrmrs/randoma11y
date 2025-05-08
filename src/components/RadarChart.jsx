import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import Color from 'colorjs.io';

// Define a theme for the radar chart
const getRadarTheme = (foregroundColor, backgroundColor) => ({
    background: backgroundColor,
    textColor: foregroundColor,
    fontSize: 11,
    axis: {
        domain: {
            line: {
                stroke: foregroundColor,
                strokeWidth: 1,
                opacity: 1,
            },
        },
        ticks: {
            text: {
                fill: foregroundColor,
                fontSize: 10,
                opacity: 1,
            },
        },
        legend: {
            text: {
                fill: 'transparent',
                fontSize: 0,
                fontWeight: 'bold',
            },
        },
    },
    grid: {
        line: {
            stroke: foregroundColor,
            strokeWidth: 1,
            opacity: 1,
            strokeDasharray: '1 4',
        },
    },
    dots: {
        text: {
            fill: foregroundColor,
            fontSize: 10,
        },
    },
    tooltip: {
        container: {
            background: backgroundColor,
            color: foregroundColor,
            border: `1px solid ${foregroundColor}`,
            fontSize: 12,
        },
    },
    legends: {
        text: {
            fill: 'none',
        },
    },
});

const RadarChart = ({ colorPair, borderRadius = 0 }) => {
    const defaultColors = ['#000000', '#ffffff']; 
    const [fgColorStr, bgColorStr] = colorPair || defaultColors;

    let radarData = [];
    let fgColorRGB = { r: 0, g: 0, b: 0 };
    let bgColorRGB = { r: 0, g: 0, b: 0 };

    try {
        const fg = new Color(fgColorStr).to('srgb');
        const bg = new Color(bgColorStr).to('srgb');
        fgColorRGB = { r: Math.round(fg.coords[0] * 255), g: Math.round(fg.coords[1] * 255), b: Math.round(fg.coords[2] * 255) };
        bgColorRGB = { r: Math.round(bg.coords[0] * 255), g: Math.round(bg.coords[1] * 255), b: Math.round(bg.coords[2] * 255) };

        radarData = [
            { channel: 'R', FG: fgColorRGB.r, BG: bgColorRGB.r },
            { channel: 'G', FG: fgColorRGB.g, BG: bgColorRGB.g },
            { channel: 'B', FG: fgColorRGB.b, BG: bgColorRGB.b }
        ];

    } catch (e) {
        console.error("Error processing colors for RadarChart:", e);
        // Fallback data
        radarData = [
            { channel: 'R', FG: 0, BG: 255 },
            { channel: 'G', FG: 0, BG: 255 },
            { channel: 'B', FG: 0, BG: 255 }
        ];
    }

    const theme = getRadarTheme(fgColorStr, bgColorStr);

    const fgPatternId = 'radarFgPattern';
    const bgPatternId = 'radarBgPattern';

    const cardStyle = {
        width: '100%',
        height: '384px', // Match height of other chart containers
        color: fgColorStr,
        background: bgColorStr,
        borderRadius: borderRadius,
        padding: '16px',
        boxShadow: 'inset 0 0 0 1px currentColor'
    };

    return (
        <div style={cardStyle}>
            <ResponsiveRadar
                data={radarData}
                keys={['FG', 'BG']} // Corresponds to keys in radarData objects
                indexBy="channel"  // Corresponds to the property defining the axes/variables
                maxValue={255}     // Since RGB values are 0-255
                margin={{ top: 60, right: 80, bottom: 40, left: 80 }}
                theme={theme}
                curve="linearClosed"
                borderWidth={1}
                borderColor={fgColorStr} // Use FG color for border of both shapes
                gridLevels={5}
                gridShape="circular"
                gridLabelOffset={24}
                enableDots={false}
                colors={[fgColorStr, bgColorStr]} // Base colors for series (used for legends)
                fillOpacity={0.01}
                blendMode="normal"
                defs={[
                    // Pattern for FG (using fgColorStr lines)
                    {
                        id: fgPatternId,
                        type: 'patternLines',
                        background: 'transparent',
                        color: fgColorStr, // Corrected: Use FG color for lines
                        lineWidth: 2,      // Corrected: Restore line width
                        spacing: 6,
                        rotation: 45, // Angle 1
                    },
                    // Pattern for BG (also using fgColorStr lines for visibility against bg)
                    {
                        id: bgPatternId,
                        type: 'patternLines',
                        background: 'transparent',
                        color: fgColorStr, // Corrected: Use FG color for lines (to contrast with bg)
                        lineWidth: 2,      // Corrected: Restore line width
                        spacing: 6,
                        rotation: -45, // Angle 2
                    }
                ]}
                fill={[
                    // FG uses the FG pattern
                    { match: { id: 'FG' }, id: fgPatternId },
                    // BG uses the BG pattern
                    { match: { id: 'BG' }, id: bgPatternId },
                ]}
                legends={[]}
            />
        </div>
    );
};

export default RadarChart; 