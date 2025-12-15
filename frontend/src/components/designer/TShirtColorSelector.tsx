/**
 * TShirtColorSelector - Component for selecting t-shirt base color
 */

import React from 'react';
import { TSHIRT_COLORS } from '../../data/tshirtColors';
import { useDesign } from '../../context/DesignContext';
import styles from './TShirtColorSelector.module.css';

export const TShirtColorSelector: React.FC = () => {
    const { design, changeShirtColor } = useDesign();

    return (
        <div className={styles.selectorContainer}>
            <h3 className={styles.title}>Color de Remera</h3>
            <div className={styles.colorGrid}>
                {TSHIRT_COLORS.map((color) => (
                    <button
                        key={color.name}
                        className={`${styles.colorButton} ${design.shirtColor.name === color.name ? styles.selected : ''
                            }`}
                        onClick={() => changeShirtColor(color)}
                        title={color.name}
                        aria-label={`Remera ${color.name}`}
                    >
                        <div
                            className={styles.colorSwatch}
                            style={{
                                backgroundColor: color.hexValue,
                                border: color.hexValue === '#FFFFFF' ? '1px solid #E0E0E0' : 'none'
                            }}
                        />
                        <span className={styles.colorName}>{color.name}</span>
                        {design.shirtColor.name === color.name && (
                            <span className={styles.checkmark}>✓</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
