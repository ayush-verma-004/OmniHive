import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10s timeout
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';

        if (error.response?.status === 401) {
            // Token expired or unauthorized
            if (!window.location.pathname.includes('/login')) {
                localStorage.removeItem('token');
                // We don't force redirect immediately to avoid breaking user flow 
                // but we toast them.
                toast.error('Session expired. Please login again.');
            }
        } else if (error.response?.status === 403) {
            toast.error('You do not have permission to perform this action.');
        } else if (error.code === 'ECONNABORTED') {
            toast.error('Request timed out. Please check your connection.');
        } else if (!error.response) {
            toast.error('Network error. Is the server running?');
        }

        return Promise.reject(error);
    }
);

export default api;
