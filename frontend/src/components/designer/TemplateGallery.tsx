/**
 * TemplateGallery - Display grid of design templates
 */

import React from 'react';
import { DESIGN_TEMPLATES } from '../../data/designTemplates';
import { DesignTemplate } from '../../types/designer';
import { useDesign } from '../../context/DesignContext';
import styles from './TemplateGallery.module.css';

export const TemplateGallery: React.FC = () => {
    const { design, selectTemplate } = useDesign();

    const handleSelectTemplate = (template: DesignTemplate) => {
        selectTemplate(template);
    };

    return (
        <div className={styles.galleryContainer}>
            <h3 className={styles.galleryTitle}>Elegí una Plantilla</h3>
            <div className={styles.grid}>
                {DESIGN_TEMPLATES.map((template) => (
                    <div
                        key={template.id}
                        className={`${styles.card} ${design.templateId === template.id ? styles.selected : ''
                            }`}
                        onClick={() => handleSelectTemplate(template)}
                    >
                        <div className={styles.imageContainer}>
                            <img
                                src={template.imageUrl}
                                alt={template.name}
                                className={styles.image}
                                onError={(e) => {
                                    // Fallback for broken images
                                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="250" viewBox="0 0 200 250"%3E%3Crect fill="%23f0f0f0" width="200" height="250"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="14" fill="%23999"%3ENo disponible%3C/text%3E%3C/svg%3E';
                                }}
                            />
                        </div>
                        <div className={styles.info}>
                            <h4 className={styles.name}>{template.name}</h4>
                            {template.category && (
                                <span className={styles.category}>{template.category}</span>
                            )}
                        </div>
                        {design.templateId === template.id && (
                            <div className={styles.selectedBadge}>✓ Seleccionada</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
