import { Product, ProductFormData } from '../types';
import apiClient from '../api/client';

// Helper to transform backend product to frontend Product type
const transformProduct = (backendProduct: any): Product => {
    return {
        id: backendProduct.id.toString(),
        name: backendProduct.name,
        description: backendProduct.description || '',
        price: backendProduct.price,
        category: backendProduct.category || '',
        images: backendProduct.images || [],
        tags: backendProduct.tags || [],
        sizes: backendProduct.sizes || [],
        colors: backendProduct.colors || [],
        gender: backendProduct.gender || 'unisex',
        oversize: backendProduct.oversize || false,
        featured: backendProduct.featured || false,
        created_at: backendProduct.created_at,
        updated_at: backendProduct.updated_at,
    };
};

// Real API implementation
export const productsService = {
    /**
     * Get all products
     */
    getAll: async (): Promise<{ products: Product[] }> => {
        const response = await apiClient.get('/api/products', {
            params: { limit: 100 }  // Aumentar límite para obtener todos los productos
        });
        const products = response.data.data.products.map(transformProduct);
        return { products };
    },

    /**
     * Get featured products
     */
    getFeatured: async (): Promise<{ products: Product[] }> => {
        // Backend doesn't have a featured endpoint yet, so filter client-side for now
        const response = await apiClient.get('/api/products', {
            params: { limit: 100 }  // Aumentar límite para obtener todos los productos
        });
        const allProducts = response.data.data.products.map(transformProduct);
        const featured = allProducts.filter((p: Product) => p.featured);
        return { products: featured };
    },

    /**
     * Get products with filters
     */
    getFiltered: async (filters: {
        gender?: string;
        category?: string;
        oversize?: boolean;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{ products: Product[]; total?: number; pages?: number }> => {
        const params: any = {};

        if (filters.category) {
            params.category = filters.category;
        }
        if (filters.search) {
            params.search = filters.search;
        }
        if (filters.page) {
            params.page = filters.page;
        }
        if (filters.limit) {
            params.limit = filters.limit;
        }

        const response = await apiClient.get('/api/products', { params });
        const products = response.data.data.products.map(transformProduct);

        // Filter client-side for properties backend doesn't support yet
        let filtered = products;
        if (filters.gender) {
            filtered = filtered.filter((p: Product) => p.gender === filters.gender);
        }
        if (filters.oversize !== undefined) {
            filtered = filtered.filter((p: Product) => p.oversize === filters.oversize);
        }

        return {
            products: filtered,
            total: response.data.data.pagination?.total,
            pages: response.data.data.pagination?.pages,
        };
    },

    /**
     * Get product by ID
     */
    getById: async (id: string): Promise<Product | undefined> => {
        try {
            const response = await apiClient.get(`/api/products/${id}`);
            return transformProduct(response.data.data);
        } catch (error: any) {
            if (error.response?.status === 404) {
                return undefined;
            }
            throw error;
        }
    },

    /**
     * Create new product (admin)
     */
    create: async (data: ProductFormData): Promise<Product> => {
        const payload = {
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            images: data.images || [],
            tags: data.tags || [],
            sizes: data.sizes || [],
            colors: data.colors || [],
            gender: data.gender || 'unisex',
            oversize: data.oversize || false,
            featured: data.featured || false,
        };

        const response = await apiClient.post('/api/products', payload);
        return transformProduct(response.data.data);
    },

    /**
     * Update existing product (admin)
     */
    update: async (id: string, data: ProductFormData): Promise<Product> => {
        const payload = {
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            images: data.images,
            tags: data.tags,
            sizes: data.sizes || [],
            colors: data.colors || [],
            gender: data.gender || 'unisex',
            oversize: data.oversize || false,
            featured: data.featured || false,
        };

        const response = await apiClient.patch(`/api/products/${id}`, payload);
        return transformProduct(response.data.data);
    },

    /**
     * Delete product (admin)
     */
    delete: async (id: string): Promise<{ success: boolean }> => {
        await apiClient.delete(`/api/products/${id}`);
        return { success: true };
    },

    /**
     * Search products by name
     */
    search: async (query: string): Promise<{ products: Product[] }> => {
        const response = await apiClient.get('/api/products', {
            params: { search: query },
        });
        const products = response.data.data.products.map(transformProduct);
        return { products };
    },
};
