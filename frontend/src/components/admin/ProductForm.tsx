import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ProductFormData } from '../../types';
import { UploadedImage } from '../../types/upload';
import { GENDERS, CATEGORIES, SIZES } from '@utils/constants';
import { productValidation } from '@utils/validation';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { ImageUploadField } from './ImageUploadField';
import styles from './ProductForm.module.css';

interface ProductFormProps {
    initialData?: ProductFormData;
    onSubmit: (data: ProductFormData) => Promise<void>;
    isEdit?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
    initialData,
    onSubmit,
    isEdit = false,
}) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>(
        initialData?.images
            ? initialData.images.map((url) => ({ url, progress: 100, uploading: false }))
            : []
    );

    // Warn user about unsaved changes
    useEffect(() => {
        const hasUploading = uploadedImages.some((img) => img.uploading);

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUploading) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [uploadedImages]);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProductFormData>({
        defaultValues: initialData || {
            name: '',
            description: '',
            price: 0,
            images: [''],
            sizes: [],
            colors: [''],
            gender: 'Hombre',
            category: 'Casual',
            oversize: false,
            featured: false,
        },
    });

    const colors = watch('colors') || [''];

    const addColorField = () => {
        setValue('colors', [...colors, '']);
    };

    const removeColorField = (index: number) => {
        const newColors = colors.filter((_, i) => i !== index);
        setValue('colors', newColors.length > 0 ? newColors : ['']);
    };

    const handleFormSubmit = async (data: ProductFormData) => {
        try {
            setIsSubmitting(true);
            // Extract URLs from uploaded images
            const imageUrls = uploadedImages
                .filter((img) => img.url && !img.error)
                .map((img) => img.url);

            // Validate at least one image
            if (imageUrls.length === 0) {
                alert('Debes subir al menos una imagen');
                return;
            }

            const cleanedData = {
                ...data,
                images: imageUrls,
                colors: data.colors.filter((color) => color.trim() !== ''),
            };
            await onSubmit(cleanedData);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className={styles.formCard}>
                {/* Basic Information */}
                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Información Básica</h3>
                    <div className={styles.formGrid}>
                        <div className={styles.formGridFull}>
                            <Input
                                label="Nombre del Producto *"
                                placeholder="Ej: Remera Oversize Negra"
                                error={errors.name?.message}
                                {...register('name', productValidation.name)}
                            />
                        </div>

                        <div className={styles.formGridFull}>
                            <Input
                                label="Descripción *"
                                placeholder="Descripción detallada del producto..."
                                isTextarea
                                error={errors.description?.message}
                                {...register('description', productValidation.description)}
                            />
                        </div>

                        <Input
                            label="Precio *"
                            type="number"
                            placeholder="15000"
                            error={errors.price?.message}
                            {...register('price', {
                                ...productValidation.price,
                                valueAsNumber: true,
                            })}
                        />

                        <div>
                            <label className={styles.checkboxLabel}>Categoría *</label>
                            <select
                                className={styles.select}
                                {...register('category', productValidation.category)}
                                style={{
                                    fontFamily: 'var(--font-family)',
                                    fontSize: 'var(--font-size-sm)',
                                    padding: 'var(--spacing-2)',
                                    border: '1px solid var(--color-bg-tertiary)',
                                    borderRadius: '4px',
                                    width: '100%',
                                    marginTop: 'var(--spacing-1)',
                                }}
                            >
                                {CATEGORIES.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={styles.checkboxLabel}>Género *</label>
                            <select
                                className={styles.select}
                                {...register('gender', productValidation.gender)}
                                style={{
                                    fontFamily: 'var(--font-family)',
                                    fontSize: 'var(--font-size-sm)',
                                    padding: 'var(--spacing-2)',
                                    border: '1px solid var(--color-bg-tertiary)',
                                    borderRadius: '4px',
                                    width: '100%',
                                    marginTop: 'var(--spacing-1)',
                                }}
                            >
                                {GENDERS.map((gen) => (
                                    <option key={gen} value={gen}>
                                        {gen}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className={styles.checkboxGroup}>
                        <div className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                id="oversize"
                                className={styles.checkbox}
                                {...register('oversize')}
                            />
                            <label htmlFor="oversize" className={styles.checkboxLabel}>
                                Oversize
                            </label>
                        </div>

                        <div className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                id="featured"
                                className={styles.checkbox}
                                {...register('featured')}
                            />
                            <label htmlFor="featured" className={styles.checkboxLabel}>
                                Destacado (aparecerá en el carousel)
                            </label>
                        </div>
                    </div>
                </div>

                {/* Sizes */}
                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Talles Disponibles *</h3>
                    <Controller
                        name="sizes"
                        control={control}
                        rules={productValidation.sizes}
                        render={({ field }) => (
                            <div className={styles.checkboxGroup}>
                                {SIZES.map((size) => (
                                    <div key={size} className={styles.checkboxItem}>
                                        <input
                                            type="checkbox"
                                            id={`size-${size}`}
                                            className={styles.checkbox}
                                            checked={field.value.includes(size)}
                                            onChange={(e) => {
                                                const newSizes = e.target.checked
                                                    ? [...field.value, size]
                                                    : field.value.filter((s) => s !== size);
                                                field.onChange(newSizes);
                                            }}
                                        />
                                        <label htmlFor={`size-${size}`} className={styles.checkboxLabel}>
                                            {size}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    />
                    {errors.sizes && (
                        <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-xs)' }}>
                            {errors.sizes.message}
                        </p>
                    )}
                </div>

                {/* Colors */}
                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Colores Disponibles *</h3>
                    <div className={styles.imagesSection}>
                        {colors.map((_, index) => (
                            <div key={index} className={styles.imageInputRow}>
                                <div className={styles.imageInput}>
                                    <Input
                                        placeholder="Ej: Negro, Gris melange"
                                        error={errors.colors?.[index]?.message}
                                        {...register(`colors.${index}` as const)}
                                    />
                                </div>
                                {colors.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="danger"
                                        size="small"
                                        onClick={() => removeColorField(index)}
                                        className={styles.removeImageButton}
                                    >
                                        Eliminar
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="secondary"
                            size="small"
                            onClick={addColorField}
                            className={styles.addImageButton}
                        >
                            + Agregar Color
                        </Button>
                    </div>
                </div>

                {/* Images */}
                <div className={styles.formSection}>
                    <h3 className={styles.sectionTitle}>Imágenes del Producto *</h3>
                    <ImageUploadField
                        images={uploadedImages}
                        onChange={setUploadedImages}
                        maxImages={4}
                    />
                </div>

                {/* Actions */}
                <div className={styles.actions}>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate('/admin')}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Guardando...' : isEdit ? 'Actualizar Producto' : 'Crear Producto'}
                    </Button>
                </div>
            </div>
        </form>
    );
};
