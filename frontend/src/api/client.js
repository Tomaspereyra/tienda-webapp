import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor - Add JWT token to requests
apiClient.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('auth_token'); // Must match STORAGE_KEYS.AUTH_TOKEN

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle 401 Unauthorized
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('auth_token'); // Must match STORAGE_KEYS.AUTH_TOKEN

            // Only redirect if not already on login page
            if (window.location.pathname !== '/login' && window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
