// User-friendly error messages for common HTTP status codes and scenarios

export const ERROR_MESSAGES = {
    // Network errors
    NETWORK_ERROR: 'No se pudo conectar al servidor. Verificá tu conexión a internet.',
    TIMEOUT: 'La solicitud tardó demasiado. Por favor, intentá de nuevo.',

    // HTTP status codes
    400: 'Los datos enviados no son válidos. Por favor, revisá el formulario.',
    401: 'Tu sesión expiró. Por favor, iniciá sesión nuevamente.',
    403: 'No tenés permisos para realizar esta acción.',
    404: 'No se encontró el recurso solicitado.',
    409: 'Ya existe un recurso con esos datos.',
    422: 'Los datos proporcionados no son válidos.',
    500: 'Ocurrió un error en el servidor. Estamos trabajando para solucionarlo.',
    502: 'El servidor está temporalmente no disponible. Intentá de nuevo en unos momentos.',
    503: 'El servicio no está disponible en este momento. Intentá más tarde.',

    // Operation-specific errors
    CREATE_PRODUCT: 'No se pudo crear el producto. Por favor, verificá los datos e intentá de nuevo.',
    UPDATE_PRODUCT: 'No se pudo actualizar el producto. Por favor, intentá de nuevo.',
    DELETE_PRODUCT: 'No se pudo eliminar el producto. Por favor, intentá de nuevo.',
    LOAD_PRODUCTS: 'No se pudieron cargar los productos. Por favor, recargá la página.',
    LOAD_PRODUCT: 'No se pudo cargar el producto. Por favor, intentá de nuevo.',
    UPLOAD_IMAGE: 'No se pudo subir la imagen. Verificá el tamaño y formato del archivo.',
    LOGIN_FAILED: 'Email o contraseña incorrectos. Por favor, intentá de nuevo.',

    // Generic fallback
    GENERIC: 'Ocurrió un error inesperado. Por favor, intentá de nuevo.',
} as const;

/**
 * Gets a user-friendly error message based on error type
 */
export function getErrorMessage(error: any, context?: string): string {
    // Network error
    if (!error.response && error.request) {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // Timeout
    if (error.code === 'ECONNABORTED') {
        return ERROR_MESSAGES.TIMEOUT;
    }

    // HTTP status code errors
    const status = error.response?.status;
    if (status && ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES]) {
        return ERROR_MESSAGES[status as keyof typeof ERROR_MESSAGES] as string;
    }

    // Backend  error message
    const backendMessage = error.response?.data?.error?.message;
    if (backendMessage && typeof backendMessage === 'string') {
        return backendMessage;
    }

    // Context-specific error
    if (context && ERROR_MESSAGES[context as keyof typeof ERROR_MESSAGES]) {
        return ERROR_MESSAGES[context as keyof typeof ERROR_MESSAGES] as string;
    }

    // Generic fallback
    return ERROR_MESSAGES.GENERIC;
}

/**
 * Checks if error should trigger a retry
 */
export function isRetryableError(error: any): boolean {
    const status = error.response?.status;

    // Network errors are retryable
    if (!error.response && error.request) {
        return true;
    }

    // 5xx errors are retryable
    if (status >= 500 && status < 600) {
        return true;
    }

    // 408 Request Timeout is retryable
    if (status === 408) {
        return true;
    }

    // 429 Too Many Requests might be retryable with backoff
    if (status === 429) {
        return true;
    }

    return false;
}
