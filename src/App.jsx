import React, { useState, useEffect } from 'react';
import Color from 'colorjs.io';
import { HexColorPicker } from 'react-colorful';
import { v4 as uuidv4 } from 'uuid';
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Select from '@radix-ui/react-select';
import BarChart from './components/BarChart.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import Card from './components/Card.jsx'
import StatusDot from './components/StatusDot.jsx'
import StatusDotOutline from './components/StatusDotOutline.jsx'
import Badge from './components/Badge.jsx'
import BadgeOutline from './components/BadgeOutline.jsx'
import PieChart from './components/PieChart.jsx'
import PieChartAlt from './components/PieChartAlt.jsx'
import TextBox from './components/TextBox.jsx'
import Logo from './components/Logo.jsx'
import Footer from './components/Footer.jsx'
import BackgroundStripes from './components/BackgroundStripes.jsx'
import ColorFormats from './components/ColorFormats.jsx'
import OpacityScale from './components/OpacityScale.jsx'
import GradientPanel from './components/GradientPanel.jsx'

const App = () => {
  const [count, setCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [colorHistory, setColorHistory] = useState([]);
  const [borderRadius, setBorderRadius] = useState('0px');
  const [colorSpace, setColorSpace] = useState('p3');
  const [inputFormat, setInputFormat] = useState('p3');
  const [pinnedColor, setPinnedColor] = useState('');
  const [threshold, setThreshold] = useState(60);
  const [contrastAlgorithm, setContrastAlgorithm] = useState('APCA');
  const [colorPair, setColorPair] = useState(['#000000', '#FFFFFF']);
  const [contrast, setContrast] = useState(Color.contrast(colorPair[0], colorPair[1], 'WCAG21'));
  const [iterations, setIterations] = useState(0);
  const [pieChartData, setPieChartData] = useState([15,Math.floor(Math.random() * 100),55])
  const [pieChartDataAlt, setPieChartDataAlt] = useState([25,Math.floor(Math.random() * 100),5 ])
  const [progressBarData, setProgressBarData] = useState(Math.floor(Math.random() * 100))
  const [barChartData, setBarChartData] = useState([
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

    useEffect(() => {
        fetchCount();
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
    const { colorPair, contrast, iterations } = generateAccessibleColorPair(pinnedColor, inputFormat, threshold, contrastAlgorithm);
    setColorPair(colorPair);
    setContrast(contrast);
    setIterations(iterations);
    handleIncrement();
    // Update history
    setColorHistory(prev => [...prev.slice(-511), { id: uuidv4(), colors: colorPair }]); // Keep only the last 512 entries
    setSessionCount(prev => prev + 1); // Increment session count
  };

  // Function to restore color from history
  const restoreColorPair = (colors) => {
    setColorPair(colors);
    setContrast(Color.contrast(colors[0], colors[1], contrastAlgorithm)); // Recalculate contrast for these colors
  };

  const handleThresholdChange = (value) => {
    setThreshold(parseFloat(value));
  };

  const handleBorderRadiusChange = (value) => {
    setBorderRadius(value);
  };


 const handleSetPinnedColor = (color) => {
    setPinnedColor(color);
  };

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: colorPair[0], color: colorPair[1], position: 'relative' }}>
      <header style={{  zIndex: 999, backgroundColor: colorPair[0], color: colorPair[1], position: 'sticky', top: 0, paddingRight: '8px', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'currentColor', display: 'flex', alignItems: 'center' , gap: '8px' }}>
        <div style={{ padding: '20px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderRight: '1px solid' }}>
          <Logo colorPair={colorPair} size={20} />
          <b style={{ fontSize: '12px', letterSpacing: '-0.05em', fontWeight: 900 }}>RandomA11y</b>
        </div>
<section style={{ display: 'flex', alignItems: 'flex-start', gap: '32px', padding: '8px', overflow: 'scroll', flexWrap: 'none', whiteSpace: 'nowrap', zIndex: 2000 }}>
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
      
     <div style={{ display: 'flex', flexWrap: 'wrap'}}>
        {colorHistory.map(entry => (
          <button key={entry.id} title={colorPair[0] + ' / ' + colorPair[1] } style={{ cursor: 'pointer', fontWeight: 'bold', border: 0, appearance: 'none', WebkitAppearance: 'none', backgroundColor: entry.colors[0], color: entry.colors[1] }} onClick={() => restoreColorPair(entry.colors)}>
            A
          </button>
        ))}
      </div>
      <div style={{ maxWidth: '100%', padding: '16px', overflow: 'hidden' }}>
      
        <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr' }}>
          <div style={{ display: 'grid', gap: '8px', gridTemplateColumns: '1fr 1fr' }}>

        <button title="Pin - Find matches for this color" style={{ cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none', padding: '16px 8px', margin: 0, border: 0, background: colorPair[1], color: colorPair[0], fontSize: '12px' }} onClick={() => handleSetPinnedColor(colorPair[0])}>{colorPair[0]}</button>


      <button title="Pin - Find matches for this color" style={{ cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none', padding: '16px 8px', margin: 0, border: 0, boxShadow: 'inset 0 0 0 1px currentColor', background: 'transparent', color: colorPair[1], fontSize: '12px' }} onClick={() => handleSetPinnedColor(colorPair[1])}>{colorPair[1]}</button>

          </div>
      <section>

      </section>
      <div style={{display: 'flex', gap: '4px', alignItems: 'center'}}>
          <StatusDot colorPair={colorPair} borderRadius={borderRadius} />
          <StatusDotOutline colorPair={colorPair} borderRadius={borderRadius} />
          <Badge borderRadius={borderRadius} colorPair={colorPair}>Badge</Badge>
          <BadgeOutline borderRadius={borderRadius} colorPair={colorPair}>Badge Outline</BadgeOutline>
      <hr style={{ backgroundColor: colorPair[0], borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: colorPair[1], borderTopColor: 'transparent', borderLeftColor: 'transparent', borderRightColor: 'transparent',  width: '100%' }}/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr 1fr', gap: '8px'}}>
          <BarChart colorPair={colorPair} data={barChartData} borderRadius={borderRadius} />
          <PieChartAlt colorPair={[colorPair[1],colorPair[0]]}  data={pieChartDataAlt} borderRadius={borderRadius} />
          <article style={{ background: colorPair[1], color: colorPair[0], padding: '32px', borderRadius: borderRadius }}>
    <p style={{ lineHeight: 1.5, fontSize: '14px' }}>Every perception of colour is an illusion, we do not see colours as they really are. In our perception they alter one another.</p>
          </article>
      </div>

          <ProgressBar colorPair={colorPair} progress={progressBarData} borderRadius={borderRadius} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 3fr', gap: '8px' }}>
         <article style={{ border: '1px solid', padding: '32px', borderRadius: borderRadius }}>
    <p style={{ lineHeight: 1.5, fontSize: '14px' }}>Every perception of colour is an illusion, we do not see colours as they really are. In our perception they alter one another.</p>
    </article> 
    <PieChart colorPair={colorPair} data={pieChartData} borderRadius={borderRadius} />
          
          <BarChart colorPair={[colorPair[1], colorPair[0]]} data={barChartData} borderRadius={borderRadius} />
      </div>
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <TextBox time='15 July 2024' title='A sample example title' subtitle='A subtitle for the card' colorPair={colorPair} />
          <TextBox time='27 May 2024' title='A sample example title' subtitle='Another subtitle example' colorPair={[colorPair[1], colorPair[0]]} />
    </section>

      </div>
<section style={{ display: 'grid', maxWidth: '100%', gap: '8px', gridTemplateColumns: 'repeat(auto-fill, minmax(min(10rem, 100%), 1fr))', marginTop: '8px' }}>
      <BackgroundStripes degree={0} />
      <BackgroundStripes degree={45} />
      <BackgroundStripes degree={90} />
      <BackgroundStripes degree={135} />

      <div style={{ width: '100%', aspectRatio: '6/4', minHeight: '32px', boxShadow: 'inset 0 0 0 1px currentColor', background: 'repeating-radial-gradient(circle at 100%, currentColor, currentColor 1px, transparent 1px, transparent 6px)' }}></div>
      <div className='halftone' style={{ width: '100%', aspectRatio: '6/4', minHeight: '32px', boxShadow: 'inset 0 0 0 1px currentColor',  }}></div>
      <div className='halftone-angle' style={{ width: '100%', aspectRatio: '6/4', minHeight: '32px', boxShadow: 'inset 0 0 0 1px currentColor',  }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(0deg, currentColor 50%, transparent 50%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(180deg, currentColor 50%, transparent 50%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(90deg, currentColor 50%, transparent 50%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(270deg, currentColor 50%, transparent 50%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(135deg, currentColor 50%, transparent 50%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(-135deg, currentColor 50%, transparent 50%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'radial-gradient(circle, currentColor 20%, transparent 20%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'radial-gradient(circle, currentColor 50%, transparent 50%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'radial-gradient(circle, transparent 10%, currentColor 10%)' }}></div>
      <div style={{ width: '100%', aspectRatio: '6/4', boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'radial-gradient(circle, transparent 60%, currentColor 60%)' }}></div>
    </section>

    <section style={{ padding: '8px 0' }}>
      <OpacityScale color={colorPair[1]} />
    </section>
    
      <GradientPanel colorPair={colorPair} />
      <div style={{ boxShadow: 'inset 0 0 0 1px currentColor', minHeight: '64px', padding: '16px', background: 'linear-gradient(135deg, currentColor 0%, transparent 100%)' }}></div>
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
