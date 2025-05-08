import React, { useState, useEffect } from 'react';
import Color from 'colorjs.io';
import { HexColorPicker } from 'react-colorful';
import { v4 as uuidv4 } from 'uuid';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Select from '@radix-ui/react-select';
import BarChart from './components/BarChart.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import Card from './components/Card.jsx'
import RadialBarChart from './components/RadialBarChart.jsx'
import StatusDot from './components/StatusDot.jsx'
import StatusDotOutline from './components/StatusDotOutline.jsx'
import Avatar from './components/Avatar.jsx'
import AvatarOutline from './components/AvatarOutline.jsx'
import Badge from './components/Badge.jsx'
import BadgeOutline from './components/BadgeOutline.jsx'
import InputCheckbox from './components/Checkbox.jsx'
import PieChart from './components/PieChart.jsx'
import PieChartAlt from './components/PieChartAlt.jsx'
import TextBox from './components/TextBox.jsx'
import Logo from './components/Logo.jsx'
import InputRadioGroup from './components/InputRadioGroup.jsx'
import Footer from './components/Footer.jsx'
import BackgroundStripes from './components/BackgroundStripes.jsx'
import ColorFormats from './components/ColorFormats.jsx'
import OpacityScale from './components/OpacityScale.jsx'
import GradientPanel from './components/GradientPanel.jsx'
import curatedPalettes from './data/curatedPalettes.js'
import CopyCodeSnippet from './components/CopyCodeSnippet.jsx';
import PatternDisplay from './components/PatternDisplay.jsx';
import HorizontalBarChart from './components/HorizontalBarChart.jsx';
import RadarChart from './components/RadarChart.jsx';

