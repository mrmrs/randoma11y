import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

// Define a theme based on colorPair
const getTheme = (foregroundColor, backgroundColor) => ({
  background: backgroundColor,
  textColor: foregroundColor,
  axis: {
    domain: {
      line: {
        stroke: foregroundColor,
        strokeWidth: 1,
      },
    },
    ticks: {
      line: {
        stroke: foregroundColor,
        strokeWidth: 1,
      },
      text: {
        fill: foregroundColor,
        fontSize: 10, // Smaller font size for axes
      },
    },
    legend: {
      text: {
        fill: foregroundColor,
        fontSize: 12,
      },
    },
  },
  grid: {
    line: {
      stroke: foregroundColor,
      strokeWidth: 1,
      strokeDasharray: '2 2', // Dashed grid lines
      opacity: 0.3,
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
  labels: {
      text: {
          fill: backgroundColor, // Label text color (often contrasts with bar)
          fontSize: 10,
          fontWeight: 'bold',
      }
  }
});


const HorizontalBarChart = ({ data, colorPair }) => {
  const [backgroundColor, foregroundColor] = colorPair;
  const theme = getTheme(foregroundColor, backgroundColor);

  // Nivo needs an 'id' field for colors, we can use the label
  const coloredData = data.map(item => ({ ...item, color: foregroundColor }));

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%', paddingLeft: '0px', color: foregroundColor, background: backgroundColor }}>
    <div style={{ height: '384px', width: '100%', color: foregroundColor, background: backgroundColor }}>
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="label"
        layout="horizontal" // Set layout to horizontal
        margin={{ top: 64, right: 64, bottom: 96, left: 160 }} // Adjust margins for horizontal layout
        padding={.125}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={[foregroundColor]} // Use foreground color for bars
        // Assign color based on data id (which we set to label) or use a single color
        // colorBy="id"
        // colors={{ scheme: 'nivo' }} // Example color scheme, override with explicit color
        theme={theme}
        borderColor={{
          from: 'color',
          modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 4,
          tickPadding: 4,
          tickRotation: 0,
          legend: '', // No legend needed for simple value
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0,
        }}
        axisLeft={{ // Left axis now shows the labels
          tickSize: 0,
          tickPadding: 8,
          tickRotation: 0,
          legend: '', // No legend needed for labels
          legendPosition: 'middle',
          legendOffset: -40, // Adjust offset
          truncateTickAt: 0,
        }}
        enableGridX={true} // Enable vertical grid lines
        enableGridY={false} // Disable horizontal grid lines
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={backgroundColor} // Text color inside bars
        legends={[]}
        role="application"
        ariaLabel="Horizontal bar chart"
        barAriaLabel={e=>`${e.id}: ${e.formattedValue} in label: ${e.indexValue}`}
    //        tooltip={({ id, value, color, indexValue }) => (
    //             <div style={{ padding: '4px 12px', background: theme.tooltip.container.background, color: theme.tooltip.container.color, border: theme.tooltip.container.border }}>
    //                 <strong>{indexValue}</strong>: {value}
    //             </div>
    //         )}
      />
    </div>
    </div>
  );
};

export default HorizontalBarChart; 
