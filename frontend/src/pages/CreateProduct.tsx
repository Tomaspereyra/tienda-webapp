import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductFormData } from '../types';
import { productsService } from '@services/products';
import { AdminNavbar } from '@components/layout/AdminNavbar';
import { ProductForm } from '@components/admin/ProductForm';
import { showToast } from '@components/common/Toast';
import styles from '@components/admin/ProductForm.module.css';

export const CreateProduct: React.FC = () => {
    const navigate = useNavigate();

    const handleSubmit = async (data: ProductFormData) => {
        try {
            await productsService.create(data);
            showToast('Producto creado exitosamente', 'success');
            navigate('/admin');
        } catch (error) {
            showToast('Error al crear producto', 'error');
            console.error(error);
            throw error; // Re-throw to keep form in submitting state
        }
    };

    return (
        <div className={styles.formPage}>
            <AdminNavbar />
            <div className={styles.content}>
                <div className={styles.header}>
                    <a href="/admin" className={styles.backLink}>
                        ← Volver al dashboard
                    </a>
                    <h1 className={styles.title}>Crear Nuevo Producto</h1>
                </div>
                <ProductForm onSubmit={handleSubmit} />
            </div>
        </div>
    );
};
