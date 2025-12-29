import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductFormData } from '../types';
import { productsService } from '@services/products';
import { AdminNavbar } from '@components/layout/AdminNavbar';
import { ProductForm } from '@components/admin/ProductForm';
import { showToast } from '@components/common/Toast';
import { Gender } from '@utils/constants';
import styles from '@components/admin/ProductForm.module.css';

export const EditProduct: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [initialData, setInitialData] = useState<ProductFormData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) {
                showToast('ID de producto inválido', 'error');
                navigate('/admin');
                return;
            }

            try {
                setLoading(true);
                const product = await productsService.getById(id);
                if (!product) {
                    showToast('Producto no encontrado', 'error');
                    navigate('/admin');
                    return;
                }

                // Convert Product to ProductFormData (exclude id, createdAt, updatedAt)
                const formData: ProductFormData = {
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    images: product.images,
                    sizes: product.sizes as ("S" | "M" | "L" | "XL" | "XXL")[] || [],
                    colors: product.colors || [],
                    gender: (product.gender || 'Hombre') as Gender,
                    category: (product.category || 'Casual') as "Casual" | "Religioso" | "Deportivo",
                    oversize: product.oversize || false,
                    featured: product.featured || false,
                };
                setInitialData(formData);
            } catch (error) {
                showToast('Error al cargar producto', 'error');
                console.error(error);
                navigate('/admin');
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id, navigate]);

    const handleSubmit = async (data: ProductFormData) => {
        if (!id) return;

        try {
            await productsService.update(id, data);
            showToast('Producto actualizado exitosamente', 'success');
            navigate('/admin');
        } catch (error) {
            showToast('Error al actualizar producto', 'error');
            console.error(error);
            throw error;
        }
    };

    if (loading) {
        return (
            <div className={styles.formPage}>
                <AdminNavbar />
                <div className={styles.content}>
                    <div className={styles.loading}>Cargando producto...</div>
                </div>
            </div>
        );
    }

    if (!initialData) {
        return null;
    }

    return (
        <div className={styles.formPage}>
            <AdminNavbar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <a href="/admin" className={styles.backLink}>
                        ← Volver al dashboard
                    </a>
                    <h1 className={styles.title}>Editar Producto</h1>
                </div>
                <ProductForm initialData={initialData} onSubmit={handleSubmit} isEdit />
            </div>
        </div>
    );
};
