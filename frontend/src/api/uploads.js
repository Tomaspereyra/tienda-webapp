import apiClient from './client';

/**
 * Upload an image file (admin only)
 * @param {File} file - Image file to upload
 * @param {Function} onUploadProgress - Progress callback
 * @returns {Promise<{url: string, filename: string, size: number}>}
 */
export const uploadImage = async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/api/admin/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
    });

    return response.data.data;
};

/**
 * Validate image file before upload
 * @param {File} file 
 * @returns {{valid: boolean, error?: string}}
 */
export const validateImageFile = (file) => {
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    // Check file size
    if (file.size > maxSizeBytes) {
        return {
            valid: false,
            error: `File size exceeds ${maxSizeMB}MB limit`,
        };
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return {
            valid: false,
            error: 'Invalid file type. Only JPG, PNG, GIF, and WebP are allowed',
        };
    }

    return { valid: true };
};
