/**
 * TShirtMockup - Display design preview on t-shirt mockup
 */

import React, { useEffect, useRef } from 'react';
import { useDesign } from '../../context/DesignContext';
import styles from './TShirtMockup.module.css';

export const TShirtMockup: React.FC = () => {
    const { design } = useDesign();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = 300;
        canvas.height = 400;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw t-shirt shape (simple rectangle for MVP)
        ctx.fillStyle = design.shirtColor.hexValue;
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;

        // T-shirt body
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(50, 350);
        ctx.lineTo(250, 350);
        ctx.lineTo(250, 100);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Sleeves
        ctx.beginPath();
        ctx.moveTo(50, 100);
        ctx.lineTo(20, 120);
        ctx.lineTo(30, 180);
        ctx.lineTo(50, 160);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250, 100);
        ctx.lineTo(280, 120);
        ctx.lineTo(270, 180);
        ctx.lineTo(250, 160);
        ctx.fill();
        ctx.stroke();

        // Collar
        ctx.fillStyle = design.shirtColor.hexValue;
        ctx.beginPath();
        ctx.arc(150, 100, 30, 0, Math.PI, true);
        ctx.fill();
        ctx.stroke();

        // Design area placeholder text
        if (!design.templateId) {
            ctx.fillStyle = '#999';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Vista previa', 150, 200);
            ctx.fillText('del diseño', 150, 220);
        } else {
            // Show template name
            ctx.fillStyle = '#666';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(design.templateName || 'Diseño', 150, 240);

            // Show text count
            if (design.textElements.length > 0) {
                ctx.font = '11px Arial';
                ctx.fillText(`${design.textElements.length} texto(s)`, 150, 260);
            }
        }

    }, [design]);

    return (
        <div className={styles.mockupContainer}>
            <h3 className={styles.title}>Vista Previa</h3>
            <div className={styles.canvasWrapper}>
                <canvas ref={canvasRef} className={styles.canvas} />
            </div>
            <p className={styles.hint}>
                {design.templateId
                    ? `Remera ${design.shirtColor.name.toLowerCase()}`
                    : 'Seleccioná una plantilla'
                }
            </p>
        </div>
    );
};
