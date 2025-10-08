// API Configuration for production and development environments
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://www.alazie.express';

export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};
