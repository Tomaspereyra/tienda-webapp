import React, { useState, useEffect, useCallback } from 'react';
import styles from './Toast.module.css';

type ToastType = 'success' | 'error' | 'warning';

interface ToastMessage {
    id: string;
    message: string;
    type: ToastType;
}

let addToastFn: ((message: string, type: ToastType) => void) | null = null;

export const showToast = (message: string, type: ToastType = 'success') => {
    if (addToastFn) {
        addToastFn(message, type);
    }
};

export const Toast: React.FC = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((message: string, type: ToastType) => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    useEffect(() => {
        addToastFn = addToast;
        return () => {
            addToastFn = null;
        };
    }, [addToast]);

    if (toasts.length === 0) return null;

    return (
        <div className={styles.toastContainer}>
            {toasts.map((toast) => (
                <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
                    <span className={styles.message}>{toast.message}</span>
                    <button
                        className={styles.closeButton}
                        onClick={() => removeToast(toast.id)}
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};
