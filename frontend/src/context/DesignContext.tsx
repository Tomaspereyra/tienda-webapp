/**
 * Design Context - State management for t-shirt designer
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CustomDesign, DesignTemplate, TextElement, TShirtColor } from '../types/designer';
import { DEFAULT_SHIRT_COLOR } from '../data/tshirtColors';
import { DEFAULT_FONT } from '../data/fonts';

interface DesignContextType {
    design: CustomDesign;
    selectTemplate: (template: DesignTemplate) => void;
    addText: (text: string) => void;
    updateText: (id: string, updates: Partial<TextElement>) => void;
    deleteText: (id: string) => void;
    changeShirtColor: (color: TShirtColor) => void;
    resetDesign: () => void;
    restoreDesign: (savedDesign: CustomDesign) => void;
}

const DesignContext = createContext<DesignContextType | undefined>(undefined);

const initialDesign: CustomDesign = {
    templateId: null,
    textElements: [],
    shirtColor: DEFAULT_SHIRT_COLOR,
};

export const DesignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [design, setDesign] = useState<CustomDesign>(initialDesign);

    const selectTemplate = (template: DesignTemplate) => {
        setDesign(prev => ({
            ...prev,
            templateId: template.id,
            templateName: template.name,
        }));
    };

    const addText = (text: string = 'Nuevo texto') => {
        const newTextElement: TextElement = {
            id: `text-${Date.now()}`,
            content: text,
            position: { x: 100, y: 100 }, // Default position
            fontSize: 40,
            fontFamily: DEFAULT_FONT.fontFamily,
            color: '#000000',
        };

        setDesign(prev => ({
            ...prev,
            textElements: [...prev.textElements, newTextElement],
            updatedAt: new Date(),
        }));
    };

    const updateText = (id: string, updates: Partial<TextElement>) => {
        setDesign(prev => ({
            ...prev,
            textElements: prev.textElements.map(el =>
                el.id === id ? { ...el, ...updates } : el
            ),
            updatedAt: new Date(),
        }));
    };

    const deleteText = (id: string) => {
        setDesign(prev => ({
            ...prev,
            textElements: prev.textElements.filter(el => el.id !== id),
            updatedAt: new Date(),
        }));
    };

    const changeShirtColor = (color: TShirtColor) => {
        setDesign(prev => ({
            ...prev,
            shirtColor: color,
            updatedAt: new Date(),
        }));
    };

    const resetDesign = () => {
        setDesign(initialDesign);
    };

    const restoreDesign = (savedDesign: CustomDesign) => {
        setDesign({
            ...savedDesign,
            updatedAt: new Date(),
        });
    };

    return (
        <DesignContext.Provider
            value={{
                design,
                selectTemplate,
                addText,
                updateText,
                deleteText,
                changeShirtColor,
                resetDesign,
                restoreDesign,
            }}
        >
            {children}
        </DesignContext.Provider>
    );
};

export const useDesign = () => {
    const context = useContext(DesignContext);
    if (!context) {
        throw new Error('useDesign must be used within a DesignProvider');
    }
    return context;
};
