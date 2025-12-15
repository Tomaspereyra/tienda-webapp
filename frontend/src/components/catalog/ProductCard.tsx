import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.style.display = 'none';
        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
        if (fallback) {
            fallback.style.display = 'flex';
        }
    };

    return (
        <Link to={`/product/${product.id}`} className={styles.cardLink}>
            <div className={styles.card}>
                <div className={styles.imageContainer}>
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className={styles.productImage}
                        onError={handleImageError}
                    />
                    <div className={styles.fallbackImage} style={{ display: 'none' }}>
                        Imagen no disponible
                    </div>
                    {product.featured && <div className={styles.badge}>Destacado</div>}
                </div>

                <div className={styles.cardContent}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>
                        ${product.price.toLocaleString('es-AR')}
                    </p>

                    <div className={styles.productMeta}>
                        {product.sizes && product.sizes.length > 0 && (
                            <div className={styles.metaRow}>
                                <span className={styles.metaLabel}>Talles:</span>
                                <span className={styles.metaValue}>{product.sizes.join(', ')}</span>
                            </div>
                        )}
                        {product.colors && product.colors.length > 0 && (
                            <div className={styles.metaRow}>
                                <span className={styles.metaLabel}>Colores:</span>
                                <span className={styles.metaValue}>
                                    {product.colors.length} {product.colors.length === 1 ? 'color' : 'colores'}
                                </span>
                            </div>
                        )}
                        <div className={styles.metaRow}>
                            <span className={styles.metaLabel}>Categoría:</span>
                            <span className={styles.metaValue}>{product.category}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
