import React, { useState, useEffect, useCallback } from 'react';
import { Product } from '../../types';
import styles from './ProductCarousel.module.css';

interface ProductCarouselProps {
    products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Don't render if no products
    if (products.length === 0) {
        return null;
    }

    const goToNext = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
    }, [products.length]);

    const goToPrev = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.length - 1 : prevIndex - 1
        );
    }, [products.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    // Auto-advance every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            goToNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [goToNext]);

    return (
        <div className={styles.carousel}>
            <div
                className={styles.slidesContainer}
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {products.map((product) => (
                    <div key={product.id} className={styles.slide}>
                        <div className={styles.imageContainer}>
                            <img
                                src={product.images[0]}
                                alt={product.name}
                                className={styles.productImage}
                                onError={(e) => {
                                    // Fallback image if URL fails to load
                                    (e.target as HTMLImageElement).src =
                                        'https://via.placeholder.com/500x400?text=Imagen+No+Disponible';
                                }}
                            />
                        </div>
                        <div className={styles.productInfo}>
                            <h2 className={styles.productName}>{product.name}</h2>
                            <p className={styles.productPrice}>
                                ${product.price.toLocaleString('es-AR')}
                            </p>
                            <p className={styles.productDescription}>{product.description}</p>
                            <div className={styles.productMeta}>
                                {product.sizes && product.sizes.length > 0 && (
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Talles</span>
                                        <span className={styles.metaValue}>{product.sizes.join(', ')}</span>
                                    </div>
                                )}
                                {product.colors && product.colors.length > 0 && (
                                    <div className={styles.metaItem}>
                                        <span className={styles.metaLabel}>Colores</span>
                                        <span className={styles.metaValue}>{product.colors.join(', ')}</span>
                                    </div>
                                )}
                                <div className={styles.metaItem}>
                                    <span className={styles.metaLabel}>Categoría</span>
                                    <span className={styles.metaValue}>{product.category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={goToPrev}
                aria-label="Producto anterior"
            >
                ‹
            </button>
            <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={goToNext}
                aria-label="Siguiente producto"
            >
                ›
            </button>

            {/* Indicators */}
            <div className={styles.indicators}>
                {products.map((_, index) => (
                    <button
                        key={index}
                        className={`${styles.indicator} ${index === currentIndex ? styles.active : ''
                            }`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir al producto ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
