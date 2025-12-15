/**
 * Canvas Helpers - Utilities for fabric.js canvas manipulation
 */

import { fabric } from 'fabric';
import { TextElement } from '../types/designer';

/**
 * Load a template image as canvas background
 */
export const loadTemplateImage = async (
    canvas: fabric.Canvas,
    imageUrl: string
): Promise<void> => {
    return new Promise((resolve, reject) => {
        fabric.Image.fromURL(
            imageUrl,
            (img) => {
                if (!img) {
                    reject(new Error('Failed to load image'));
                    return;
                }

                // Scale image to fit canvas
                const canvasWidth = canvas.getWidth();
                const canvasHeight = canvas.getHeight();
                const scale = Math.min(
                    canvasWidth / (img.width || 1),
                    canvasHeight / (img.height || 1)
                );

                img.scale(scale);
                img.set({
                    selectable: false,
                    evented: false,
                    left: (canvasWidth - (img.width || 0) * scale) / 2,
                    top: (canvasHeight - (img.height || 0) * scale) / 2,
                });

                canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
                resolve();
            },
            { crossOrigin: 'anonymous' }
        );
    });
};

/**
 * Add text element to canvas
 */
export const addTextToCanvas = (
    canvas: fabric.Canvas,
    textElement: TextElement
): fabric.IText => {
    const text = new fabric.IText(textElement.content, {
        left: textElement.position.x,
        top: textElement.position.y,
        fontSize: textElement.fontSize,
        fontFamily: textElement.fontFamily,
        fill: textElement.color,
        data: { id: textElement.id }, // Store ID in fabric object
        selectable: true,
        lockRotation: true, // Prevent rotation
        lockScalingX: false, // Allow horizontal scaling
        lockScalingY: false, // Allow vertical scaling
        hasControls: true,
        hasBorders: true,
        // Enhanced selection visual feedback
        borderColor: '#64B5F6',
        cornerColor: '#64B5F6',
        cornerSize: 12,
        transparentCorners: false,
        cornerStyle: 'circle',
        borderDashArray: [5, 5],
    });

    // Enable dragging with boundary constraints
    enableTextDragging(text, canvas);

    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    return text;
};

/**
 * Enable dragging with boundary constraints for text objects
 */
export const enableTextDragging = (
    textObject: fabric.IText,
    canvas: fabric.Canvas
): void => {
    textObject.on('moving', function (this: fabric.IText) {
        const obj = this as fabric.IText;
        const canvasWidth = canvas.getWidth();
        const canvasHeight = canvas.getHeight();

        // Get object boundaries
        const objWidth = (obj.width || 0) * (obj.scaleX || 1);
        const objHeight = (obj.height || 0) * (obj.scaleY || 1);

        // Constrain horizontal position
        if ((obj.left || 0) < 0) {
            obj.set({ left: 0 });
        }
        if ((obj.left || 0) + objWidth > canvasWidth) {
            obj.set({ left: canvasWidth - objWidth });
        }

        // Constrain vertical position
        if ((obj.top || 0) < 0) {
            obj.set({ top: 0 });
        }
        if ((obj.top || 0) + objHeight > canvasHeight) {
            obj.set({ top: canvasHeight - objHeight });
        }
    });

    // Change cursor on hover
    textObject.set({
        hoverCursor: 'move',
        moveCursor: 'move',
    });
};

/**
 * Update text properties on canvas
 */
export const updateTextProperties = (
    canvas: fabric.Canvas,
    id: string,
    updates: Partial<TextElement>
): void => {
    const objects = canvas.getObjects('i-text') as fabric.IText[];
    const textObject = objects.find((obj) => obj.data?.id === id);

    if (textObject) {
        if (updates.content !== undefined) textObject.set('text', updates.content);
        if (updates.fontSize !== undefined) textObject.set('fontSize', updates.fontSize);
        if (updates.fontFamily !== undefined) textObject.set('fontFamily', updates.fontFamily);
        if (updates.color !== undefined) textObject.set('fill', updates.color);
        if (updates.position) {
            textObject.set('left', updates.position.x);
            textObject.set('top', updates.position.y);
        }

        canvas.renderAll();
    }
};

/**
 * Delete text from canvas by ID
 */
export const deleteTextFromCanvas = (canvas: fabric.Canvas, id: string): void => {
    const objects = canvas.getObjects('i-text') as fabric.IText[];
    const textObject = objects.find((obj) => obj.data?.id === id);

    if (textObject) {
        canvas.remove(textObject);
        canvas.renderAll();
    }
};

/**
 * Clear all text elements from canvas
 */
export const clearAllText = (canvas: fabric.Canvas): void => {
    const objects = canvas.getObjects('i-text');
    objects.forEach((obj) => canvas.remove(obj));
    canvas.renderAll();
};
