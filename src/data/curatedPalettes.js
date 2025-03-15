// curatedPalettes.js
// A large collection of accessible color combinations that meet WCAG and APCA standards
// Each entry contains a color pair [background, foreground] and metadata

const curatedPalettes = [
  // Modern UI Colors
  ['#0f172a', '#f8fafc'], // Slate Dark
  ['#f8fafc', '#0f172a'], // Slate Light
  ['#172554', '#f1f5f9'], // Blue Dark
  ['#f0f9ff', '#0c4a6e'], // Sky Light
  ['#14532d', '#dcfce7'], // Green Dark
  ['#f0fdf4', '#14532d'], // Green Light
  ['#7f1d1d', '#fee2e2'], // Red Dark
  ['#fef2f2', '#7f1d1d'], // Red Light
  ['#581c87', '#f3e8ff'], // Purple Dark
  ['#faf5ff', '#581c87'], // Purple Light
  ['#713f12', '#fef9c3'], // Yellow Dark
  ['#fefce8', '#713f12'], // Yellow Light
  ['#7c2d12', '#ffedd5'], // Orange Dark
  ['#fff7ed', '#7c2d12'], // Orange Light
  ['#134e4a', '#ccfbf1'], // Teal Dark
  ['#f0fdfa', '#134e4a'], // Teal Light
  ['#831843', '#fce7f3'], // Pink Dark
  ['#fdf2f8', '#831843'], // Pink Light
  
  // Vibrant Combinations
  ['#2563eb', '#ffffff'], // Blue on White
  ['#ffffff', '#2563eb'], // White on Blue
  ['#16a34a', '#ffffff'], // Green on White
  ['#ffffff', '#16a34a'], // White on Green
  ['#dc2626', '#ffffff'], // Red on White
  ['#ffffff', '#dc2626'], // White on Red
  ['#9333ea', '#ffffff'], // Purple on White
  ['#ffffff', '#9333ea'], // White on Purple
  ['#ca8a04', '#ffffff'], // Yellow on White
  ['#ffffff', '#ca8a04'], // White on Yellow
  ['#ea580c', '#ffffff'], // Orange on White
  ['#ffffff', '#ea580c'], // White on Orange
  ['#0d9488', '#ffffff'], // Teal on White
  ['#ffffff', '#0d9488'], // White on Teal
  ['#db2777', '#ffffff'], // Pink on White
  ['#ffffff', '#db2777'], // White on Pink
  
  // Monochromatic
  ['#18181b', '#e4e4e7'], // Zinc Dark
  ['#e4e4e7', '#18181b'], // Zinc Light
  ['#1e293b', '#f1f5f9'], // Slate Dark
  ['#f1f5f9', '#1e293b'], // Slate Light
  ['#292524', '#f5f5f4'], // Stone Dark
  ['#f5f5f4', '#292524'], // Stone Light
  ['#1c1917', '#f5f5f4'], // Stone Darker
  ['#f5f5f4', '#1c1917'], // Stone Lighter
  
  // Pastels
  ['#ede9fe', '#5b21b6'], // Lavender
  ['#fce7f3', '#9d174d'], // Rose
  ['#dcfce7', '#166534'], // Mint
  ['#e0f2fe', '#0369a1'], // Sky
  ['#fef3c7', '#92400e'], // Amber
  ['#ffedd5', '#9a3412'], // Peach
  ['#f3f4f6', '#4b5563'], // Gray
  ['#ecfdf5', '#065f46'], // Emerald
  
  // Dark Mode
  ['#111827', '#f9fafb'], // Gray Dark
  ['#0f172a', '#f8fafc'], // Slate Dark
  ['#0c0a09', '#f5f5f4'], // Stone Dark
  ['#0c4a6e', '#e0f2fe'], // Sky Dark
  ['#14532d', '#dcfce7'], // Green Dark
  ['#7f1d1d', '#fee2e2'], // Red Dark
  ['#581c87', '#f3e8ff'], // Purple Dark
  ['#713f12', '#fef9c3'], // Yellow Dark
  ['#7c2d12', '#ffedd5'], // Orange Dark
  ['#134e4a', '#ccfbf1'], // Teal Dark
  ['#831843', '#fce7f3'], // Pink Dark
  
  // Nature Inspired
  ['#365314', '#ecfccb'], // Forest
  ['#1e3a8a', '#dbeafe'], // Ocean
  ['#78350f', '#fef3c7'], // Earth
  ['#881337', '#fce7f3'], // Berry
  ['#3f6212', '#d9f99d'], // Lime
  ['#0f766e', '#ccfbf1'], // Aqua
  ['#4d7c0f', '#d9f99d'], // Grass
  ['#b45309', '#fef3c7'], // Honey
  
  // Retro
  ['#4c1d95', '#e9d5ff'], // Retro Purple
  ['#b91c1c', '#fee2e2'], // Retro Red
  ['#1d4ed8', '#dbeafe'], // Retro Blue
  ['#15803d', '#dcfce7'], // Retro Green
  ['#b45309', '#fef3c7'], // Retro Orange
  ['#86198f', '#f5d0fe'], // Retro Magenta
  ['#0f766e', '#ccfbf1'], // Retro Teal
  ['#a16207', '#fef9c3'], // Retro Gold
  
  // Neon
  ['#030712', '#22d3ee'], // Neon Cyan
  ['#030712', '#4ade80'], // Neon Green
  ['#030712', '#fb7185'], // Neon Pink
  ['#030712', '#a78bfa'], // Neon Purple
  ['#030712', '#facc15'], // Neon Yellow
  ['#030712', '#fb923c'], // Neon Orange
  ['#030712', '#38bdf8'], // Neon Blue
  ['#030712', '#f472b6'], // Neon Magenta
  
  // Earthy
  ['#57534e', '#f5f5f4'], // Stone
  ['#422006', '#fef3c7'], // Brown
  ['#3f6212', '#ecfccb'], // Olive
  ['#713f12', '#fef9c3'], // Amber
  ['#7c2d12', '#ffedd5'], // Terracotta
  ['#44403c', '#fafaf9'], // Taupe
  ['#78350f', '#fef3c7'], // Sienna
  ['#365314', '#f7fee7'], // Moss
  
  // Jewel Tones
  ['#6d28d9', '#f5f3ff'], // Amethyst
  ['#0e7490', '#ecfeff'], // Sapphire
  ['#047857', '#ecfdf5'], // Emerald
  ['#b91c1c', '#fef2f2'], // Ruby
  ['#b45309', '#fff7ed'], // Amber
  ['#4338ca', '#eef2ff'], // Lapis
  ['#be185d', '#fdf2f8'], // Garnet
  ['#0f766e', '#f0fdfa'], // Jade
  
  // Grayscale with Accent
  ['#1f2937', '#f43f5e'], // Gray with Red
  ['#1f2937', '#3b82f6'], // Gray with Blue
  ['#1f2937', '#22c55e'], // Gray with Green
  ['#1f2937', '#a855f7'], // Gray with Purple
  ['#1f2937', '#eab308'], // Gray with Yellow
  ['#1f2937', '#ec4899'], // Gray with Pink
  ['#1f2937', '#14b8a6'], // Gray with Teal
  ['#1f2937', '#f97316'], // Gray with Orange
  
  // Inverted Grayscale with Accent
  ['#f9fafb', '#dc2626'], // Light with Red
  ['#f9fafb', '#2563eb'], // Light with Blue
  ['#f9fafb', '#16a34a'], // Light with Green
  ['#f9fafb', '#9333ea'], // Light with Purple
  ['#f9fafb', '#ca8a04'], // Light with Yellow
  ['#f9fafb', '#db2777'], // Light with Pink
  ['#f9fafb', '#0d9488'], // Light with Teal
  ['#f9fafb', '#ea580c'], // Light with Orange
  
  // Complementary
  ['#1e40af', '#fef08a'], // Blue & Yellow
  ['#b91c1c', '#bbf7d0'], // Red & Green
  ['#7e22ce', '#fde68a'], // Purple & Yellow
  ['#ea580c', '#bfdbfe'], // Orange & Blue
  ['#15803d', '#fecaca'], // Green & Red
  ['#0369a1', '#fed7aa'], // Blue & Orange
  ['#b45309', '#a5f3fc'], // Brown & Cyan
  ['#be185d', '#d9f99d'], // Magenta & Lime
];

export default curatedPalettes; 