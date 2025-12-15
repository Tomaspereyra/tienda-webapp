/**
 * TextControls - Controls for adding and editing text
 */

import React, { useState, useEffect } from 'react';
import { useDesign } from '../../context/DesignContext';
import { ColorPicker } from './ColorPicker';
import { AVAILABLE_FONTS } from '../../data/fonts';
import { preloadFonts } from '../../utils/fontLoader';
import styles from './TextControls.module.css';

export const TextControls: React.FC = () => {
    const { design, addText, updateText, deleteText } = useDesign();
    const [selectedTextId, setSelectedTextId] = useState<string | null>(null);

    const selectedText = design.textElements.find((t) => t.id === selectedTextId);

    // Preload fonts on component mount
    useEffect(() => {
        preloadFonts(AVAILABLE_FONTS).catch(err => {
            console.error('Failed to preload fonts:', err);
        });
    }, []);

    const handleAddText = () => {
        addText('Mi texto');
        // Select the newly added text
        setTimeout(() => {
            if (design.textElements.length > 0) {
                setSelectedTextId(design.textElements[design.textElements.length - 1].id);
            }
        }, 100);
    };

    const handleContentChange = (content: string) => {
        if (selectedTextId) {
            updateText(selectedTextId, { content });
        }
    };

    const handleFontSizeChange = (fontSize: number) => {
        if (selectedTextId) {
            updateText(selectedTextId, { fontSize });
        }
    };

    const handleColorChange = (color: string) => {
        if (selectedTextId) {
            updateText(selectedTextId, { color });
        }
    };

    const handleFontChange = (fontFamily: string) => {
        if (selectedTextId) {
            updateText(selectedTextId, { fontFamily });
        }
    };

    const handleDelete = () => {
        if (selectedTextId) {
            deleteText(selectedTextId);
            setSelectedTextId(null);
        }
    };

    return (
        <div className={styles.controlsContainer}>
            <h3 className={styles.title}>Texto</h3>

            <button onClick={handleAddText} className={styles.addButton}>
                + Agregar Texto
            </button>

            {design.textElements.length > 0 && (
                <div className={styles.textList}>
                    <label className={styles.label}>Textos en el diseño:</label>
                    {design.textElements.map((text) => (
                        <div
                            key={text.id}
                            className={`${styles.textItem} ${selectedTextId === text.id ? styles.selected : ''
                                }`}
                            onClick={() => setSelectedTextId(text.id)}
                        >
                            <span className={styles.textPreview}>
                                {text.content || '(vacío)'}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {selectedText && (
                <div className={styles.editSection}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Contenido:</label>
                        <input
                            type="text"
                            value={selectedText.content}
                            onChange={(e) => handleContentChange(e.target.value)}
                            className={styles.input}
                            placeholder="Escribe tu texto"
                            title="Edita el contenido del texto"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tipografía:</label>
                        <select
                            value={selectedText.fontFamily}
                            onChange={(e) => handleFontChange(e.target.value)}
                            className={styles.select}
                            title="Cambia la tipografía del texto"
                        >
                            {AVAILABLE_FONTS.map((font) => (
                                <option
                                    key={font.fontFamily}
                                    value={font.fontFamily}
                                    style={{ fontFamily: font.fontFamily }}
                                >
                                    {font.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Tamaño: {selectedText.fontSize}px</label>
                        <input
                            type="range"
                            min="20"
                            max="120"
                            value={selectedText.fontSize}
                            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                            className={styles.slider}
                            title="Ajusta el tamaño del texto"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Color:</label>
                        <ColorPicker
                            selectedColor={selectedText.color}
                            onColorChange={handleColorChange}
                        />
                    </div>

                    <button
                        onClick={handleDelete}
                        className={styles.deleteButton}
                        title="Eliminar este elemento de texto"
                    >
                        Eliminar texto
                    </button>
                </div>
            )}

            {!selectedText && design.textElements.length > 0 && (
                <p className={styles.hint}>Seleccioná un texto para editarlo</p>
            )}
        </div>
    );
};
