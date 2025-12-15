/**
 * useCanvas Hook - Manages fabric.js canvas instance
 */

import { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

interface UseCanvasOptions {
    width?: number;
    height?: number;
    backgroundColor?: string;
}

export const useCanvas = (options: UseCanvasOptions = {}) => {
    const {
        width = 800,
        height = 1000,
        backgroundColor = '#FFFFFF',
    } = options;

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize fabric canvas
        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
            width,
            height,
            backgroundColor,
            selection: true,
            preserveObjectStacking: true,
        });

        setCanvas(fabricCanvas);
        setIsReady(true);

        // Cleanup on unmount
        return () => {
            fabricCanvas.dispose();
        };
    }, [width, height, backgroundColor]);

    return {
        canvasRef,
        canvas,
        isReady,
    };
};
