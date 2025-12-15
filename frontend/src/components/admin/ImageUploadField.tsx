import React, { useRef } from 'react';
import { uploadImage, validateImageFile } from '../../api/uploads';
import { Button } from '@components/common/Button';
import { UploadedImage } from '../../types/upload';
import styles from './ImageUploadField.module.css';

interface ImageUploadFieldProps {
    images: UploadedImage[];
    onChange: (images: UploadedImage[]) => void;
    maxImages?: number;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
    images,
    onChange,
    maxImages = 4,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const file = files[0]; // Handle one at a time

        // Validate file
        const validation = validateImageFile(file);
        if (!validation.valid) {
            // Show error in the UI
            const errorImage: UploadedImage = {
                file,
                url: '',
                progress: 0,
                error: validation.error,
                uploading: false,
            };
            onChange([...images, errorImage]);
            return;
        }

        // Add to state with uploading status
        const uploadingImage: UploadedImage = {
            file,
            url: '',
            progress: 0,
            uploading: true,
        };

        const newImages = [...images, uploadingImage];
        onChange(newImages);

        // Upload to backend
        try {
            const response = await uploadImage(file, (progressEvent: any) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );

                    // Update progress
                    const updatedImages = newImages.map((img) =>
                        img.file === file
                            ? { ...img, progress: percentCompleted }
                            : img
                    );
                    onChange(updatedImages);
                }
            });

            // Upload complete - update with URL
            const completedImages = newImages.map((img) =>
                img.file === file
                    ? { ...img, url: response.url, uploading: false, progress: 100 }
                    : img
            );
            onChange(completedImages);
        } catch (error: any) {
            // Upload failed
            const failedImages = newImages.map((img) =>
                img.file === file
                    ? {
                        ...img,
                        error: error.message || 'Error al subir imagen',
                        uploading: false,
                    }
                    : img
            );
            onChange(failedImages);
        }

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemove = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    const handleRetry = async (index: number) => {
        const imageToRetry = images[index];
        if (!imageToRetry.file) return;

        // Reset error and set uploading
        const retryingImages = images.map((img, i) =>
            i === index
                ? { ...img, error: undefined, uploading: true, progress: 0 }
                : img
        );
        onChange(retryingImages);

        // Retry upload
        try {
            const response = await uploadImage(imageToRetry.file, (progressEvent: any) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );

                    const updatedImages = images.map((img, i) =>
                        i === index ? { ...img, progress: percentCompleted } : img
                    );
                    onChange(updatedImages);
                }
            });

            // Success
            const successImages = images.map((img, i) =>
                i === index
                    ? { ...img, url: response.url, uploading: false, progress: 100, error: undefined }
                    : img
            );
            onChange(successImages);
        } catch (error: any) {
            // Failed again
            const failedImages = images.map((img, i) =>
                i === index
                    ? { ...img, error: error.message || 'Error al subir imagen', uploading: false }
                    : img
            );
            onChange(failedImages);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const canAddMore = images.length < maxImages;

    return (
        <div className={styles.uploadField}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
            />

            {/* Preview Grid */}
            {images.length > 0 && (
                <div className={styles.previewGrid}>
                    {images.map((image, index) => (
                        <div key={index} className={styles.previewCard}>
                            {/* Image Preview */}
                            {image.url && (
                                <img
                                    src={image.url}
                                    alt={`Preview ${index + 1}`}
                                    className={styles.previewImage}
                                />
                            )}

                            {/* Uploading State */}
                            {image.uploading && (
                                <div className={styles.uploadingOverlay}>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${image.progress}%` }}
                                        />
                                    </div>
                                    <span className={styles.progressText}>
                                        {image.progress}%
                                    </span>
                                </div>
                            )}

                            {/* Error State */}
                            {image.error && (
                                <div className={styles.errorOverlay}>
                                    <span className={styles.errorIcon}>⚠️</span>
                                    <span className={styles.errorText}>{image.error}</span>
                                    <button
                                        type="button"
                                        className={styles.retryButton}
                                        onClick={() => handleRetry(index)}
                                        title="Reintentar subida"
                                    >
                                        🔄 Reintentar
                                    </button>
                                </div>
                            )}

                            {/* Remove Button */}
                            {!image.uploading && (
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => handleRemove(index)}
                                    title="Eliminar imagen"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Button */}
            {canAddMore && (
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={handleUploadClick}
                    className={styles.uploadButton}
                >
                    📎 Subir Imagen {images.length > 0 && `(${images.length}/${maxImages})`}
                </Button>
            )}

            {!canAddMore && (
                <p className={styles.limitText}>
                    Máximo {maxImages} imágenes alcanzado
                </p>
            )}

            <p className={styles.hint}>
                💡 Formatos: JPG, PNG, GIF, WebP · Máximo 5MB por imagen
            </p>
        </div>
    );
};
