/**
 * T-Shirt Color Options
 * 
 * Note: mockupUrl paths are placeholders. Add actual t-shirt mockup images
 * to public/mockups/ folder (600x800px recommended)
 */

import { TShirtColor } from '../types/designer';

export const TSHIRT_COLORS: TShirtColor[] = [
    {
        name: 'Blanco',
        hexValue: '#FFFFFF',
        mockupUrl: '/mockups/white-tshirt.png'
    },
    {
        name: 'Negro',
        hexValue: '#000000',
        mockupUrl: '/mockups/black-tshirt.png'
    },
    {
        name: 'Gris',
        hexValue: '#808080',
        mockupUrl: '/mockups/gray-tshirt.png'
    },
    {
        name: 'Azul Navy',
        hexValue: '#001F3F',
        mockupUrl: '/mockups/navy-tshirt.png'
    }
];

// Default shirt color
export const DEFAULT_SHIRT_COLOR = TSHIRT_COLORS[0]; // Blanco
