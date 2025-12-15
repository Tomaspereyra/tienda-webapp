/**
 * ColorPicker - Simple color selection component
 */

import React from 'react';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
    selectedColor: string;
    onColorChange: (color: string) => void;
}

const PRESET_COLORS = [
    { name: 'Negro', value: '#000000' },
    { name: 'Blanco', value: '#FFFFFF' },
    { name: 'Gris', value: '#666666' },
    { name: 'Azul', value: '#0984E3' },
    { name: 'Rojo', value: '#D63031' },
    { name: 'Verde', value: '#00B894' },
    { name: 'Amarillo', value: '#FDCB6E' },
    { name: 'Dorado', value: '#B8A590' },
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
    selectedColor,
    onColorChange,
}) => {
    return (
        <div className={styles.pickerContainer}>
            <div className={styles.colorGrid}>
                {PRESET_COLORS.map((color) => (
                    <button
                        key={color.value}
                        className={`${styles.colorSwatch} ${selectedColor === color.value ? styles.selected : ''
                            }`}
                        style={{ backgroundColor: color.value }}
                        onClick={() => onColorChange(color.value)}
                        title={color.name}
                        aria-label={color.name}
                    >
                        {selectedColor === color.value && (
                            <span className={styles.checkmark}>✓</span>
                        )}
                    </button>
                ))}
            </div>
            <div className={styles.customColorSection}>
                <label htmlFor="customColor" className={styles.customLabel}>
                    Color personalizado:
                </label>
                <input
                    id="customColor"
                    type="color"
                    value={selectedColor}
                    onChange={(e) => onColorChange(e.target.value)}
                    className={styles.customColorPicker}
                    title="Elige cualquier color"
                />
            </div>
        </div>
    );
};
