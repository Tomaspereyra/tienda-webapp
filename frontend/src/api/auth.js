import apiClient from './client';

/**
 * Login with admin credentials
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<{token: string, expires_at: string, user: Object}>}
 */
export const login = async (username, password) => {
    const response = await apiClient.post('/api/auth/login', {
        username,
        password,
    });

    return response.data.data; // Backend wraps in { success, data }
};

/**
 * Logout - Clear local token
 */
export const logout = () => {
    localStorage.removeItem('authToken');
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
};

/**
 * Get stored auth token
 * @returns {string|null}
 */
export const getToken = () => {
    return localStorage.getItem('authToken');
};

/**
 * Store auth token
 * @param {string} token 
 */
export const setToken = (token) => {
    localStorage.setItem('authToken', token);
};
