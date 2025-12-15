import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import styles from './AdminNavbar.module.css';

export const AdminNavbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <div className={styles.brand}>
                    <span className={styles.brandIcon}>🛍️</span>
                    <h1 className={styles.brandText}>Panel de Administración</h1>
                </div>

                <div className={styles.navActions}>
                    <Link to="/" className={styles.homeLink}>
                        Ver catálogo →
                    </Link>
                    <span className={styles.userInfo}>
                        {user?.email}
                    </span>
                    <button
                        className={styles.logoutButton}
                        onClick={logout}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};
