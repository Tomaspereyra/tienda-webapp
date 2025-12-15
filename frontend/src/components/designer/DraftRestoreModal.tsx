/**
 * DraftRestoreModal - Modal to restore saved design draft
 */

import React from 'react';
import styles from './DraftRestoreModal.module.css';

interface DraftRestoreModalProps {
    onContinue: () => void;
    onStartFresh: () => void;
}

export const DraftRestoreModal: React.FC<DraftRestoreModalProps> = ({ onContinue, onStartFresh }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Diseño Guardado</h2>
                <p className={styles.message}>
                    Encontramos un diseño guardado anteriormente. ¿Querés continuar editándolo?
                </p>
                <div className={styles.actions}>
                    <button
                        className={styles.primaryButton}
                        onClick={onContinue}
                    >
                        Continuar con el diseño
                    </button>
                    <button
                        className={styles.secondaryButton}
                        onClick={onStartFresh}
                    >
                        Empezar desde cero
                    </button>
                </div>
            </div>
        </div>
    );
};
