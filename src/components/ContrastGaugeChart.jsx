import React from 'react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';

// Reusable theme getter
const getTheme = (foregroundColor, backgroundColor) => ({
    background: backgroundColor,
    textColor: foregroundColor,
    labels: {
        text: { fill: foregroundColor, fontSize: 14, fontWeight: 'bold' }
    },
    tooltip: {
        container: {
            background: backgroundColor,
            color: foregroundColor,
            border: `1px solid ${foregroundColor}`,
            fontSize: 12,
        },
    },
    radialLabels: {
        text: { fill: foregroundColor, fontSize: 12 }
    },
    circularLabels: {
        text: { fill: foregroundColor, fontSize: 12 }
    }
});

const ContrastGaugeChart = ({ contrast, threshold, algorithm, colorPair }) => {
    const [backgroundColor, foregroundColor] = colorPair;
    const theme = getTheme(foregroundColor, backgroundColor);

    // Determine max value based on algorithm
    // APCA max is technically unbounded but ~108 is a practical high contrast
    // WCAG max is 21
    const maxValue = algorithm === 'WCAG21' ? 21 : 108;
    const displayContrast = Math.abs(contrast || 0); // Use absolute value

    // Data for Nivo RadialBar - we only need one bar
    const data = [
        {
            id: 'Contrast',
            data: [{ x: 'Contrast', y: displayContrast }]
        }
    ];

    // Center label text
    const centerLabel = `${displayContrast.toFixed(1)}`;
    const centerSubLabel = `/${threshold} ${algorithm === 'WCAG21' ? ' (AA/AAA)': '(APCA)'}`;

    const CenterMetric = ({ centerX, centerY }) => (
        <>
            <text
                x={centerX}
                y={centerY - 10} // Position main value slightly above center
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    fill: foregroundColor,
                }}
            >
                {centerLabel}
            </text>
            <text
                x={centerX}
                y={centerY + 10} // Position threshold info slightly below center
                textAnchor="middle"
                dominantBaseline="central"
                style={{
                    fontSize: '10px',
                    fill: foregroundColor,
                    opacity: 0.7
                }}
            >
                {centerSubLabel}
            </text>
        </>
    );


    // Handle null contrast initially
    if (contrast === null) {
        return <div style={{ height: '180px', background: backgroundColor, color: foregroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>;
    }

    return (
        <div style={{ height: '180px', width: '100%', background: backgroundColor, color: foregroundColor }}>
            <ResponsiveRadialBar
                data={data}
                theme={theme}
                valueFormat=">.1f"
                maxValue={maxValue} // Set dynamic max value
                startAngle={-120} // Adjust start/end angles for gauge look
                endAngle={120}
                innerRadius={0.65} // Make it more like a gauge
                padding={0.4}
                colors={[foregroundColor]} // Use foreground color for the bar
                cornerRadius={2}
                enableRadialGrid={false}
                enableCircularGrid={false}
                radialAxisStart={null}
                circularAxisOuter={null}
                layers={['grid', 'tracks', 'bars', 'labels', 'legends', CenterMetric]} // Add CenterMetric to layers
                tooltip={({ bar }) => (
                    <div
                         style={{
                            background: theme.tooltip.container.background,
                            color: theme.tooltip.container.color,
                            border: theme.tooltip.container.border,
                            padding: '6px 10px',
                            fontSize: '12px',
                        }}
                    >
                        <strong>Contrast: {bar.formattedValue}</strong> / {threshold} ({algorithm})
                    </div>
                )}
            />
        </div>
    );
};

export default ContrastGaugeChart; 