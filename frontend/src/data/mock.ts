import { Product } from '../types';

// Mock data - 20+ sample products
export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Remera Oversize Negra',
        description: 'Remera oversize 100% algodón, perfecta para un look casual y cómodo.',
        price: 15000,
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Negro', 'Gris'],
        gender: 'Hombre',
        category: 'Casual',
        oversize: true,
        featured: true,
    },
    {
        id: '2',
        name: 'Remera Deportiva Running',
        description: 'Tecnología Dri-FIT para máxima transpiración durante el ejercicio.',
        price: 18000,
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Azul', 'Negro', 'Rojo'],
        gender: 'Hombre',
        category: 'Deportivo',
        oversize: false,
        featured: true,
    },
    {
        id: '3',
        name: 'Remera Cruz Minimalista',
        description: 'Diseño religioso sutil y elegante, perfecta para el día a día.',
        price: 16000,
        images: [
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
        ],
        sizes: ['S', 'M', 'L'],
        colors: ['Blanco', 'Beige'],
        gender: 'Mujer',
        category: 'Religioso',
        oversize: false,
        featured: true,
    },
    {
        id: '4',
        name: 'Remera Básica Rosa',
        description: 'Remera básica de corte clásico, ideal para combinar con todo.',
        price: 12000,
        images: [
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Rosa', 'Lila'],
        gender: 'Mujer',
        category: 'Casual',
        oversize: false,
        featured: true,
    },
    {
        id: '5',
        name: 'Remera Estampada Niño',
        description: 'Divertida remera con estampado colorido, 100% algodón.',
        price: 10000,
        images: [
            'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800',
        ],
        sizes: ['S', 'M', 'L'],
        colors: ['Multicolor'],
        gender: 'Niño',
        category: 'Casual',
        oversize: false,
        featured: false,
    },
    {
        id: '6',
        name: 'Remera Gym Pro',
        description: 'Diseño ergonómico para máximo rendimiento en el gimnasio.',
        price: 20000,
        images: [
            'https://images.unsplash.com/photo-1571455786673-9d9d6c194f90?w=800',
        ],
        sizes: ['M', 'L', 'XL'],
        colors: ['Negro', 'Gris oscuro'],
        gender: 'Hombre',
        category: 'Deportivo',
        oversize: false,
        featured: false,
    },
    {
        id: '7',
        name: 'Remera Versículo Juan 3:16',
        description: 'Remera con versículo bíblico bordado, confección premium.',
        price: 17000,
        images: [
            'https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blanco', 'Negro'],
        gender: 'Hombre',
        category: 'Religioso',
        oversize: false,
        featured: false,
    },
    {
        id: '8',
        name: 'Remera Oversize Mujer Beige',
        description: 'Corte oversize moderno, tela suave y liviana.',
        price: 16500,
        images: [
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Beige', 'Crema'],
        gender: 'Mujer',
        category: 'Casual',
        oversize: true,
        featured: false,
    },
    {
        id: '9',
        name: 'Remera Yoga Flow',
        description: 'Ultra cómoda y flexible para prácticas de yoga y pilates.',
        price: 15000,
        images: [
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Verde agua', 'Rosa suave'],
        gender: 'Mujer',
        category: 'Deportivo',
        oversize: false,
        featured: false,
    },
    {
        id: '10',
        name: 'Remera Infantil Dinosaurio',
        description: 'Estampado de dinosaurio, ideal para los más pequeños.',
        price: 9500,
        images: [
            'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800',
        ],
        sizes: ['XS', 'S', 'M'],
        colors: ['Verde', 'Azul'],
        gender: 'Niño',
        category: 'Casual',
        oversize: false,
        featured: false,
    },
    // Adding more products to reach 20+
    {
        id: '11',
        name: 'Remera Blanca Premium',
        description: 'Remera blanca de corte clásico, algodón pima de alta calidad.',
        price: 14000,
        images: [
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blanco'],
        gender: 'Hombre',
        category: 'Casual',
        oversize: false,
        featured: false,
    },
    {
        id: '12',
        name: 'Remera CrossFit Extreme',
        description: 'Diseñada para entrenamientos de alta intensidad.',
        price: 22000,
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Negro', 'Rojo'],
        gender: 'Hombre',
        category: 'Deportivo',
        oversize: false,
        featured: false,
    },
    {
        id: '13',
        name: 'Remera Fe y Esperanza',
        description: 'Mensaje inspirador con diseño moderno.',
        price: 15500,
        images: [
            'https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800',
        ],
        sizes: ['S', 'M', 'L'],
        colors: ['Gris claro', 'Azul marino'],
        gender: 'Mujer',
        category: 'Religioso',
        oversize: false,
        featured: false,
    },
    {
        id: '14',
        name: 'Remera Rayas Marinera',
        description: 'Estilo marinero clásico con rayas horizontales.',
        price: 13500,
        images: [
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Blanco/Azul', 'Blanco/Rojo'],
        gender: 'Mujer',
        category: 'Casual',
        oversize: false,
        featured: false,
    },
    {
        id: '15',
        name: 'Remera Fútbol Kids',
        description: 'Remera deportiva para pequeños futbolistas.',
        price: 11000,
        images: [
            'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800',
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Azul', 'Rojo', 'Verde'],
        gender: 'Niño',
        category: 'Deportivo',
        oversize: false,
        featured: false,
    },
    {
        id: '16',
        name: 'Remera Oversize Gris',
        description: 'Gris melange, corte oversize relajado.',
        price: 15500,
        images: [
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800',
        ],
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Gris melange'],
        gender: 'Hombre',
        category: 'Casual',
        oversize: true,
        featured: false,
    },
    {
        id: '17',
        name: 'Remera Running Reflectiva',
        description: 'Con detalles reflectivos para correr de noche.',
        price: 19000,
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Negro', 'Gris'],
        gender: 'Hombre',
        category: 'Deportivo',
        oversize: false,
        featured: false,
    },
    {
        id: '18',
        name: 'Remera Salmo 23',
        description: 'Diseño elegante con texto del Salmo 23.',
        price: 16000,
        images: [
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Blanco', 'Gris'],
        gender: 'Mujer',
        category: 'Religioso',
        oversize: false,
        featured: false,
    },
    {
        id: '19',
        name: 'Remera Tie-Dye Niña',
        description: 'Estampado tie-dye artesanal, cada pieza es única.',
        price: 12000,
        images: [
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800',
        ],
        sizes: ['XS', 'S', 'M'],
        colors: ['Multicolor'],
        gender: 'Niño',
        category: 'Casual',
        oversize: false,
        featured: false,
    },
    {
        id: '20',
        name: 'Remera Básica Verde Militar',
        description: 'Color verde militar, corte regular fit.',
        price: 13000,
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Verde militar'],
        gender: 'Hombre',
        category: 'Casual',
        oversize: false,
        featured: false,
    },
    {
        id: '21',
        name: 'Remera Pilates Essential',
        description: 'Tela suave y elastizada para movimientos fluidos.',
        price: 16000,
        images: [
            'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800',
        ],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Negro', 'Lavanda'],
        gender: 'Mujer',
        category: 'Deportivo',
        oversize: false,
        featured: false,
    },
    {
        id: '22',
        name: 'Remera Psalm 46:5 Mujer',
        description: 'Versículo inspirador con tipografía moderna.',
        price: 15000,
        images: [
            'https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800',
        ],
        sizes: ['S', 'M', 'L'],
        colors: ['Rosa palo', 'Gris perla'],
        gender: 'Mujer',
        category: 'Religioso',
        oversize: false,
        featured: false,
    },
];

// Get featured products
export const getFeaturedProducts = (): Product[] => {
    return MOCK_PRODUCTS.filter(p => p.featured);
};

// Get all products
export const getAllProducts = (): Product[] => {
    return MOCK_PRODUCTS;
};

// Get products with filters
export const getFilteredProducts = (filters: {
    gender?: string;
    category?: string;
    oversize?: boolean;
}): Product[] => {
    let filtered = MOCK_PRODUCTS;

    if (filters.gender) {
        filtered = filtered.filter(p => p.gender === filters.gender);
    }

    if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.oversize !== undefined) {
        filtered = filtered.filter(p => p.oversize === filters.oversize);
    }

    return filtered;
};

// Get product by ID
export const getProductById = (id: string): Product | undefined => {
    return MOCK_PRODUCTS.find(p => p.id === id);
};

// Mock credentials for login
export const MOCK_ADMIN = {
    email: 'admin@tienda.com',
    password: 'admin123',
};
