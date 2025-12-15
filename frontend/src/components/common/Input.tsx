import React, { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    label?: string;
    error?: string;
    isTextarea?: boolean;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    isTextarea = false,
    className = '',
    ...props
}) => {
    const inputClasses = [
        styles.input,
        isTextarea && styles.textarea,
        error && styles.error,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={styles.inputWrapper}>
            {label && <label className={styles.label}>{label}</label>}
            {isTextarea ? (
                <textarea className={inputClasses} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
            ) : (
                <input className={inputClasses} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
            )}
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};
