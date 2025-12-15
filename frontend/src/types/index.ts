import { Category, Gender, Size } from '@utils/constants';

// Product type matching backend API response
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    tags?: string[];
    sizes?: string[];  // Optional for backward compatibility
    colors?: string[]; // Optional for backward compatibility
    gender?: string;
    oversize?: boolean;
    featured?: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface ProductFormData {
    name: string;
    description: string;
    price: number;
    images: string[];
    tags?: string[];
    sizes: Size[];
    colors: string[];
    gender: Gender;
    category: Category;
    oversize: boolean;
    featured: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthUser {
    id: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    user: AuthUser;
}
