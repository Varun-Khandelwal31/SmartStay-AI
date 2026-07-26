// API Configuration for SmartStay AI Frontend
// Reads VITE_API_URL from environment variables (e.g., https://smartstay-ai-backend.onrender.com)
// Falls back to http://localhost:5001 in local development.

export const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5001').replace(/\/$/, '')
