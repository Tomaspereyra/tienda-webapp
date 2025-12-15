import apiClient from './client';

export interface UploadResponse {
    url: string;
    filename: string;
    size: number;
}

export interface ValidationResult {
    valid: boolean;
    error?: string;
}

/**
 * Upload a single image
 */
export const uploadImage = async (
    file: File,
    onUploadProgress?: (progressEvent: any) => void
): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<{ data: UploadResponse }>('/api/admin/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        onUploadProgress,
    });

    return response.data.data;
};

/**
 * Validate image file before upload
 */
export const validateImageFile = (file: File): ValidationResult => {
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
