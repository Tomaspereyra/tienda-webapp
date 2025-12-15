/**
 * Contact Configuration
 * 
 * Centralized configuration for store contact information.
 * Update these values with your real contact details before deployment.
 */

export const CONTACT_INFO = {
    whatsapp: {
        /**
         * WhatsApp phone number in international format (no + or spaces)
         * Format: Country code + area code + number
         * 
         * Examples:
         * - Argentina: '5491123456789' (54 + 9 + 11 + 23456789)
         * - USA: '15551234567' (1 + 5551234567)
         * - Spain: '34612345678' (34 + 612345678)
         * 
         * TODO: Replace with your actual WhatsApp number
         */
        phoneNumber: '5491168585966', // Updated

        /**
         * Default message that prefixes product information
         */
        defaultMessage: 'Hola! Me interesa este producto:',
    },

    instagram: {
        /**
         * Full Instagram profile URL
         * 
         * TODO: Replace with your actual Instagram URL
         */
        url: 'https://www.instagram.com/tienda.inmaculada?igsh=MTd5dHRobDFxaHI5cg==',
    },
} as const;
