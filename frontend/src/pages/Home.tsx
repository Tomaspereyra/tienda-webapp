import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { productsService } from '@services/products';
import { ProductCarousel } from '@components/catalog/ProductCarousel';
import { ProductGrid } from '@components/catalog/ProductGrid';
import { Filters, FilterValues } from '@components/catalog/Filters';
import { ProductGridSkeleton } from '@components/common/Skeleton';
import { Footer } from '@components/layout/Footer';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize filter state from URL params
    const [filters, setFilters] = useState<FilterValues>(() => {
        const genderParam = searchParams.get('gender');
        return {
            gender: genderParam || '',
            oversize: null,
        };
    });

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const [featuredResponse, allResponse] = await Promise.all([
                    productsService.getFeatured(),
                    productsService.getAll(),
                ]);
                setFeaturedProducts(featuredResponse.products);
                setAllProducts(allResponse.products);
            } catch (err) {
                setError('Error al cargar productos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Apply filters to products (memoized for performance)
    const filteredProducts = useMemo(() => {
        let filtered = allProducts;

        if (filters.gender) {
            filtered = filtered.filter((p) => p.gender === filters.gender);
        }



        if (filters.oversize === true) {
            filtered = filtered.filter((p) => p.oversize === true);
        }

        return filtered;
    }, [allProducts, filters]);

    return (
        <div className={styles.homePage}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <div className={styles.headerContent}>
                        <img
                            src="/virgen-maria.png"
                            alt="Virgen María Inmaculada"
                            className={styles.headerImage}
                        />
                        <div className={styles.headerText}>
                            <h1 className={styles.headerTitle}>Tienda Inmaculada</h1>
                            <p className={styles.headerSubtitle}>
                                Descubrí nuestra colección de remeras
                            </p>
                        </div>
                    </div>
                </div>
            </header>

            <div className={styles.content}>
                {/* Loading and Error States */}
                {loading ? (
                    <div className="container">
                        <ProductGridSkeleton count={6} />
                    </div>
                ) : error ? (
                    <div className={styles.error}>{error}</div>
                ) : (
                    <>
                        {/* Featured Products Carousel Section - NOT affected by filters */}
                        {featuredProducts.length > 0 && (
                            <section className={styles.section}>
                                <h2 className={styles.sectionTitle}>Productos Destacados</h2>
                                <ProductCarousel products={featuredProducts} />
                            </section>
                        )}

                        {/* Filters Section */}
                        <section className={styles.section}>
                            <Filters
                                filters={filters}
                                onFilterChange={setFilters}
                                resultsCount={filteredProducts.length}
                            />
                        </section>

                        {/* Product Grid Section - affected by filters */}
                        <section className={styles.section}>
                            <h2 className={styles.sectionTitle}>
                                {filters.gender || filters.oversize
                                    ? 'Resultados de la Búsqueda'
                                    : 'Todos los Productos'}
                            </h2>
                            {filteredProducts.length === 0 ? (
                                <div className={styles.emptyFiltersMessage}>
                                    No se encontraron productos con estos filtros.
                                    Probá con otros criterios.
                                </div>
                            ) : (
                                <ProductGrid products={filteredProducts} />
                            )}
                        </section>
                    </>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};
