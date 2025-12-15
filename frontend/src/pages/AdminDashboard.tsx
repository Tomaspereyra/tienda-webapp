import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { productsService } from '@services/products';
import { AdminNavbar } from '@components/layout/AdminNavbar';
import { Input } from '@components/common/Input';
import { Button } from '@components/common/Button';
import { TableSkeleton } from '@components/common/Skeleton';
import { showToast } from '@components/common/Toast';
import styles from './AdminDashboard.module.css';

export const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        // Filter products based on search query
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    const loadProducts = async () => {
        try {
            setLoading(true);
            const response = await productsService.getAll();
            setProducts(response.products);
            setFilteredProducts(response.products);
        } catch (error) {
            showToast('Error al cargar productos', 'error');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!window.confirm(`¿Estás seguro de eliminar "${name}"?`)) {
            return;
        }

        try {
            await productsService.delete(id);
            showToast('Producto eliminado exitosamente', 'success');
            loadProducts(); // Reload list
        } catch (error) {
            showToast('Error al eliminar producto', 'error');
            console.error(error);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/admin/products/${id}/edit`);
    };

    const handleCreate = () => {
        navigate('/admin/products/new');
    };

    const featuredCount = products.filter((p) => p.featured).length;
    const avgPrice =
        products.length > 0
            ? Math.round(
                products.reduce((sum, p) => sum + p.price, 0) / products.length
            )
            : 0;

    return (
        <div className={styles.dashboardPage}>
            <AdminNavbar />

            <div className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>Panel de Administración</h1>
                        <div className={styles.actions}>
                            <Button
                                variant="secondary"
                                onClick={() => navigate('/admin/images/orphaned')}
                            >
                                🖼️ Imágenes Huérfanas
                            </Button>
                            <Button variant="primary" onClick={handleCreate}>
                                + Nuevo Producto
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className={styles.statsRow}>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Total Productos</div>
                            <div className={styles.statValue}>{products.length}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Destacados</div>
                            <div className={styles.statValue}>{featuredCount}</div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statLabel}>Precio Promedio</div>
                            <div className={styles.statValue}>${avgPrice.toLocaleString()}</div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className={styles.searchSection}>
                        <div className={styles.searchInput}>
                            <Input
                                placeholder="Buscar productos por nombre..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        {searchQuery && (
                            <Button variant="secondary" onClick={() => setSearchQuery('')}>
                                Limpiar búsqueda
                            </Button>
                        )}
                    </div>

                    {/* Products Table */}
                    {loading ? (
                        <TableSkeleton rows={5} columns={6} />
                    ) : filteredProducts.length === 0 ? (
                        <div className={styles.emptyState}>
                            {searchQuery
                                ? `No se encontraron productos con "${searchQuery}"`
                                : 'No hay productos. Creá el primero!'}
                        </div>
                    ) : (
                        <div className={styles.tableContainer}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Categoría</th>
                                        <th>Género</th>
                                        <th>Destacado</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id}>
                                            <td className={styles.productName}>{product.name}</td>
                                            <td>${product.price.toLocaleString('es-AR')}</td>
                                            <td>{product.category}</td>
                                            <td>{product.gender}</td>
                                            <td>
                                                <span
                                                    className={`${styles.badge} ${product.featured ? styles.badgeYes : styles.badgeNo
                                                        }`}
                                                >
                                                    {product.featured ? 'Sí' : 'No'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className={styles.actions}>
                                                    <Button
                                                        variant="secondary"
                                                        size="small"
                                                        onClick={() => handleEdit(product.id)}
                                                    >
                                                        Editar
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="small"
                                                        onClick={() => handleDelete(product.id, product.name)}
                                                    >
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div> {/* Close styles.container */}
            </div>
        </div>
    );
};
