import { LoginCredentials, AuthResponse } from '../types';
import { STORAGE_KEYS } from '@utils/constants';
import apiClient from '../api/client';

// Real API implementation
export const authService = {
    /**
     * Login with username and password
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        try {
            const response = await apiClient.post('/api/auth/login', {
                username: credentials.email, // Backend uses 'username' field
                password: credentials.password,
            });

            const data = response.data.data;

            // Store token
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);

            // Return in expected format
            return {
                token: data.token,
                user: {
                    id: data.user.id.toString(),
                    email: data.user.username, // Map username to email for compatibility
                },
            };
        } catch (error: any) {
            const message = error.response?.data?.error?.message || 'Error al iniciar sesión';
            throw new Error(message);
        }
    },

    /**
     * Logout - clear token
     */
    logout: () => {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    /**
     * Get current token
     */
    getToken: (): string | null => {
        return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated: (): boolean => {
        return !!authService.getToken();
    },
};
