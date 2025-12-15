export interface UploadedImage {
    file?: File;
    url: string;
    progress: number;
    error?: string;
    uploading: boolean;
}

// Add more upload-related types as needed
