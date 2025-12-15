import React, { useState } from 'react';
import { Button } from '@components/common/Button';
import styles from './OrphanedImagesList.module.css';

interface OrphanedImage {
    filename: string;
    url: string;
    size: number;
    uploadedAt: string;
}

interface OrphanedImagesListProps {
    images: OrphanedImage[];
    onDelete: (filename: string) => Promise<void>;
    onBulkDelete: (filenames: string[]) => Promise<void>;
}

export const OrphanedImagesList: React.FC<OrphanedImagesListProps> = ({
    images,
    onDelete,
    onBulkDelete,
}) => {
    const [selected, setSelected] = useState<Set<string>>(new Set());
    const [deleting, setDeleting] = useState<string | null>(null);
    const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);
    const [confirmingBulkDelete, setConfirmingBulkDelete] = useState(false);

    const handleSelectAll = () => {
        if (selected.size === images.length) {
            setSelected(new Set());
        } else {
            setSelected(new Set(images.map(img => img.filename)));
        }
    };

    const handleSelect = (filename: string) => {
        const newSelected = new Set(selected);
        if (newSelected.has(filename)) {
            newSelected.delete(filename);
        } else {
            newSelected.add(filename);
        }
        setSelected(newSelected);
    };

    const handleDeleteClick = (filename: string) => {
        setConfirmingDelete(filename);
    };

    const handleConfirmDelete = async () => {
        if (!confirmingDelete) return;

        console.log('User confirmed, deleting:', confirmingDelete);
        setDeleting(confirmingDelete);
        const filename = confirmingDelete;
        setConfirmingDelete(null);

        try {
            await onDelete(filename);
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setDeleting(null);
        }
    };

    const handleCancelDelete = () => {
        setConfirmingDelete(null);
    };

    const handleBulkDeleteClick = () => {
        if (selected.size === 0) return;
        setConfirmingBulkDelete(true);
    };

    const handleConfirmBulkDelete = async () => {
        setDeleting('bulk');
        setConfirmingBulkDelete(false);

        try {
            await onBulkDelete(Array.from(selected));
            setSelected(new Set());
        } catch (error) {
            console.error('Bulk delete failed:', error);
        } finally {
            setDeleting(null);
        }
    };

    const handleCancelBulkDelete = () => {
        setConfirmingBulkDelete(false);
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (images.length === 0) {
        return (
            <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>🎉</span>
                <h3>No hay imágenes huérfanas</h3>
                <p>Todas las imágenes subidas están siendo utilizadas por productos.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.toolbar}>
                <div className={styles.selectAll}>
                    <input
                        type="checkbox"
                        checked={selected.size === images.length}
                        onChange={handleSelectAll}
                        className={styles.checkbox}
                    />
                    <span>
                        {selected.size > 0 ? `${selected.size} seleccionada${selected.size > 1 ? 's' : ''}` : 'Seleccionar todas'}
                    </span>
                </div>

                {selected.size > 0 && (
                    confirmingBulkDelete ? (
                        <div className={styles.bulkConfirm}>
                            <span className={styles.confirmMessage}>
                                ¿Eliminar {selected.size} imagen{selected.size > 1 ? 'es' : ''}?
                            </span>
                            <Button
                                variant="danger"
                                size="small"
                                onClick={handleConfirmBulkDelete}
                                disabled={deleting === 'bulk'}
                            >
                                ✓ Sí
                            </Button>
                            <Button
                                variant="secondary"
                                size="small"
                                onClick={handleCancelBulkDelete}
                            >
                                ✗ No
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="danger"
                            size="small"
                            onClick={handleBulkDeleteClick}
                            disabled={deleting === 'bulk'}
                        >
                            {deleting === 'bulk' ? 'Eliminando...' : `🗑️ Eliminar ${selected.size}`}
                        </Button>
                    )
                )}
            </div>

            <div className={styles.grid}>
                {images.map((image) => (
                    <div key={image.filename} className={styles.card}>
                        <div className={styles.imageContainer}>
                            <input
                                type="checkbox"
                                checked={selected.has(image.filename)}
                                onChange={() => handleSelect(image.filename)}
                                className={styles.cardCheckbox}
                            />
                            <img
                                src={image.url}
                                alt={image.filename}
                                className={styles.image}
                            />
                        </div>

                        <div className={styles.info}>
                            <p className={styles.filename} title={image.filename}>
                                {image.filename}
                            </p>
                            <div className={styles.meta}>
                                <span>{formatSize(image.size)}</span>
                                <span>•</span>
                                <span>{formatDate(image.uploadedAt)}</span>
                            </div>
                        </div>

                        {confirmingDelete === image.filename ? (
                            <div className={styles.confirmButtons}>
                                <Button
                                    variant="danger"
                                    size="small"
                                    onClick={handleConfirmDelete}
                                    disabled={deleting === image.filename}
                                >
                                    ✓ Sí
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={handleCancelDelete}
                                >
                                    ✗ No
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="danger"
                                size="small"
                                onClick={() => handleDeleteClick(image.filename)}
                                disabled={deleting === image.filename}
                                className={styles.deleteButton}
                            >
                                {deleting === image.filename ? '...' : '🗑️'}
                            </Button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
