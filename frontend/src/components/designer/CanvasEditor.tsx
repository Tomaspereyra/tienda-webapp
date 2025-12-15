/**
 * CanvasEditor - Main canvas component using fabric.js
 */

import React, { useEffect, useRef } from 'react';
import { useCanvas } from '../../hooks/useCanvas';
import { useDesign } from '../../context/DesignContext';
import { loadTemplateImage, addTextToCanvas } from '../../utils/canvasHelpers';
import { DESIGN_TEMPLATES } from '../../data/designTemplates';
import { TextElement } from '../../types/designer';
import styles from './CanvasEditor.module.css';
import { fabric } from 'fabric';

export const CanvasEditor: React.FC = () => {
    const { canvasRef, canvas, isReady } = useCanvas({
        width: 600, // Reduced for better fit
        height: 750,
        backgroundColor: '#FFFFFF',
    });

    const { design, updateText } = useDesign();
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Load template when selected
    useEffect(() => {
        if (!canvas || !isReady || !design.templateId) return;

        const template = DESIGN_TEMPLATES.find((t) => t.id === design.templateId);
        if (template) {
            loadTemplateImage(canvas, template.imageUrl).catch((err) => {
                console.error('Failed to load template:', err);
            });
        }
    }, [canvas, isReady, design.templateId]);

    // Set up event listeners for drag and drop
    useEffect(() => {
        if (!canvas || !isReady) return;

        const handleObjectModified = (e: fabric.IEvent) => {
            const modifiedObject = e.target as fabric.IText;

            if (!modifiedObject || !modifiedObject.data?.id) return;

            // Debounce updates to avoid excessive re-renders
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }

            debounceTimerRef.current = setTimeout(() => {
                const updates: Partial<TextElement> = {
                    position: {
                        x: modifiedObject.left || 0,
                        y: modifiedObject.top || 0,
                    },
                };

                // Also capture content changes if text was edited
                if (modifiedObject.text !== undefined) {
                    updates.content = modifiedObject.text;
                }

                // Update context with new properties
                updateText(modifiedObject.data.id, updates);
            }, 300); // 300ms debounce
        };

        canvas.on('object:modified', handleObjectModified);

        return () => {
            canvas.off('object:modified', handleObjectModified);
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [canvas, isReady, updateText]);

    // Sync text elements with canvas (smart update to prevent editing interruption)
    useEffect(() => {
        if (!canvas || !isReady) return;

        const existingObjects = canvas.getObjects('i-text') as fabric.IText[];
        const designIds = new Set(design.textElements.map(el => el.id));

        // Remove deleted text elements
        existingObjects.forEach(obj => {
            if (obj.data?.id && !designIds.has(obj.data.id)) {
                canvas.remove(obj);
            }
        });

        // Add new or update existing text elements
        design.textElements.forEach((textElement) => {
            const existingObj = existingObjects.find(obj => obj.data?.id === textElement.id);

            if (existingObj) {
                // Update existing object properties (but not if it's being edited)
                if (!existingObj.isEditing) {
                    if (existingObj.text !== textElement.content) {
                        existingObj.set('text', textElement.content);
                    }
                    if (existingObj.fontSize !== textElement.fontSize) {
                        existingObj.set('fontSize', textElement.fontSize);
                    }
                    if (existingObj.fontFamily !== textElement.fontFamily) {
                        existingObj.set('fontFamily', textElement.fontFamily);
                    }
                    if (existingObj.fill !== textElement.color) {
                        existingObj.set('fill', textElement.color);
                    }
                    if (existingObj.left !== textElement.position.x || existingObj.top !== textElement.position.y) {
                        existingObj.set({
                            left: textElement.position.x,
                            top: textElement.position.y,
                        });
                    }
                }
            } else {
                // Add new text element
                addTextToCanvas(canvas, textElement);
            }
        });

        canvas.renderAll();
    }, [canvas, isReady, design.textElements.length, design.updatedAt?.getTime()]);

    return (
        <div className={styles.editorContainer}>
            <div className={styles.canvasWrapper}>
                <canvas ref={canvasRef} className={styles.canvas} />
                {!design.templateId && (
                    <div className={styles.placeholder}>
                        <p>👈 Seleccioná una plantilla para comenzar</p>
                    </div>
                )}
            </div>
        </div>
    );
};
