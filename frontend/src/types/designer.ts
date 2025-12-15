/**
 * TypeScript interfaces for Custom T-Shirt Designer
 */

export interface DesignTemplate {
    id: string;
    name: string;
    category?: string;
    imageUrl: string;
    description?: string;
    tags?: string[];
}

export interface TextElement {
    id: string;
    content: string;
    position: {
        x: number;
        y: number;
    };
    fontSize: number;
    fontFamily: string;
    color: string;
}

export interface TShirtColor {
    name: string;
    hexValue: string;
    mockupUrl?: string;
}

export interface CustomDesign {
    templateId: string | null;
    templateName?: string;
    textElements: TextElement[];
    shirtColor: TShirtColor;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FontOption {
    name: string;
    fontFamily: string;
    webfontUrl?: string;
}
