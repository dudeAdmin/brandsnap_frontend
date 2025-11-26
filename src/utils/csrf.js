// CSRF Token Utility Functions
import { API_BASE_URL } from '../config/api';

/**
 * Get CSRF token from cookies
 * @returns {string|null} CSRF token or null if not found
 */
export const getCsrfToken = () => {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length);
        }
    }
    return null;
};

/**
 * Fetch CSRF token from backend
 * This should be called on app initialization
 * @returns {Promise<void>}
 */
export const fetchCsrfToken = async () => {
    try {
        await fetch(`${API_BASE_URL}/api/csrf-token`, {
            method: 'GET',
            credentials: 'include', // Important: include cookies
        });
        console.log('CSRF token fetched successfully');
    } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
    }
};

/**
 * Configure axios instance with CSRF token interceptor
 * @param {import('axios').AxiosInstance} axiosInstance 
 */
export const setupCsrfInterceptor = (axiosInstance) => {
    // Request interceptor to add CSRF token to headers
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = getCsrfToken();
            if (token) {
                config.headers['X-XSRF-TOKEN'] = token;
            }
            // Always include credentials for CORS
            config.withCredentials = true;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};
