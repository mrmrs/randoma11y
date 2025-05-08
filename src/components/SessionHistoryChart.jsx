import React from 'react';
import { ResponsiveLine } from '@nivo/line';

// Reusable theme getter (could be moved to a shared file)
const getTheme = (foregroundColor, backgroundColor) => ({
    background: backgroundColor,
    textColor: foregroundColor,
    axis: {
        domain: { line: { stroke: foregroundColor, strokeWidth: 1 } },
        ticks: { line: { stroke: foregroundColor, strokeWidth: 1 }, text: { fill: foregroundColor, fontSize: 10 } },
        legend: { text: { fill: foregroundColor, fontSize: 12 } },
    },
    grid: {
        line: { stroke: foregroundColor, strokeWidth: 1, strokeDasharray: '2 2', opacity: 0.2 },
    },
    tooltip: {
        container: {
            background: backgroundColor,
            color: foregroundColor,
            border: `1px solid ${foregroundColor}`,
            fontSize: 12,
        },
    },
    crosshair: {
        line: {
            stroke: foregroundColor,
            strokeWidth: 1,
            strokeOpacity: 0.75,
            strokeDasharray: '6 6',
        },
    },
    legends: {
        text: {
            fill: foregroundColor, // Ensure legends text color matches
        }
    }
});

const SessionHistoryChart = ({ data, colorPair, yFormat = ",.0f", axisLeftLabel = 'Value' }) => {
    const [backgroundColor, foregroundColor] = colorPair;
    const theme = getTheme(foregroundColor, backgroundColor);

    // Ensure data is not empty or invalid before rendering
    if (!data || data.length === 0 || !data[0].data || data[0].data.length === 0) {
        return <div style={{ height: '200px', background: backgroundColor, color: foregroundColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No data yet...</div>;
    }

    return (
        <div style={{ height: '200px', width: '100%', background: backgroundColor, color: foregroundColor }}>
            <ResponsiveLine
                data={data}
                theme={theme}
                colors={[foregroundColor]} // Use foreground color for the line
                margin={{ top: 20, right: 30, bottom: 50, left: 60 }}
                xScale={{ type: 'linear' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: false,
                    reverse: false
                }}
                yFormat={`>~${yFormat}`}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Generation #',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    format: ',.0f' // Format x-axis ticks as integers
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: axisLeftLabel,
                    legendOffset: -45,
                    legendPosition: 'middle',
                    format: yFormat // Use the provided y-format
                }}
                pointSize={6} // Slightly larger points
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                enableGridX={false}
                enableGridY={true}
                legends={[]}
                tooltip={({ point }) => (
                    <div
                        style={{
                            background: theme.tooltip.container.background,
                            color: theme.tooltip.container.color,
                            border: theme.tooltip.container.border,
                            padding: '6px 10px',
                            fontSize: '12px',
                        }}
                    >
                        <strong>{axisLeftLabel}: {point.data.yFormatted}</strong> (Gen: {point.data.xFormatted})
                    </div>
                )}
            />
        </div>
    );
}

export default SessionHistoryChart; 