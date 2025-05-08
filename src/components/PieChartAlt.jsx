import React from 'react';
import Color from 'colorjs.io'; // Import Color library

// Renamed component to PieChartAlt
const PieChartAlt = ({ colorPair, borderRadius = 0 }) => {
    // Default colors if colorPair is not provided
    const defaultColors = ['#03a9f4', '#ff5722']; 
    const [primaryColor, secondaryColor] = colorPair || defaultColors;

    let p3Values = { r: 0, g: 0, b: 0 }; // Store raw 0-1 P3 values for legend
    let segmentData = [1, 1, 1]; // Default to equal segments if color conversion fails
    try {
        const p3Color = new Color(primaryColor).to('p3');
        const [rawR, rawG, rawB] = p3Color.coords;
        
        p3Values = {
            r: Math.max(0, isNaN(rawR) ? 0 : rawR),
            g: Math.max(0, isNaN(rawG) ? 0 : rawG),
            b: Math.max(0, isNaN(rawB) ? 0 : rawB)
        };

        if (p3Values.r + p3Values.g + p3Values.b > 0) {
            segmentData = [p3Values.r, p3Values.g, p3Values.b];
        } else {
            // If all channels are zero (e.g. black in P3), make segments visible with equal small parts
            segmentData = [0.1, 0.1, 0.1]; 
            // Keep p3Values as 0 for legend in this case, or decide on a representation for black
             p3Values = { r: 0, g: 0, b: 0 }; // Explicitly set for black to show 0,0,0
        }
    } catch (e) {
        console.error("Error converting color to P3 for PieChartAlt:", e);
        // p3Values remains {0,0,0}, segmentData [1,1,1]
    }

    const calculatePath = (data, index) => {
        const total = data.reduce((acc, val) => acc + val, 0);
        if (total === 0) return ""; // Avoid division by zero
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

    const cardStyle = {
        position: 'relative',
        padding: '16px', // Reduced padding to make space for legend if needed
        borderRadius: borderRadius,
        boxShadow: 'inset 0 0px 0px 1px currentColor',
        width: '100%',
        textAlign: 'center',
        backgroundColor: secondaryColor, // Use the second color of the pair for card background
        color: primaryColor,          // Use the first color of the pair for card text/primary elements
        display: 'flex',
        flexDirection: 'column', // Stack SVG and legend vertically
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px' // Space between SVG and legend
    };

    const patternFillColor = primaryColor; 

    const stripedPattern = `
        <pattern id="p3StripedPattern" patternUnits="userSpaceOnUse" width="4" height="4">
            <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" 
                  style="stroke:${patternFillColor}; stroke-width:1" />
        </pattern>
    `;

    const dotPattern = `
        <pattern id="p3DotPattern" patternUnits="userSpaceOnUse" width="4" height="4">
            <circle cx="2" cy="2" r=".75" fill="${patternFillColor}" />
        </pattern>
    `;

    const sharedDefs = stripedPattern + dotPattern;

    const legendItemStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10px',
        fontFamily: 'monospace',
        color: primaryColor
    };

    const swatchSize = 12;

    const centerTextStyle = {
        fontFamily: 'monospace',
        fontSize: '8PX', // aDJUSTED FONT SIZE FOR fg/bg LABEL TO 12PX
        fill: primaryColor, 
        textAnchor: 'middle',
        dominantBaseline: 'central'
    };

    return (
        <div style={cardStyle}>
            <svg width="192" height="192" viewBox="0 0 100 100"> {/* Reverted to larger SVG size */} 
                <defs dangerouslySetInnerHTML={{__html: sharedDefs}}></defs>
                {/* Segments for R, G, B of primaryColor in P3 */}
                <path d={calculatePath(segmentData, 0)} fill={primaryColor} /> 
                <path d={calculatePath(segmentData, 1)} fill="url(#p3StripedPattern)" />
                <path d={calculatePath(segmentData, 2)} fill="url(#p3DotPattern)" />
                <circle cx="50" cy="50" r="25" fill={secondaryColor} /> 
                <text x="50" y="50" style={centerTextStyle}>
                    BG
                </text>
            </svg>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <div style={legendItemStyle}>
                    <svg width={swatchSize} height={swatchSize}><rect width={swatchSize} height={swatchSize} fill={primaryColor}/></svg>
                    <span style={{ whiteSpace: 'nowrap' }}>R: {Math.round(p3Values.r * 255)}</span>
                </div>
                <div style={legendItemStyle}>
                    <svg width={swatchSize} height={swatchSize}><defs dangerouslySetInnerHTML={{__html: sharedDefs}}></defs><rect width={swatchSize} height={swatchSize} fill="url(#p3StripedPattern)"/></svg>
                    <span style={{ whiteSpace: 'nowrap' }}>G: {Math.round(p3Values.g * 255)}</span>
                </div>
                <div style={legendItemStyle}>
                     <svg width={swatchSize} height={swatchSize}><defs dangerouslySetInnerHTML={{__html: sharedDefs}}></defs><rect width={swatchSize} height={swatchSize} fill="url(#p3DotPattern)"/></svg>
                    <span style={{ whiteSpace: 'nowrap' }}>B: {Math.round(p3Values.b * 255)}</span>
                </div>
            </div>
        </div>
    );
};

export default PieChartAlt; // Updated export
