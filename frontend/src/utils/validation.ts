// Email validation
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// URL validation
export const validateUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

// Product form validation rules
export const productValidation = {
    name: {
        required: 'El nombre es requerido',
        minLength: {
            value: 3,
            message: 'El nombre debe tener al menos 3 caracteres',
        },
        maxLength: {
            value: 100,
            message: 'El nombre no puede exceder 100 caracteres',
        },
    },
    description: {
        required: 'La descripción es requerida',
        minLength: {
            value: 10,
            message: 'La descripción debe tener al menos 10 caracteres',
        },
        maxLength: {
            value: 500,
            message: 'La descripción no puede exceder 500 caracteres',
        },
    },
    price: {
        required: 'El precio es requerido',
        min: {
            value: 0.01,
            message: 'El precio debe ser mayor a 0',
        },
    },
    images: {
        validate: {
            required: (value: string[]) =>
                value.length >= 1 || 'Debe agregar al menos 1 imagen',
            maxImages: (value: string[]) =>
                value.length <= 4 || 'Máximo 4 imágenes permitidas',
            validUrls: (value: string[]) =>
                value.every(validateUrl) || 'Todas las URLs deben ser válidas',
        },
    },
    sizes: {
        validate: (value: string[]) =>
            value.length >= 1 || 'Debe seleccionar al menos 1 talle',
    },
    colors: {
        validate: (value: string[]) =>
            value.length >= 1 || 'Debe agregar al menos 1 color',
    },
    gender: {
        required: 'El género es requerido',
    },
    category: {
        required: 'La categoría es requerida',
    },
};

// Login form validation rules
export const loginValidation = {
    email: {
        required: 'El email es requerido',
        validate: (value: string) => validateEmail(value) || 'Email inválido',
    },
    password: {
        required: 'La contraseña es requerida',
        minLength: {
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres',
        },
    },
};
