// Product categories
export const CATEGORIES = ['Casual', 'Religioso', 'Deportivo'] as const;
export type Category = typeof CATEGORIES[number];

// Product genders
export const GENDERS = ['Hombre', 'Mujer', 'Niño'] as const;
export type Gender = typeof GENDERS[number];

// Product sizes
export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const;
export type Size = typeof SIZES[number];

// API endpoints
export const API_ENDPOINTS = {
    // Public endpoints
    PRODUCTS: '/api/products',
    FEATURED_PRODUCTS: '/api/products/featured',

    // Auth endpoints
    LOGIN: '/api/auth/login',

    // Admin endpoints (require auth)
    CREATE_PRODUCT: '/api/products',
    UPDATE_PRODUCT: (id: string) => `/api/products/${id}`,
    DELETE_PRODUCT: (id: string) => `/api/products/${id}`,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
} as const;

// Routes
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    ADMIN: '/admin',
    ADMIN_PRODUCTS_NEW: '/admin/products/new',
    ADMIN_PRODUCTS_EDIT: (id: string) => `/admin/products/${id}/edit`,
} as const;
