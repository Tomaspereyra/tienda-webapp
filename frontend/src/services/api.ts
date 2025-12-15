import { STORAGE_KEYS } from '@utils/constants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

interface FetchOptions extends RequestInit {
    requiresAuth?: boolean;
}

class ApiService {
    private async request<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const { requiresAuth = false, ...fetchOptions } = options;

        const headers: HeadersInit = {
            'Content-Type': 'application/json',
            ...fetchOptions.headers,
        };

        // Add auth token if required
        if (requiresAuth) {
            const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
            if (token) {
                (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
            }
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...fetchOptions,
                headers,
            });

            // Handle 401 Unauthorized - redirect to login
            if (response.status === 401) {
                localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
                window.location.href = '/login';
                throw new Error('Unauthorized');
            }

            // Handle other HTTP errors
            if (!response.ok) {
                const error = await response.json().catch(() => ({
                    message: 'An error occurred',
                }));
                throw new Error(error.message || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            if (error instanceof Error) {
                throw error;
            }
            throw new Error('Network error');
        }
    }

    async get<T>(endpoint: string, requiresAuth = false): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET', requiresAuth });
    }

    async post<T>(
        endpoint: string,
        data: unknown,
        requiresAuth = false
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            requiresAuth,
        });
    }

    async put<T>(
        endpoint: string,
        data: unknown,
        requiresAuth = false
    ): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            requiresAuth,
        });
    }

    async delete<T>(endpoint: string, requiresAuth = false): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE', requiresAuth });
    }
}

export const apiService = new ApiService();
