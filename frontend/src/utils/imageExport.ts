/**
 * Image Export Utility - Export canvas design as image
 */

import { fabric } from 'fabric';

/**
 * Export canvas as PNG image (base64 data URL)
 * @param canvas - fabric.Canvas instance
 * @param multiplier - Resolution multiplier for export quality (default: 2x for print quality)
 * @returns Base64 data URL of the exported image
 */
export const exportCanvasAsImage = (
    canvas: fabric.Canvas,
    multiplier: number = 2
): string => {
    try {
        const dataURL = canvas.toDataURL({
            format: 'png',
            quality: 1.0,
            multiplier: multiplier, // 2x multiplier for better print quality
        });

        return dataURL;
    } catch (error) {
        console.error('Error exporting canvas:', error);
        throw new Error('Failed to export design. Please try simplifying your design.');
    }
};

/**
 * Download canvas as image file
 * @param canvas - fabric.Canvas instance
 * @param filename - Name for the downloaded file
 */
export const downloadCanvasImage = (
    canvas: fabric.Canvas,
    filename: string = 'mi-diseno'
): void => {
    const dataURL = exportCanvasAsImage(canvas);

    // Create download link
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/**
 * Convert base64 to Blob for uploading (if needed in future)
 */
export const dataURLtoBlob = (dataURL: string): Blob => {
    const arr = dataURL.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
};