const App = () => {
  const [count, setCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [colorHistory, setColorHistory] = useState([]);
  const [contrastHistoryData, setContrastHistoryData] = useState([{ id: 'contrast', data: [] }]);
  const [iterationHistoryData, setIterationHistoryData] = useState([{ id: 'iterations', data: [] }]);
  const [borderRadius, setBorderRadius] = useState('0px');
  const [colorSpace, setColorSpace] = useState('p3');
  const [inputFormat, setInputFormat] = useState('p3');
  const [pinnedColor, setPinnedColor] = useState('');
  const [threshold, setThreshold] = useState(60);
  const [contrastAlgorithm, setContrastAlgorithm] = useState('APCA');
  const [colorPair, setColorPair] = useState(['#000000', '#FFFFFF']); // Default for initial render to prevent FOUC
  const [contrast, setContrast] = useState(null);
  const [iterations, setIterations] = useState(0);
  const [pieChartData, setPieChartData] = useState([15,Math.floor(Math.random() * 100),55])
  const [monthBarChartData, setMonthBarChartData] = useState([
    { label: 'Jan', value: 8 },
    { label: 'Feb', value: Math.floor(Math.random() * 100) },
    { label: 'Mar', value: Math.floor(Math.random() * 100) },
    { label: 'Apr', value: Math.floor(Math.random() * 100) },
    { label: 'May', value: Math.floor(Math.random() * 100) },
    { label: 'Jun', value: Math.floor(Math.random() * 100) },
    { label: 'Jul', value: Math.floor(Math.random() * 100) },
    { label: 'Aug', value: Math.floor(Math.random() * 100) },
    { label: 'Sep', value: Math.floor(Math.random() * 100) },
    { label: 'Oct', value: Math.floor(Math.random() * 100) },
    { label: 'Nov', value: Math.floor(Math.random() * 100) },
    { label: 'Dec', value: Math.floor(Math.random() * 100) },
  ]
  )

  // Function to generate radial chart data from the foreground color string
  const generateRadialDataFromForegroundColor = (colorString) => {
    try {
      const colorObj = new Color(colorString).to('srgb'); // Convert to sRGB for consistent channel access
      const [r, g, b] = colorObj.coords;
      const alpha = colorObj.alpha; // Alpha is usually 0-1

      return [
        { id: 'Red',   data: [{ x: 'Channel Value', y: Math.round(r * 255) }] },
        { id: 'Green', data: [{ x: 'Channel Value', y: Math.round(g * 255) }] },
        { id: 'Blue',  data: [{ x: 'Channel Value', y: Math.round(b * 255) }] },
        { id: 'Alpha', data: [{ x: 'Channel Value', y: Math.round((alpha === undefined ? 1 : alpha) * 100) }] } // Representing alpha as 0-100
      ];
    } catch (error) {
      console.error(`Error processing color for radial chart: ${colorString}`, error);
      // Return fallback data to prevent chart errors
      return [
        { id: 'Red',   data: [{ x: 'Channel Value', y: 0 }] },
        { id: 'Green', data: [{ x: 'Channel Value', y: 0 }] },
        { id: 'Blue',  data: [{ x: 'Channel Value', y: 0 }] },
        { id: 'Alpha', data: [{ x: 'Channel Value', y: 100 }] }
      ];
    }
  };

  // Function to generate horizontal bar chart data based on contrast scores
  const generateContrastScoresChartData = (pair) => {
    try {
      const fgColor = pair[0];
      const bgColor = pair[1];
      const white = '#FFFFFF';
      const black = '#000000';

      const formatVal = (val) => parseFloat(val.toFixed(1));
      const formatAbsVal = (val) => parseFloat(Math.abs(val).toFixed(1));

      return [
        { label: "FG / White (WCAG)", value: formatVal(Color.contrast(fgColor, white, 'WCAG21')) },
        { label: "FG / Black (WCAG)", value: formatVal(Color.contrast(fgColor, black, 'WCAG21')) },
        { label: "BG / White (WCAG)", value: formatVal(Color.contrast(bgColor, white, 'WCAG21')) },
        { label: "BG / Black (WCAG)", value: formatVal(Color.contrast(bgColor, black, 'WCAG21')) },
        { label: "FG / BG (WCAG)",        value: formatVal(Color.contrast(fgColor, bgColor, 'WCAG21')) },
        
        { label: "FG / White (APCA)", value: formatAbsVal(Color.contrast(fgColor, white, 'APCA')) },
        { label: "FG / Black (APCA)", value: formatAbsVal(Color.contrast(fgColor, black, 'APCA')) },
        { label: "BG / White (APCA)", value: formatAbsVal(Color.contrast(bgColor, white, 'APCA')) },
        { label: "BG / Black (APCA)", value: formatAbsVal(Color.contrast(bgColor, black, 'APCA')) },
        { label: "FG / BG (APCA)",        value: formatAbsVal(Color.contrast(fgColor, bgColor, 'APCA')) },
        { label: "BG / FG (APCA)",        value: formatAbsVal(Color.contrast(bgColor, fgColor, 'APCA')) },
      ];
    } catch (error) {
      console.error('Error processing color pair for contrast scores chart:', error);
      // Return fallback data
      const defaultData = Array(10).fill({ label: "Error", value: 0 });
      defaultData[0].label = "FgW (WCAG) Err";
      defaultData[1].label = "FgB (WCAG) Err";
      // ... you can add more specific error labels if desired
      return defaultData;
    }
  };

  // Function to generate vertical bar chart data based on color distance (DeltaE 2000) for BOTH FG and BG
  const generateColorDistanceData = (pair) => {
    try {
      const fgColor = new Color(pair[0]);
      const bgColor = new Color(pair[1]);
      
      const refs = {
        Black: new Color('black'),
        White: new Color('white'),
        Gray:  new Color('gray'),
        Red:   new Color('red'),
        Green: new Color('lime'), // Using 'lime' for pure G
        Blue:  new Color('blue')
      };

      const formatVal = (val) => parseFloat(val.toFixed(1));
      
      const distanceData = [];

      Object.entries(refs).forEach(([name, refColor]) => {
        // Calculate and add FG distance
        distanceData.push({
          label: `FG ΔE vs ${name}`,
          value: formatVal(fgColor.deltaE(refColor, { method: '2000' }))
        });
        // Calculate and add BG distance
        distanceData.push({
          label: `BG ΔE vs ${name}`,
          value: formatVal(bgColor.deltaE(refColor, { method: '2000' }))
        });
      });

      return distanceData; // Should contain 12 items

    } catch (error) {
      console.error('Error processing color pair for distance chart:', error);
      // Return fallback data for 12 bars
      const defaultLabels = ["FG vs Blk", "BG vs Blk", "FG vs Wht", "BG vs Wht", "FG vs Gry", "BG vs Gry", "FG vs Red", "BG vs Red", "FG vs Grn", "BG vs Grn", "FG vs Blu", "BG vs Blu"];
      return defaultLabels.map(label => ({ label: `${label} Err`, value: 0 }));
    }
  };

  // Initialize radialChartData based on the default foreground color
  const [radialChartData, setRadialChartData] = useState(() => 
    generateRadialDataFromForegroundColor(colorPair[0])
  );

  // Initialize contrastScoresChartData based on the default colorPair
  const [contrastScoresChartData, setContrastScoresChartData] = useState(() =>
    generateContrastScoresChartData(colorPair)
  );

  // Initialize colorDistanceData based on the default colorPair
  const [colorDistanceData, setColorDistanceData] = useState(() =>
    generateColorDistanceData(colorPair)
  );

    const durableObjectName = 'RANDOMA11Y';

    const fetchCount = async () => {
        try {
            const response = await fetch(`https://ts-gen-count.adam-f8f.workers.dev/?name=${durableObjectName}`);
            const data = await response.text();
            setCount(data);
        } catch (error) {
            console.error('Error fetching count:', error);
        }
    };

    const handleIncrement = async () => {
        try {
            await fetch(`https://ts-gen-count.adam-f8f.workers.dev/increment?name=${durableObjectName}`, {
                method: 'POST',
            });
            fetchCount(); // Update count after increment
        } catch (error) {
            console.error('Error incrementing count:', error);
        }
    };

    // Initialize with a random curated palette
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * curatedPalettes.length);
        const initialPalette = curatedPalettes[randomIndex];
        setColorPair(initialPalette);
        setRadialChartData(generateRadialDataFromForegroundColor(initialPalette[0]));
        setContrastScoresChartData(generateContrastScoresChartData(initialPalette));
        // Update color distance data when initial palette is set
        setColorDistanceData(generateColorDistanceData(initialPalette));

        try {
            const calculatedContrast = Color.contrast(initialPalette[0], initialPalette[1], contrastAlgorithm);
            setContrast(calculatedContrast);
            // Initialize history with the first data point
            setContrastHistoryData([{ id: 'contrast', data: [{ x: 0, y: Math.abs(calculatedContrast) }] }]);
            setIterationHistoryData([{ id: 'iterations', data: [{ x: 0, y: 1 }] }]); // Assume 1 iteration for initial
        } catch (error) {
            console.error('Error calculating contrast for initial palette:', error);
            // Set default history if contrast fails
            setContrastHistoryData([{ id: 'contrast', data: [] }]);
            setIterationHistoryData([{ id: 'iterations', data: [] }]);
        }

        setColorHistory([{ id: uuidv4(), colors: initialPalette }]);
        fetchCount();
        setSessionCount(1); // Start session count at 1
    }, []);

    useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'ArrowRight') {
            handleGenerateColorPair();
          }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [pinnedColor, inputFormat, threshold, contrastAlgorithm]); // Dependencies


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

