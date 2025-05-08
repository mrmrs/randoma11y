import React from 'react';
import { ResponsiveRadialBar } from '@nivo/radial-bar';

// Define a theme based on colorPair (similar to HorizontalBarChart)
const getTheme = (foregroundColor, backgroundColor) => ({
  background: backgroundColor,
  textColor: foregroundColor,
  stroke: 'transparent',
  axis: {
    ticks: {
      text: {
        fill: foregroundColor,
        fontSize: 10,
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
      strokeDasharray: '1 0',
      opacity: 1,
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
          fill: foregroundColor, // Label text color (often contrasts with bar)
          fontSize: 11,
          fontWeight: 'bold',
      }
  },
  legends: {
    text: {
        fill: foregroundColor, // Legend text color
    }
  }
});

const RadialBarChart = ({ data, colorPair }) => {
  const [backgroundColor, foregroundColor] = colorPair;
  const theme = getTheme(foregroundColor, backgroundColor);

  // Basic check for data existence
  if (!data || data.length === 0) {
    return <div style={{ color: foregroundColor, background: backgroundColor, height: '384px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No data available</div>;
  }

  return (
    // Ensure the container has a defined height for ResponsiveRadialBar
    <div style={{ display: 'flex', alignItems: 'center', height: '384px', width: '100%', color: foregroundColor, background: backgroundColor }}>
      <ResponsiveRadialBar
        data={data}
        theme={theme}
        valueFormat=">-.2f"
        padding={0.4}
        cornerRadius={2}
        margin={{ top: 30, right: 30, bottom: 30, left: 30 }} // Adjusted margins for radial
        radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
        colors={[foregroundColor]} // Use foreground color for bars, or use scheme
        // colors={{ scheme: 'spectral' }} // Example: Use a color scheme if needed
        borderWidth={1}
        borderColor={backgroundColor}
        enableTracks={true} // Show background tracks
        tracksColor={backgroundColor === '#ffffff' ? '#e0e0e0' : backgroundColor} // Track color slightly different from bg
        enableLabels={true}
        labelsSkipAngle={10}
        // Label color should contrast with the bar color (foregroundColor)
        // Let's try making labels the background color for contrast
        labelsTextColor={backgroundColor}
        // labelsTextColor={{
        //     from: 'color',
        //     modifiers: [
        //         [
        //             'darker',
        //             2 // Make label darker than the bar
        //         ]
        //     ]
        // }}
        legends={[ // Optional: Add legends if needed
            // {
            //     anchor: 'right',
            //     direction: 'column',
            //     justify: false,
            //     translateX: 80,
            //     translateY: 0,
            //     itemsSpacing: 6,
            //     itemDirection: 'left-to-right',
            //     itemWidth: 100,
            //     itemHeight: 18,
            //     itemTextColor: '#999', // Adjust legend item color if needed
            //     symbolSize: 18,
            //     symbolShape: 'square',
            //     effects: [
            //         {
            //             on: 'hover',
            //             style: {
            //                 itemTextColor: foregroundColor // Legend item hover color
            //             }
            //         }
            //     ]
            // }
        ]}
        animate={true}
        motionConfig="stiff"
      />
    </div>
  );
};

export default RadialBarChart; 
