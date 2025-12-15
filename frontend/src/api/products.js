import apiClient from './client';

/**
 * Get all products with optional filters
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 20)
 * @param {string} params.search - Search term
 * @param {string} params.category - Category filter
 * @param {string} params.sort - Sort field (name, price, created_at)
 * @param {string} params.order - Sort order (asc, desc)
 * @returns {Promise<{products: Array, pagination: Object}>}
 */
export const getProducts = async (params = {}) => {
    const response = await apiClient.get('/api/products', { params });
    return response.data.data;
};

/**
 * Get single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Object>} Product data
 */
export const getProduct = async (id) => {
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data.data;
};

/**
 * Create new product (admin only)
 * @param {Object} productData
 * @param {string} productData.name
 * @param {string} productData.description
 * @param {number} productData.price
 * @param {string} productData.category
 * @param {Array<string>} productData.images
 * @param {Array<string>} productData.tags
 * @returns {Promise<Object>} Created product
 */
export const createProduct = async (productData) => {
    const response = await apiClient.post('/api/products', productData);
    return response.data.data;
};

/**
 * Update existing product (admin only)
 * @param {number} id - Product ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated product
 */
export const updateProduct = async (id, updates) => {
    const response = await apiClient.patch(`/api/products/${id}`, updates);
    return response.data.data;
};

/**
 * Delete product (admin only - soft delete)
 * @param {number} id - Product ID
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
    await apiClient.delete(`/api/products/${id}`);
};