const generateRandomColor = (format) => {
  const space = formatMapping[format];
  switch (format) {
    case 'hex':
       const hexChars = '0123456789abcdef';
          let hexColor = '#';
          for (let i = 0; i < 6; i++) {
            hexColor += hexChars[Math.floor(Math.random() * 16)];
          }
      return new Color(hexColor);
    case 'rgb':
      return new Color(space, [Math.random(), Math.random(), Math.random()]).toString({ format });
    case 'hsl':
      return new Color(space, [Math.random() * 360, Math.random() * 100, Math.random() * 100]).toString({ format });
    case 'lab':
      return new Color(space, [Math.random() * 100, Math.random() * 256 - 128, Math.random() * 256 - 128]).toString({ format });
    case 'rec2020':
    case 'p3':
      return new Color(space, [Math.random(), Math.random(), Math.random()]).toString({ format });
    case 'lch':
      return new Color(space, [Math.random() * 100, Math.random() * 150, Math.random() * 360]).toString({ format });
          case 'oklab':
      return new Color(space, [Math.random(), Math.random() * 0.8 - 0.4, Math.random() * 0.8 - 0.4]).toString({ format });
    case 'oklch':
      return new Color(space, [Math.random(), Math.random() * 0.4, Math.random() * 360]).toString({ format });
    default:
      return new Color(space, [Math.random(), Math.random(), Math.random()]).toString({ format: 'hex' });
  }
};

  const generateAccessibleColorPair = (pinnedColor, inputFormat, threshold, algorithm) => {
    const maxIterations = 20000;
    let iterations = 0;
    let color1, color2;

    // Use the pinned color if provided, otherwise generate a random color
    color1 = pinnedColor ? new Color(pinnedColor) : new Color(generateRandomColor(inputFormat));

    while (iterations < maxIterations) {
      // Generate the second color randomly
      color2 = new Color(generateRandomColor(inputFormat));

      // Calculate the contrast between the two colors
      const contrast = color1.contrast(color2, algorithm);

      // Check if the contrast meets the threshold based on the algorithm
      if (
        (algorithm === 'WCAG21' && contrast >= threshold) ||
        (algorithm === 'APCA' && (contrast >= threshold || contrast <= -threshold))
      ) {
        // Return the accessible color pair, contrast, and iterations
        return {
          colorPair: [color1.toString({ format: inputFormat }), color2.toString({ format: inputFormat })],
          contrast,
          iterations,
        };
      }

      iterations++;
    }

    // If no accessible color pair is found after the maximum iterations,
    // return the color pair with black or white, whichever has higher contrast
    const blackContrast = color1.contrast(new Color('black'), algorithm);
    const whiteContrast = color1.contrast(new Color('white'), algorithm);

    if (blackContrast >= whiteContrast) {
      return {
        colorPair: [color1.toString({ format: inputFormat }), 'black'],
        contrast: blackContrast,
        iterations,
      };
    } else {
      return {
        colorPair: [color1.toString({ format: inputFormat }), 'white'],
        contrast: whiteContrast,
        iterations,
      };
    }
  };

 const handleGenerateColorPair = () => {
    const { colorPair: newColorPair, contrast: newContrast, iterations: newIterations } = generateAccessibleColorPair(pinnedColor, inputFormat, threshold, contrastAlgorithm);
    setColorPair(newColorPair);
    setRadialChartData(generateRadialDataFromForegroundColor(newColorPair[0]));
    setContrastScoresChartData(generateContrastScoresChartData(newColorPair));
    // Update color distance data when new color pair is generated
    setColorDistanceData(generateColorDistanceData(newColorPair));
    setContrast(newContrast);
    setIterations(newIterations);
    handleIncrement();

    // Update history state
    setSessionCount(prev => {
      const nextSessionCount = prev + 1;
      setContrastHistoryData(prevData => [
        {
          ...prevData[0],
          data: [...prevData[0].data.slice(-99), { x: nextSessionCount, y: Math.abs(newContrast) }] // Keep last 100 points
        }
      ]);
      setIterationHistoryData(prevData => [
        {
          ...prevData[0],
          data: [...prevData[0].data.slice(-99), { x: nextSessionCount, y: newIterations + 1 }] // Keep last 100 points
        }
      ]);
      return nextSessionCount;
    });

    setColorHistory(prev => [...prev.slice(-511), { id: uuidv4(), colors: newColorPair }]); // Keep only the last 512 entries
  };

  // Function to restore color from history
  const restoreColorPair = (colors) => {
    setColorPair(colors);
    setRadialChartData(generateRadialDataFromForegroundColor(colors[0]));
    setContrastScoresChartData(generateContrastScoresChartData(colors));
    // Update color distance data when color pair is restored
    setColorDistanceData(generateColorDistanceData(colors));
    setContrast(Color.contrast(colors[0], colors[1], contrastAlgorithm)); // Recalculate contrast for these colors
  };

  const handleThresholdChange = (value) => {
    setThreshold(parseFloat(value));
  };

  const handleBorderRadiusChange = (value) => {
    setBorderRadius(value);
  };

  // Swap the foreground/background colours without adding to history
  const swapColorPair = () => {
    setColorPair(prevPair => {
      const newPair = [prevPair[1], prevPair[0]];

      // Update all dependent data based on the new foreground (now index 0)
      setRadialChartData(generateRadialDataFromForegroundColor(newPair[0]));
      setContrastScoresChartData(generateContrastScoresChartData(newPair));
      setColorDistanceData(generateColorDistanceData(newPair));
      // Re-calculate contrast for progress bar & stats
      setContrast(Color.contrast(newPair[0], newPair[1], contrastAlgorithm));

      return newPair;
    });
  };

 const handleSetPinnedColor = (color) => {
    setPinnedColor(color);
  };

  // Calculate progress for the progress bar
  const maxContrast = contrastAlgorithm === 'WCAG21' ? 21 : 106; // Using 106 as practical max Lc magnitude
  const currentAbsoluteContrast = Math.abs(contrast || 0);
  const progressPercent = Math.min(100, (currentAbsoluteContrast / maxContrast) * 100);

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: colorPair[0], color: colorPair[1], position: 'relative', transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out' }}>
      <header style={{  zIndex: 999, backgroundColor: colorPair[0], color: colorPair[1], position: 'sticky', top: 0, paddingRight: '8px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'currentColor', display: 'flex', alignItems: 'center' , gap: '8px', transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out, border-bottom-color 0.3s ease-in-out' }}>
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid', transition: 'border-right-color 0.3s ease-in-out' }}>
          <Logo colorPair={colorPair} size={20} onClick={swapColorPair} />
          <b className='dn db-m' style={{ fontSize: '12px', letterSpacing: '-0.05em', fontWeight: 900 }}>RandomA11y</b>
        </div>
        <section style={{ width: '100%', marginRight: '8px', borderRight: '1px solid currentColor', display: 'flex', alignItems: 'flex-start', gap: '32px', padding: '8px', overflow: 'scroll', flexWrap: 'none', whiteSpace: 'nowrap', zIndex: 2000 }}>
          <label style={{  fontSize: '12px', lineHeight: 1, margin: 0, padding: 0, zIndex: 2000 }}>
            <span style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '6px', display: 'block',  }}>Format</span>
            <Select.Root value={inputFormat} onValueChange={setInputFormat} style={{ fontSize: '12px', }}>
              <Select.Trigger style={{ fontSize: '12px', all: 'unset', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px', gap: '6px', backgroundColor: 'transparent',color: 'currentColor', border: '1px solid currentColor', borderRadius: 0 }}>
                <Select.Value />
                <Select.Icon />
              </Select.Trigger>
              <Select.Portal style={{ zIndex: 2000, background: 'red', cursor: 'pointer', }}>
                <Select.Content style={{ background: colorPair[1], color: colorPair[0] }}>
                  <Select.ScrollUpButton />
                  <Select.Viewport style={{ background: colorPair[0], color: colorPair[1], border: '1px solid currentColor' }}>
                    <Select.Group style={{ fontSize: '12px', }}>
                      <Select.Item style={{ padding: '8px' }} value="hex"><Select.ItemText>HEX</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="p3"><Select.ItemText>Display-P3</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="rgb"><Select.ItemText>RGB</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="hsl"><Select.ItemText>HSL</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="lab"><Select.ItemText>LAB</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="oklab"><Select.ItemText>OKLAB</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="rec2020"><Select.ItemText>REC.2020</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="lch"><Select.ItemText>LCH</Select.ItemText></Select.Item>
                      <Select.Item style={{ padding: '8px' }} value="oklch"><Select.ItemText>OKLCH</Select.ItemText></Select.Item>
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </label>
          <fieldset style={{ border: 0, padding: 0, fontSize: '12px', fontWeight: 'bold', display: 'block', marginBottom: '6px' }}><legend style={{ marginBottom: '8px'}}>Algorithm</legend>
            <RadioGroup.Root value={contrastAlgorithm} onValueChange={(value) => {
              setContrastAlgorithm(value);
              handleThresholdChange(value === 'WCAG21' ? 4.5 : 60);
            }}
             style={{ display: 'flex', alignItems: 'center', }}
          >
          <label style={{ gap: '4px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', marginRight: '12px', fontWeight: 400 }}>
              <RadioGroup.Item value="WCAG21" id="wcag21" style={{ display: 'block', padding: 0, height: '10px', width: '10px', border: 0, background: 'transparent', boxShadow: 'inset 0 0 0 1px currentColor', color: colorPair[1] }}>

                  <RadioGroup.Indicator style={{ width: '100%', height: '100%', display: 'block',  background: colorPair[1] }} />
              </RadioGroup.Item>
          WCAG 2.1
            </label>
          <label style={{ gap: '4px', fontWeight: 400, fontSize: '12px', display: 'inline-flex', alignItems: 'center', }}>
          <RadioGroup.Item value="APCA" id="apca"
style={{height: '10px', width: '10px', border: 0, display: 'block', padding: 0, boxShadow: 'inset 0 0 0 1px currentColor', color:colorPair[1], background: 'transparent' }}>
              <RadioGroup.Indicator style={{ height: '100%', width: '100%', display: 'block', background: colorPair[1], }} />
          </RadioGroup.Item>
              APCA
            </label>
          </RadioGroup.Root>
        </fieldset>

        <fieldset style={{ width: '128px', border: 0, padding: 0, fontSize: '12px', fontWeight: 'bold', display: 'block', }}><legend style={{ marginBottom: '8px'}}>Threshold</legend>

            {contrastAlgorithm === 'WCAG21' && (
    <RadioGroup.Root value={threshold} onValueChange={(value) => handleThresholdChange(parseFloat(value))}>
              <div style={{display: 'flex', gap: '8px'}}>
        <label style={{ gap: '4px', fontWeight: 400, fontSize: '12px', display: 'inline-flex', alignItems: 'center', }}>
        <RadioGroup.Item value={3} id="3"
style={{height: '10px', width: '10px', border: 0, display: 'block', padding: 0, boxShadow: 'inset 0 0 0 1px currentColor', color: colorPair[1], background: 'transparent' }}>
              <RadioGroup.Indicator style={{ height: '100%', width: '100%', display: 'block', background: colorPair[1] }} />
          </RadioGroup.Item>
            3
              </label>
    <label style={{ gap: '4px', fontWeight: 400, fontSize: '12px', display: 'inline-flex', alignItems: 'center', }}>
        <RadioGroup.Item value={4.5} id="4.5"
style={{height: '10px', width: '10px', border: 0, display: 'block', padding: 0, boxShadow: 'inset 0 0 0 1px currentColor', color: colorPair[1], background: 'transparent' }}>
              <RadioGroup.Indicator style={{ height: '100%', width: '100%', display: 'block', background: colorPair[1]}} />
          </RadioGroup.Item>
            4.5
              </label>
    <label style={{ gap: '4px', fontWeight: 400, fontSize: '12px', display: 'inline-flex', alignItems: 'center', }}>
        <RadioGroup.Item value={7} id="7"
style={{height: '10px', width: '10px', border: 0, display: 'block', padding: 0, boxShadow: 'inset 0 0 0 1px currentColor', color:colorPair[1], background: 'transparent' }}>
              <RadioGroup.Indicator style={{ height: '100%', width: '100%', display: 'block', background: colorPair[1] }} />
          </RadioGroup.Item>
            <span style={{ width: '2ch', display: 'inline-block'}}>7</span>
              </label>
            </div>
            </RadioGroup.Root>
          )}
          {contrastAlgorithm === 'APCA' && (
            <RadioGroup.Root value={threshold} onValueChange={(value) => handleThresholdChange(parseFloat(value))}>
            <div style={{display: 'flex', gap: '8px'}}>
      <label style={{ gap: '4px', fontWeight: 400, fontSize: '12px', display: 'inline-flex', alignItems: 'center', }}>
      <RadioGroup.Item value={45} id="45"
style={{height: '10px', width: '10px', border: 0, display: 'block', padding: 0, boxShadow: 'inset 0 0 0 1px currentColor', color: colorPair[1], background: 'transparent' }}>
              <RadioGroup.Indicator style={{ height: '100%', width: '100%', display: 'block', background: colorPair[1]}} />
          </RadioGroup.Item>
                45
              </label>
    <label style={{ gap: '4px', fontWeight: 400, fontSize: '12px', display: 'inline-flex', alignItems: 'center', }}>
      <RadioGroup.Item value={60} id="60"
style={{height: '10px', width: '10px', border: 0, display: 'block', padding: 0, boxShadow: 'inset 0 0 0 1px currentColor', color: colorPair[1], background: 'transparent' }}>
              <RadioGroup.Indicator style={{ height: '100%', width: '100%', display: 'block', background: colorPair[1] }} />
          </RadioGroup.Item>
                60
              </label>
    <label style={{ gap: '4px', fontWeight: 400, fontSize: '12px', display: 'inline-flex', alignItems: 'center', }}>
      <RadioGroup.Item value={75} id="75"
style={{height: '10px', width: '10px', border: 0, display: 'block', padding: 0, boxShadow: 'inset 0 0 0 1px currentColor', color: colorPair[1], background: 'transparent' }}>
              <RadioGroup.Indicator style={{ height: '100%', width: '100%', display: 'block', background: colorPair[1]}} />
          </RadioGroup.Item>
                75
              </label>
            </div>
            </RadioGroup.Root>
          )}
        </fieldset>
        <div style={{ display: 'none' }}>
          <label style={{ fontWeight: 'bold', fontSize: '12px', display: 'block', marginBottom: '2px' }}>Border Radius</label>
            <div style={{ display: 'flex', gap: '4px'}}>
              <label style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center'}}>
                <input
                  type="radio"
                  value={'0px'}
                  checked={borderRadius === '0px'}
                  onChange={(e) => handleBorderRadiusChange(e.target.value)}
                />
                0
              </label>
              <label style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center'}}>
                <input
                  type="radio"
                  value={'6px'}
                  checked={borderRadius === '6px'}
                  onChange={(e) => handleBorderRadiusChange(e.target.value)}
                />
                6px
              </label>
              <label style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center'}}>
                <input
                  type="radio"
                  value={'16px'}
                  checked={borderRadius === '16px'}
                  onChange={(e) => handleBorderRadiusChange(e.target.value)}
                />
                16px
              </label>
              <label style={{ fontSize: '12px', display: 'inline-flex', alignItems: 'center'}}>
                <input
                  type="radio"
                  value={'32px'}
                  checked={borderRadius === '32px'}
                  onChange={(e) => handleBorderRadiusChange(e.target.value)}
                />
                32px
              </label>
            </div>
        </div>
        <div>
          <label style={{ position: 'relative', top: '-2px' }}>
        <span style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '4px', }}>Pinned color</span>

            <input
              type="text"
              value={pinnedColor}
              onChange={(e) => setPinnedColor(e.target.value)}
              style={{ appearance: 'none', WebkitAppearance: 'none', borderWidth: '1px', borderStyle: 'solid', borderColor: colorPair[1], color: colorPair[1], backgroundColor: 'transparent', padding: '4px', fontSize: '12px', width: '100%'  }}
            />
          </label>
        </div>
        </section>


        <button style={{
            marginLeft: 'auto',
            appearance: 'none',
            WebkitAppearance: 'none',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'currentColor',
            background: colorPair[1],
            color: colorPair[0],
            padding: '8px 16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',

        }} onClick={handleGenerateColorPair}>Generate <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> </button>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '32px'}}>
        {colorHistory.map(entry => (
          <button key={entry.id} title={colorPair[0] + ' / ' + colorPair[1] } style={{ cursor: 'pointer', fontWeight: 'bold', border: 0, appearance: 'none', WebkitAppearance: 'none', backgroundColor: entry.colors[0], color: entry.colors[1], aspectRatio: 1, padding: '0px', width: 'auto', height: '32px', fontSize: '10px'  }} onClick={() => restoreColorPair(entry.colors)}>
            A
          </button>
        ))}
      </div>
      <div style={{ maxWidth: '100%', padding: '16px', overflow: 'hidden' }}>
          <div style={{ marginBottom: '8px', maxWidth: '100%', display: 'grid', gap: '8px', gridTemplateColumns: '1fr 1fr' }}>

        <button title="Pin - Find matches for this color" className='f0 f3-m f5-l' style={{ fontWeight: 400, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none', fontFamily: 'monospace', padding: '16px 8px', margin: 0, border: 0, background: colorPair[1], color: colorPair[0], }} onClick={() => handleSetPinnedColor(colorPair[0])}>{colorPair[0]}</button>


      <button title="Pin - Find matches for this color" className='f0 f3-m f5-l' style={{ fontWeight: 400, cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none', fontFamily: 'monospace', padding: '16px 8px', margin: 0, border: 0, boxShadow: 'inset 0 0 0 1px currentColor', background: 'transparent', color: colorPair[1], }} onClick={() => handleSetPinnedColor(colorPair[1])}>{colorPair[1]}</button>

          </div>
      


          <div style={{ maxWidth: '100%', display: 'grid', gap: '8px', gridTemplateColumns: '1fr' }}>
        <div style={{display: 'flex', gap: '8px', alignItems: 'center'}}>
            <StatusDot colorPair={colorPair} borderRadius={borderRadius} />
            <StatusDotOutline colorPair={colorPair} borderRadius={borderRadius} />
            <Badge borderRadius={borderRadius} colorPair={colorPair}>Badge</Badge>
            <BadgeOutline borderRadius={borderRadius} colorPair={colorPair}>Badge Outline</BadgeOutline>
         
            <InputCheckbox label='Checkbox Label' colorPair={colorPair}/>
            <InputRadioGroup colorPair={colorPair}/>

        <hr style={{ backgroundColor: colorPair[0], borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: colorPair[1], borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',  width: '100%' }}/>
        <Avatar borderRadius={'9999px'} colorPair={colorPair}>AE</Avatar>
        <AvatarOutline borderRadius={'9999px'} colorPair={colorPair}>AE</AvatarOutline>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '8px'}}>
            <BarChart colorPair={colorPair} data={colorDistanceData} borderRadius={borderRadius} />
            <CopyCodeSnippet colorPair={colorPair} />
            <PieChart colorPair={[colorPair[0],colorPair[1]]} borderRadius={borderRadius} />
            <article style={{ boxShadow: 'inset 0 0 0 1px currentColor', background: colorPair[0], color: colorPair[1],  padding: '16px', borderRadius: borderRadius }}>
              <div style={{ width: '100%', height: '384px' }}>
                  <RadialBarChart data={radialChartData} colorPair={colorPair} /> 
              </div>
            </article>
        </div>

            <ProgressBar 
              colorPair={colorPair} 
              progress={progressPercent} 
              borderRadius={borderRadius} 
            />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: '8px' }}>
           <RadarChart colorPair={colorPair} borderRadius={borderRadius} />
           <div style={{ background: colorPair[1], color: colorPair[0] }}><CopyCodeSnippet colorPair={colorPair} /></div>
             <PieChartAlt colorPair={[colorPair[1],colorPair[0]]} data={pieChartData} borderRadius={borderRadius} />
             <div>
               <HorizontalBarChart colorPair={[colorPair[1], colorPair[0]]} data={contrastScoresChartData} />
             </div>
        </div>
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <TextBox time='15 July 2024' title='A sample example title' subtitle='A subtitle for the card' colorPair={colorPair} />
          <TextBox time='27 May 2024' title='A sample example title' subtitle='Another subtitle example' colorPair={[colorPair[1], colorPair[0]]} />
    </section>

      </div>
    <section style={{ display: 'grid', maxWidth: '100%', gap: '8px', gridTemplateColumns: 'repeat(auto-fill, minmax(min(128px, 100%), 1fr))', marginTop: '8px' }}>
      <BackgroundStripes degree={0} />
      <BackgroundStripes degree={45} />
      <BackgroundStripes degree={90} />
      <BackgroundStripes degree={135} />

    <style>
    {`
      :root {
        --aspectRatio: 16/4;
        --minHeight: 64px;
      }
    `}
    </style>
      <PatternDisplay background="repeating-radial-gradient(circle at 100%, currentColor, currentColor 1px, transparent 1px, transparent 2px)" />

      <PatternDisplay background="linear-gradient(45deg, currentColor 1px, transparent 1px), linear-gradient(-45deg, currentColor 1px, transparent 1px)" additionalStyles={{ backgroundSize: '10px 10px' }} />
      <PatternDisplay className="halftone" />
      <PatternDisplay className="halftone-angle" />

      <PatternDisplay background="radial-gradient(currentColor 3px, transparent 4px), radial-gradient(currentColor 3px, transparent 4px)" additionalStyles={{ backgroundSize: '32px 32px', backgroundPosition: '0 0, 16px 16px' }} />

      <PatternDisplay background="linear-gradient(0deg, currentColor 50%, transparent 50%)" />
      <PatternDisplay background="linear-gradient(180deg, currentColor 50%, transparent 50%)" />
      <PatternDisplay background="linear-gradient(90deg, currentColor 50%, transparent 50%)" />
      <PatternDisplay background="linear-gradient(270deg, currentColor 50%, transparent 50%)" />
      <PatternDisplay background="linear-gradient(135deg, currentColor 50%, transparent 50%)" />
      <PatternDisplay background="linear-gradient(-135deg, currentColor 50%, transparent 50%)" />
      <PatternDisplay background="radial-gradient(circle, currentColor 20%, transparent 20%)" />
      <PatternDisplay background="radial-gradient(circle, currentColor 50%, transparent 50%)" />
      <PatternDisplay background="radial-gradient(circle, transparent 10%, currentColor 10%)" />
      <PatternDisplay background="radial-gradient(circle, transparent 60%, currentColor 60%)" />


      <PatternDisplay background="linear-gradient(135deg, currentColor 25%, transparent 25%) -10px 0, linear-gradient(225deg, currentColor 25%, transparent 25%) -10px 0, linear-gradient(315deg, currentColor 25%, transparent 25%), linear-gradient(45deg, currentColor 25%, transparent 25%)" additionalStyles={{ backgroundSize: '24px 24px' }} />

      <PatternDisplay background="linear-gradient(135deg, currentColor 25%, transparent 25%) -10px 0, linear-gradient(225deg, currentColor 25%, transparent 25%) -10px 0, linear-gradient(315deg, currentColor 25%, transparent 25%), linear-gradient(45deg, currentColor 25%, transparent 25%)" additionalStyles={{ backgroundSize: '16px 8px' }} />




      <PatternDisplay background="linear-gradient(45deg, currentColor 12%, transparent 0, transparent 88%, currentColor 0), linear-gradient(135deg, transparent 37%, currentColor 0, currentColor 63%, transparent 0), linear-gradient(45deg, transparent 37%, currentColor 0, currentColor 63%, transparent 0)" additionalStyles={{ backgroundSize: '24px 24px' }} />
      <PatternDisplay background="linear-gradient(45deg, currentColor 25%, transparent 25%), linear-gradient(-45deg, currentColor 25%, transparent 25%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(-45deg, transparent 75%, currentColor 75%)" additionalStyles={{ backgroundSize: '20px 20px', backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px' }} />

      <PatternDisplay background="linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%) 0 0, linear-gradient(45deg, currentColor 25%, transparent 25%, transparent 75%, currentColor 75%) 15px 15px" additionalStyles={{ backgroundSize: '32px 32px' }} />



      <PatternDisplay background="linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)" additionalStyles={{ backgroundSize: '16px 16px' }} />
      <PatternDisplay background="linear-gradient(currentColor 2px, transparent 2px), linear-gradient(to right, currentColor 2px, transparent 2px)" additionalStyles={{ backgroundSize: '32px 32px' }} />

      <PatternDisplay background="linear-gradient(to right, transparent 0%, transparent 35%, currentColor 35%, currentColor 65%, transparent 65%, transparent 100%), linear-gradient(to bottom, transparent 0%, transparent 35%, currentColor 35%, currentColor 65%, transparent 65%, transparent 100%)" additionalStyles={{ backgroundSize: '32px 32px' }} />

      <PatternDisplay background="linear-gradient(to bottom right, transparent 0%, transparent 35%, currentColor 35%, currentColor 65%, transparent 65%, transparent 100%), linear-gradient(to bottom right, transparent 0%, transparent 35%, currentColor 35%, currentColor 65%, transparent 65%, transparent 100%)" additionalStyles={{ backgroundSize: '64px 32px' }} />

      <PatternDisplay background="repeating-linear-gradient(45deg, currentColor, currentColor 10px, transparent 10px, transparent 20px)" />


      <PatternDisplay background="linear-gradient(60deg, currentColor 25%, transparent 25.5%), linear-gradient(0deg, transparent 75%, currentColor 75%)" additionalStyles={{ backgroundSize: '30px 30px' }} />

      <PatternDisplay background="radial-gradient(circle farthest-side at 0% 50%, transparent 74%, currentColor 75%, currentColor 85%, transparent 86%) 0 0, radial-gradient(circle farthest-side at 100% 50%, transparent 74%, currentColor 75%, currentColor 85%, transparent 86%) 0 0, radial-gradient(circle farthest-side at 50% 0%, transparent 74%, currentColor 75%, currentColor 85%, transparent 86%) 0 0, radial-gradient(circle farthest-side at 50% 100%, transparent 74%, currentColor 75%, currentColor 85%, transparent 86%) 0 0" additionalStyles={{ backgroundSize: '30px 30px' }} />

      {/* === RADICALLY DIFFERENT PATTERNS START === */}
      {/* 61. Geometric Illusion (Impossible Cubes) */}
      <PatternDisplay background="linear-gradient(135deg, transparent 75%, currentColor 75%), linear-gradient(225deg, transparent 75%, currentColor 75%), linear-gradient(45deg, transparent 75%, currentColor 75%), linear-gradient(315deg, transparent 75%, currentColor 75%)" additionalStyles={{ backgroundSize: '40px 40px', backgroundPosition: '10px 0, 10px 0, 0 10px, 0 10px' }} />
      {/* 63. Art Deco Fan */}
      <PatternDisplay background="repeating-conic-gradient(from 45deg at 50% 100%, currentColor 0% 5%, transparent 5% 10%), radial-gradient(circle at 50% 100%, currentColor 30%, transparent 31%)" additionalStyles={{ backgroundSize: '40px 20px' }} />
      {/* 65. Moiré Interference (Radial) */}
      <PatternDisplay background="repeating-radial-gradient(circle, currentColor, currentColor 1px, transparent 1px, transparent 5px), repeating-radial-gradient(circle, currentColor, currentColor 1px, transparent 1px, transparent 6px)" additionalStyles={{ backgroundSize: '30px 30px, 30px 30px', backgroundPosition: '0 0, 1px 1px' }} />
      {/* 67. Warp Speed Streaks */}
      <PatternDisplay background="repeating-radial-gradient(circle at center, currentColor 0, currentColor 1px, transparent 1px, transparent 10px)" additionalStyles={{ backgroundSize: '20px 20px' }} />
      {/* 68. Textured Noise */}
      <PatternDisplay background="repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 2px)" additionalStyles={{ backgroundSize: '2px 2px' }} />
      {/* 70. Op Art Waves */}
      <PatternDisplay background="repeating-radial-gradient(circle at 0% 50%, currentColor 5px, transparent 6px, transparent 15px, currentColor 15px, currentColor 20px, transparent 21px), repeating-radial-gradient(circle at 100% 50%, transparent 5px, currentColor 6px, currentColor 15px, transparent 15px, transparent 20px, currentColor 21px)" additionalStyles={{ backgroundSize: '42px 42px' }} />
      {/* 71. Interwoven Spirals (Approx) */}
      <PatternDisplay background="repeating-conic-gradient(from 0deg, currentColor 0% 2%, transparent 2% 10%), repeating-conic-gradient(from 90deg, currentColor 0% 2%, transparent 2% 10%)" additionalStyles={{ backgroundSize: '40px 40px', backgroundPosition: '0 0, 10px 10px' }} />
      {/* 72. Shattered Glass */}
      <PatternDisplay background="linear-gradient(110deg, transparent 49.5%, currentColor 49.5%, currentColor 50.5%, transparent 50.5%), linear-gradient(20deg, transparent 49.5%, currentColor 49.5%, currentColor 50.5%, transparent 50.5%), linear-gradient(290deg, transparent 49.5%, currentColor 49.5%, currentColor 50.5%, transparent 50.5%)" additionalStyles={{ backgroundSize: '30px 30px' }} />
      {/* 74. Pixelated Gradient */}
      <PatternDisplay background="repeating-linear-gradient(90deg, currentColor, currentColor 10px, transparent 10px, transparent 20px), repeating-linear-gradient(0deg, color-mix(in srgb, currentColor 50%, transparent) 0 10px, color-mix(in srgb, currentColor 25%, transparent) 10px 20px)" additionalStyles={{ backgroundSize: '20px 20px' }} />
      {/* 75. 3D Boxes Illusion */}
      <PatternDisplay background="linear-gradient(135deg, color-mix(in srgb, currentColor 80%, transparent) 25%, transparent 25%), linear-gradient(225deg, color-mix(in srgb, currentColor 60%, transparent) 25%, transparent 25%), linear-gradient(315deg, color-mix(in srgb, currentColor 40%, transparent) 25%, transparent 25%), linear-gradient(45deg, color-mix(in srgb, currentColor 20%, transparent) 25%, transparent 25%)" additionalStyles={{ backgroundSize: '40px 40px' }} />
      {/* === RADICALLY DIFFERENT PATTERNS END === */}

      {/* === YET MORE PATTERNS START === */}
      {/* 77. Jagged Lines */}
      <PatternDisplay background="repeating-linear-gradient(10deg, transparent 0 5px, currentColor 5px 6px), repeating-linear-gradient(170deg, transparent 0 5px, currentColor 5px 6px)" additionalStyles={{ backgroundSize: '12px 20px' }} />
      {/* 78. Concentric Diamonds */}
      <PatternDisplay background="repeating-linear-gradient(45deg, transparent 0 5px, currentColor 5px 10px), repeating-linear-gradient(-45deg, transparent 0 5px, currentColor 5px 10px)" additionalStyles={{ backgroundSize: '20px 20px' }} />
      {/* 80. Wiggly Lines */}
      <PatternDisplay background="repeating-radial-gradient(circle at 0 50%, transparent 5px, currentColor 6px, currentColor 9px, transparent 10px), repeating-radial-gradient(circle at 100% 50%, currentColor 5px, transparent 6px, transparent 9px, currentColor 10px)" additionalStyles={{ backgroundSize: '20px 40px' }} />
      {/* 82. Embossed Squares */}
      <PatternDisplay background="linear-gradient(135deg, color-mix(in srgb, currentColor 60%, transparent) 50%, transparent 51%), linear-gradient(45deg, color-mix(in srgb, currentColor 80%, transparent) 50%, transparent 51%)" additionalStyles={{ backgroundSize: '20px 20px' }} />
      {/* 84. Diagonal Brick */}
      <PatternDisplay background="repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px), repeating-linear-gradient(-45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)" additionalStyles={{ backgroundSize: '40px 40px', backgroundPosition: '0 0, 20px 0' }} />
      {/* 85. Sun Rays (Offset) */}
      {/* 87. Subtle Wave Texture */}
      <PatternDisplay background="repeating-radial-gradient(circle at 0 100%, transparent 0, transparent 10px, currentColor 10px, currentColor 11px, transparent 11px), repeating-radial-gradient(circle at 100% 0, transparent 0, transparent 10px, currentColor 10px, currentColor 11px, transparent 11px)" additionalStyles={{ backgroundSize: '22px 22px' }} />
      {/* 88. Abstract Geometric Shards */}
      <PatternDisplay background="conic-gradient(at 70% 30%, transparent 60deg, currentColor 60deg 70deg, transparent 70deg), conic-gradient(at 30% 70%, transparent 240deg, currentColor 240deg 250deg, transparent 250deg), linear-gradient(160deg, transparent 49%, currentColor 50%, transparent 51%)" additionalStyles={{ backgroundSize: '50px 50px' }} />
      {/* 89. Cross Stitch Pattern */}
      {/* 90. Arrowhead Pattern */}
      {/* 91. Vertical Sine Weave */}
      {/* === YET MORE PATTERNS END === */}

    </section>

    <section style={{ padding: '8px 0' }}>
      <OpacityScale color={colorPair[1]} />
    </section>

    <GradientPanel colorPair={colorPair} />
    <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(135deg, currentColor 0%, transparent 100%)' }}></div>
    <section style={{ marginTop: '16px',display: 'grid', gap: '8px', gridTemplateColumns: 'repeat(auto-fit, minmax(min(480px, 100%), 1fr))' }}>
          
         
          </section>
   
    <div>
      <p>Contrast: {contrast}</p>
      <p>Iterations: {iterations + 1}</p>
    </div>
    <section style={{ display: 'flex', gap: '32px' }}>
      <ColorFormats color={colorPair[0]} />
      <ColorFormats color={colorPair[1]} />
    </section>
  </div>
  <Footer count={count} />
  </div>
);
};

export default App;
