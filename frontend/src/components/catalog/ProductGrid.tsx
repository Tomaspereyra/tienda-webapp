import React, { useState } from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { Button } from '@components/common/Button';
import styles from './ProductGrid.module.css';

interface ProductGridProps {
    products: Product[];
    productsPerPage?: number;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    productsPerPage = 12
}) => {
    const [displayCount, setDisplayCount] = useState(productsPerPage);

    if (products.length === 0) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>📦</div>
                <h3 className={styles.emptyStateTitle}>No hay productos disponibles</h3>
                <p className={styles.emptyStateMessage}>
                    Vuelve pronto para ver nuestras nuevas colecciones
                </p>
            </div>
        );
    }

    const displayedProducts = products.slice(0, displayCount);
    const hasMore = displayCount < products.length;

    const loadMore = () => {
        setDisplayCount(prev => Math.min(prev + productsPerPage, products.length));
    };

    return (
        <>
            <div className={styles.grid}>
                {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {hasMore && (
                <div className={styles.loadMoreContainer}>
                    <Button onClick={loadMore} variant="secondary" size="large">
                        Cargar más productos ({products.length - displayCount} restantes)
                    </Button>
                </div>
            )}
        </>
    );
};
