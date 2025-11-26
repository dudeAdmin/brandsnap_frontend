// API Configuration
// Get backend URL from environment variable or use default
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Export for use in components
export default {
    API_BASE_URL
};
