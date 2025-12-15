/**
 * Font Options for Text Customization
 * 
 * Uses Google Fonts for web typography
 */

import { FontOption } from '../types/designer';

export const AVAILABLE_FONTS: FontOption[] = [
    {
        name: 'Elegante Serif',
        fontFamily: 'Cormorant Garamond',
        webfontUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&display=swap'
    },
    {
        name: 'Moderna Sans',
        fontFamily: 'Work Sans',
        webfontUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;500&display=swap'
    },
    {
        name: 'Script Elegante',
        fontFamily: 'Dancing Script',
        webfontUrl: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap'
    },
    {
        name: 'Bold Impact',
        fontFamily: 'Oswald',
        webfontUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&display=swap'
    }
];

// Default font
export const DEFAULT_FONT = AVAILABLE_FONTS[1]; // Work Sans (matches site)
