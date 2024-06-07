import React from 'react';

const PieChart = ({ colorPair, colorStripe, colorDot, data, borderRadius = 0 }) => {
    // Default colors and data if not provided
    const defaultColors = ['#ff5722', '#03a9f4'];
    const defaultData = [30, 40, 30]; // Default percentages for 3 segments

    // Destructuring the colorPair array, using default colors if necessary
    const [color1, color2] = colorPair || defaultColors;

    // Calculate SVG path for each segment
    const calculatePath = (data, index) => {
        const total = data.reduce((acc, val) => acc + val, 0);
        let startAngle = -90;
        for (let i = 0; i < index; i++) {
            startAngle += (data[i] / total) * 360;
        }
        const endAngle = startAngle + (data[index] / total) * 360;
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        const start = polarToCartesian(50, 50, 40, endAngle);
        const end = polarToCartesian(50, 50, 40, startAngle);

        return [
            "M", 50, 50,
            "L", start.x, start.y,
            "A", 40, 40, 0, largeArcFlag, 0, end.x, end.y,
            "Z"
        ].join(" ");
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    // Inline styles for the card and SVG patterns
    const cardStyle = {
        position: 'relative',
        padding: '32px',
        borderRadius: borderRadius,
        boxShadow: 'inset 0 0px 0px 1px currentColor',
        width: '100%',
        textAlign: 'center',
        backgroundColor: colorPair[1],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };
const patternColor = color1; // Use the second color for patterns

    // Define patterns for striped and dotted fills
    const stripedPattern2 = `
        <pattern id="stripedPattern2" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" 
                  style="stroke:${patternColor}; stroke-width:1" />
        </pattern>
    `;

    const dotPattern2 = `
        <pattern id="dotPattern2" patternUnits="userSpaceOnUse" width="4" height="4">
            <circle cx="2" cy="2" r=".75" fill="${patternColor}" />
        </pattern>
    `;

    // Use the first color for the solid fill
    const solidFill = color1;

    return (
        <div style={cardStyle}>
            <svg width="192" height="192" viewBox="0 0 100 100">
                <defs dangerouslySetInnerHTML={{__html: stripedPattern2 + dotPattern2}}></defs>
                <path d={calculatePath(data, 0)} fill={solidFill} />
                <path d={calculatePath(data, 1)} fill="url(#stripedPattern2)" />
                <path d={calculatePath(data, 2)} fill="url(#dotPattern2)" />
                <circle cx="50" cy="50" r="25" fill={color2} />
            </svg>
            <span style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>{parseInt(data).toFixed(0)}%</span>
        </div>
    );
};

export default PieChart;
