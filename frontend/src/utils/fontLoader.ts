/**
 * Font Loading Utility
 * Dynamically loads Google Fonts for use in the designer
 */

import { FontOption } from '../types/designer';

// Track loaded fonts to avoid reloading
const loadedFonts = new Set<string>();

/**
 * Load a Google Font dynamically
 */
export const loadFont = (font: FontOption): Promise<void> => {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (loadedFonts.has(font.fontFamily)) {
            resolve();
            return;
        }

        if (!font.webfontUrl) {
            console.warn(`No webfont URL provided for ${font.fontFamily}`);
            resolve();
            return;
        }

        // Create link element
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = font.webfontUrl;

        link.onload = () => {
            loadedFonts.add(font.fontFamily);
            resolve();
        };

        link.onerror = () => {
            console.error(`Failed to load font: ${font.fontFamily}`);
            reject(new Error(`Failed to load font: ${font.fontFamily}`));
        };

        document.head.appendChild(link);
    });
};

/**
 * Preload all fonts
 */
export const preloadFonts = async (fonts: FontOption[]): Promise<void> => {
    const promises = fonts.map(font => loadFont(font));
    await Promise.all(promises);
};

/**
 * Check if a font is loaded
 */
export const isFontLoaded = (fontFamily: string): boolean => {
    return loadedFonts.has(fontFamily);
};
