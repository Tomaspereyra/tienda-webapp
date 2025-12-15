import client from './client';

export interface OrphanedImage {
    filename: string;
    url: string;
    size: number;
    uploadedAt: string;
}

/**
 * Get all orphaned images (not associated with any product)
 */
export const getOrphanedImages = async (): Promise<OrphanedImage[]> => {
    const response = await client.get<{ success: boolean; data: OrphanedImage[] }>('/api/admin/images/orphaned');
    return response.data.data; // Backend wraps in { success, data }
};

/**
 * Delete an orphaned image
 */
export const deleteImage = async (filename: string): Promise<void> => {
    await client.delete(`/api/admin/images/${filename}`);
};
