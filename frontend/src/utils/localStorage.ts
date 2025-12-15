/**
 * LocalStorage utilities for persisting design drafts
 */

import { CustomDesign } from '../types/designer';

const STORAGE_KEY = 'tshirt-design-draft';

/**
 * Save design draft to localStorage
 */
export const saveDesignDraft = (design: CustomDesign): boolean => {
    try {
        const serialized = JSON.stringify(design);
        localStorage.setItem(STORAGE_KEY, serialized);
        return true;
    } catch (error) {
        if (error instanceof Error && error.name === 'QuotaExceededError') {
            console.error('LocalStorage quota exceeded. Unable to save design draft.');
            alert(
                '⚠️ Sin espacio de almacenamiento\n\n' +
                'El navegador está sin espacio para guardar tu diseño.\n\n' +
                'Soluciones:\n' +
                '• Limpiá el historial y caché del navegador\n' +
                '• Usá un navegador diferente\n' +
                '• Exportá tu diseño por WhatsApp ahora'
            );
        } else {
            console.error('Error saving design draft:', error);
            alert('⚠️ Error al guardar\n\nNo se pudo guardar tu diseño. Por favor, intentá exportarlo por WhatsApp.');
        }
        return false;
    }
};

/**
 * Load design draft from localStorage
 */
export const loadDesignDraft = (): CustomDesign | null => {
    try {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (!serialized) {
            return null;
        }

        const design = JSON.parse(serialized) as CustomDesign;

        // Convert date strings back to Date objects if they exist
        if (design.createdAt) {
            design.createdAt = new Date(design.createdAt);
        }
        if (design.updatedAt) {
            design.updatedAt = new Date(design.updatedAt);
        }

        return design;
    } catch (error) {
        console.error('Error loading design draft:', error);
        // Clear corrupted data
        clearDesignDraft();
        return null;
    }
};

/**
 * Clear design draft from localStorage
 */
export const clearDesignDraft = (): void => {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error clearing design draft:', error);
    }
};
