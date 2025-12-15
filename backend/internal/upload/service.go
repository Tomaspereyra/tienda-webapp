package upload

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/google/uuid"
)

// Service handles file upload logic
type Service struct {
	uploadDir string
	maxSizeMB int
	baseURL   string
}

// NewService creates a new upload service
func NewService(uploadDir string, maxSizeMB int, baseURL string) *Service {
	return &Service{
		uploadDir: uploadDir,
		maxSizeMB: maxSizeMB,
		baseURL:   baseURL,
	}
}

// UploadResult contains uploaded file information
type UploadResult struct {
	URL      string `json:"url"`
	Filename string `json:"filename"`
	Size     int64  `json:"size"`
}

// SaveFile saves an uploaded file and returns the URL
func (s *Service) SaveFile(file multipart.File, header *multipart.FileHeader) (*UploadResult, error) {
	// Validate file size
	maxSize := int64(s.maxSizeMB) * 1024 * 1024
	if header.Size > maxSize {
		return nil, fmt.Errorf("file size exceeds maximum of %dMB", s.maxSizeMB)
	}

	// Validate file type
	if !isValidImageType(header.Filename) {
		return nil, fmt.Errorf("invalid file type, only jpg, jpeg, png, gif allowed")
	}

	// Ensure upload directory exists
	if err := os.MkdirAll(s.uploadDir, 0755); err != nil {
		return nil, fmt.Errorf("failed to create upload directory: %w", err)
	}

	// Generate unique filename
	ext := filepath.Ext(header.Filename)
	filename := fmt.Sprintf("%d_%s%s", time.Now().Unix(), uuid.New().String(), ext)
	filePath := filepath.Join(s.uploadDir, filename)

	// Create destination file
	dst, err := os.Create(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to create destination file: %w", err)
	}
	defer dst.Close()

	// Copy file content
	if _, err := io.Copy(dst, file); err != nil {
		return nil, fmt.Errorf("failed to save file: %w", err)
	}

	// Return result with absolute URL
	url := s.baseURL + "/uploads/" + filename

	return &UploadResult{
		URL:      url,
		Filename: filename,
		Size:     header.Size,
	}, nil
}

// isValidImageType checks if the file has a valid image extension
func isValidImageType(filename string) bool {
	ext := strings.ToLower(filepath.Ext(filename))
	validExts := []string{".jpg", ".jpeg", ".png", ".gif", ".webp"}

	for _, validExt := range validExts {
		if ext == validExt {
			return true
		}
	}

	return false
}
