// WebSocket configuration for the live feed
// Update this URL after deploying your Cloudflare Worker

// For local development (if running wrangler dev)
// export const WEBSOCKET_URL = 'ws://localhost:8787';

// For production (update with your actual worker URL)
// Set to null to disable WebSocket connection
export const WEBSOCKET_URL = 'wss://randoma11y-feed.adam-f8f.workers.dev'

// Helper to check if WebSocket is enabled
export const isWebSocketEnabled = () => WEBSOCKET_URL !== null && !WEBSOCKET_URL.includes('your-subdomain');

// Helper to construct full WebSocket endpoint
export const getWebSocketUrl = () => `${WEBSOCKET_URL}/ws`;
export const getHistoryUrl = () => `${WEBSOCKET_URL?.replace('wss://', 'https://').replace('ws://', 'http://')}/history`; 
