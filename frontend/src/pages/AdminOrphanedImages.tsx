import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrphanedImages, deleteImage, OrphanedImage } from '../api/images';
import { OrphanedImagesList } from '../components/admin/OrphanedImagesList';
import { Button } from '@components/common/Button';
import { showToast } from '@components/common/Toast';
import styles from './AdminOrphanedImages.module.css';

export const AdminOrphanedImages: React.FC = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState<OrphanedImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadImages = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getOrphanedImages();
            setImages(data || []);
        } catch (err: any) {
            setError(err.message || 'Error al cargar imágenes');
            showToast(err.message || 'Error al cargar imágenes', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadImages();
    }, []);

    const handleDelete = async (filename: string) => {
        try {
            await deleteImage(filename);
            showToast('Imagen eliminada correctamente', 'success');
            // Reload images after delete
            await loadImages();
        } catch (err: any) {
            showToast(err.message || 'Error al eliminar imagen', 'error');
        }
    };

    const handleBulkDelete = async (filenames: string[]) => {
        try {
            // Delete images sequentially
            for (const filename of filenames) {
                await deleteImage(filename);
            }
            showToast(`${filenames.length} imágenes eliminadas correctamente`, 'success');
            // Reload images after bulk delete
            await loadImages();
        } catch (err: any) {
            showToast(err.message || 'Error al eliminar imágenes', 'error');
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Imágenes Huérfanas</h1>
                    <p className={styles.subtitle}>
                        Imágenes subidas que no están asociadas a ningún producto
                    </p>
                </div>
                <Button
                    variant="secondary"
                    onClick={() => navigate('/admin')}
                >
                    ← Volver al Panel
                </Button>
            </div>

            {loading && (
                <div className={styles.loading}>
                    <p>Cargando imágenes...</p>
                </div>
            )}

            {error && (
                <div className={styles.error}>
                    <p>⚠️ {error}</p>
                    <Button variant="secondary" size="small" onClick={loadImages}>
                        Reintentar
                    </Button>
                </div>
            )}

            {!loading && !error && (
                <>
                    {images.length > 0 && (
                        <div className={styles.stats}>
                            <p>
                                {images.length} imagen{images.length > 1 ? 'es' : ''} huérfana{images.length > 1 ? 's' : ''} encontrada{images.length > 1 ? 's' : ''}
                            </p>
                        </div>
                    )}

                    <OrphanedImagesList
                        images={images}
                        onDelete={handleDelete}
                        onBulkDelete={handleBulkDelete}
                    />
                </>
            )}
        </div>
    );
};
