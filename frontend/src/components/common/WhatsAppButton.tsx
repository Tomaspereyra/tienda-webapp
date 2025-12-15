import React from 'react';
import { Product } from '../../types';
import { CONTACT_INFO } from '../../config/contact';
import { WhatsAppIcon } from '@components/icons/WhatsAppIcon';
import styles from './WhatsAppButton.module.css';

interface WhatsAppButtonProps {
    product: Product;
    className?: string;
}

/**
 * WhatsApp Contact Button
 * 
 * Generates a WhatsApp Web/App link with pre-filled message containing:
 * - Product name
 * - Product price (formatted)
 * - Current page URL
 */
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ product, className = '' }) => {
    const generateWhatsAppLink = (): string => {
        const { phoneNumber, defaultMessage } = CONTACT_INFO.whatsapp;

        // Build pre-filled message
        const message = `${defaultMessage}\n\n${product.name}\nPrecio: $${product.price.toLocaleString('es-AR')}\n\n${window.location.href}`;

        // Generate WhatsApp Web URL with encoded message
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

        return whatsappUrl;
    };

    const whatsappLink = generateWhatsAppLink();

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.whatsappButton} ${className}`}
            aria-label={`Consultar sobre ${product.name} por WhatsApp`}
        >
            <WhatsAppIcon size={20} className={styles.icon} />
            <span className={styles.text}>Consultar por WhatsApp</span>
        </a>
    );
};
