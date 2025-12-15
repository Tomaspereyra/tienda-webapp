/**
 * Design Templates - Religious themed designs
 * 
 * Now using SVG placeholder templates in /public/templates/
 */

import { DesignTemplate } from '../types/designer';

export const DESIGN_TEMPLATES: DesignTemplate[] = [
    {
        id: 'virgen-maria-moderna',
        name: 'Virgen María Moderna',
        category: 'Santos',
        imageUrl: '/templates/virgen-maria-moderna.png',
        description: 'Diseño moderno y minimalista de la Virgen María',
        tags: ['virgen', 'maria', 'moderno', 'minimalista']
    },
    {
        id: 'cruz-radiante',
        name: 'Cruz Radiante',
        category: 'Símbolos',
        imageUrl: '/templates/cruz-radiante.png',
        description: 'Cruz con rayos de luz celestial',
        tags: ['cruz', 'luz', 'religioso', 'celestial']
    },
    {
        id: 'corazon-sagrado',
        name: 'Sagrado Corazón',
        category: 'Santos',
        imageUrl: '/templates/corazon-sagrado.png',
        description: 'Sagrado Corazón de Jesús',
        tags: ['corazon', 'jesus', 'sagrado']
    },
    {
        id: 'san-miguel-arcangel',
        name: 'San Miguel Arcángel',
        category: 'Santos',
        imageUrl: '/templates/san-miguel-arcangel.png',
        description: 'San Miguel Arcángel protector',
        tags: ['san miguel', 'arcangel', 'protector']
    },
    {
        id: 'virgen-guadalupe',
        name: 'Virgen de Guadalupe',
        category: 'Santos',
        imageUrl: '/templates/virgen-guadalupe.png',
        description: 'Nuestra Señora de Guadalupe',
        tags: ['virgen', 'guadalupe', 'patrona']
    }
];
