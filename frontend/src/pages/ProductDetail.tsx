import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { productsService } from '@services/products';
import { Footer } from '@components/layout/Footer';
import { WhatsAppButton } from '@components/common/WhatsAppButton';
import styles from './ProductDetail.module.css';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageError, setImageError] = useState<boolean[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                setError('ID de producto no válido');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const productData = await productsService.getById(id);

                if (!productData) {
                    setError('Producto no encontrado');
                } else {
                    setProduct(productData);
                    setImageError(new Array(productData.images.length).fill(false));
                    setSelectedImageIndex(0); // Reset to first image
                }
            } catch (err) {
                console.error('Error loading product:', err);
                setError('Error al cargar el producto');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleImageError = (index: number) => {
        setImageError((prev) => {
            const newErrors = [...prev];
            newErrors[index] = true;
            return newErrors;
        });
    };

    const handleThumbnailClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    // Loading state
    if (loading) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.loadingContainer}>
                    <div className={styles.loading}>Cargando producto...</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !product) {
        return (
            <div className={styles.pageContainer}>
                <div className={styles.errorContainer}>
                    <h2 className={styles.errorTitle}>Producto no encontrado</h2>
                    <p className={styles.errorMessage}>
                        {error || 'No pudimos encontrar el producto que estás buscando'}
                    </p>
                    <Link to="/" className={styles.backButton}>
                        Volver al catálogo
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <Link to="/" className={styles.backLink}>
                    ← Volver al catálogo
                </Link>
            </div>

            <div className={styles.productContainer}>
                {/* Left Column - Images */}
                <div className={styles.imagesSection}>
                    {product.images.length > 0 && (
                        <div className={styles.imageGallery}>
                            <div className={styles.mainImageContainer}>
                                {!imageError[selectedImageIndex] ? (
                                    <img
                                        src={product.images[selectedImageIndex]}
                                        alt={product.name}
                                        className={styles.mainImage}
                                        onError={() => handleImageError(selectedImageIndex)}
                                    />
                                ) : (
                                    <div className={styles.imagePlaceholder}>
                                        Imagen no disponible
                                    </div>
                                )}
                            </div>

                            {/* Thumbnails if more than 1 image */}
                            {product.images.length > 1 && (
                                <div className={styles.thumbnails}>
                                    {product.images.map((image, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.thumbnailContainer} ${index === selectedImageIndex ? styles.thumbnailActive : ''}`}
                                            onClick={() => handleThumbnailClick(index)}
                                        >
                                            {!imageError[index] ? (
                                                <img
                                                    src={image}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className={styles.thumbnail}
                                                    onError={() => handleImageError(index)}
                                                />
                                            ) : (
                                                <div className={styles.thumbnailPlaceholder}>
                                                    N/A
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Right Column - Details */}
                <div className={styles.detailsSection}>
                    {/* Badges */}
                    <div className={styles.badges}>
                        {product.featured && (
                            <span className={styles.badge}>Destacado</span>
                        )}
                        {product.oversize && (
                            <span className={styles.badge}>Oversize</span>
                        )}
                    </div>

                    {/* Product Name */}
                    <h1 className={styles.productName}>{product.name}</h1>

                    {/* Price */}
                    <p className={styles.productPrice}>
                        ${product.price.toLocaleString('es-AR')}
                    </p>

                    {/* Description */}
                    <div className={styles.description}>
                        <p>{product.description}</p>
                    </div>

                    {/* Product Attributes */}
                    <div className={styles.attributes}>
                        <div className={styles.attribute}>
                            <span className={styles.attributeLabel}>Talles disponibles:</span>
                            <span className={styles.attributeValue}>
                                {product.sizes?.join(', ') || 'No especificado'}
                            </span>
                        </div>

                        <div className={styles.attribute}>
                            <span className={styles.attributeLabel}>Colores disponibles:</span>
                            <span className={styles.attributeValue}>
                                {product.colors?.join(', ') || 'No especificado'}
                            </span>
                        </div>

                        <div className={styles.attribute}>
                            <span className={styles.attributeLabel}>Género:</span>
                            <span className={styles.attributeValue}>{product.gender}</span>
                        </div>

                        <div className={styles.attribute}>
                            <span className={styles.attributeLabel}>Categoría:</span>
                            <span className={styles.attributeValue}>{product.category}</span>
                        </div>
                    </div>

                    {/* WhatsApp Button */}
                    <div className={styles.ctaSection}>
                        <WhatsAppButton product={product} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};
