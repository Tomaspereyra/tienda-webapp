package handler

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/tomas/tienda-backend/internal/platform/web"
	"github.com/tomas/tienda-backend/internal/product"
)

// ImagesHandler handles image management requests
type ImagesHandler struct {
	productService *product.Service
	uploadDir      string
}

// NewImagesHandler creates a new images handler
func NewImagesHandler(productService *product.Service, uploadDir string) *ImagesHandler {
	return &ImagesHandler{
		productService: productService,
		uploadDir:      uploadDir,
	}
}

// OrphanedImage represents an image not associated with any product
type OrphanedImage struct {
	Filename   string    `json:"filename"`
	URL        string    `json:"url"`
	Size       int64     `json:"size"`
	UploadedAt time.Time `json:"uploadedAt"`
}

// GetOrphanedImages returns all images not referenced by products
func (h *ImagesHandler) GetOrphanedImages(w http.ResponseWriter, r *http.Request) {
	// Get all files in uploads directory
	files, err := os.ReadDir(h.uploadDir)
	if err != nil {
		web.RespondInternalError(w, "failed to read uploads directory")
		return
	}

	// Get all products to check image references
	products, _, err := h.productService.GetProducts(r.Context(), product.GetAllFilters{})
	if err != nil {
		web.RespondInternalError(w, "failed to get products")
		return
	}

	// Build set of used image filenames
	usedImages := make(map[string]bool)
	for _, product := range products {
		for _, imageURL := range product.Images {
			// Extract filename from URL
			filename := filepath.Base(imageURL)
			usedImages[filename] = true
		}
	}

	// Find orphaned images
	var orphaned []OrphanedImage
	for _, file := range files {
		if file.IsDir() {
			continue
		}

		filename := file.Name()

		// Skip if image is being used
		if usedImages[filename] {
			continue
		}

		// Get file info
		filePath := filepath.Join(h.uploadDir, filename)
		fileInfo, err := os.Stat(filePath)
		if err != nil {
			continue
		}

		orphaned = append(orphaned, OrphanedImage{
			Filename:   filename,
			URL:        "/uploads/" + filename,
			Size:       fileInfo.Size(),
			UploadedAt: fileInfo.ModTime(),
		})
	}

	web.RespondOK(w, orphaned)
}

// DeleteImage deletes an image file
func (h *ImagesHandler) DeleteImage(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	filename := vars["filename"]

	// Validate filename (prevent directory traversal)
	if strings.Contains(filename, "..") || strings.Contains(filename, "/") || strings.Contains(filename, "\\") {
		web.RespondBadRequest(w, "invalid filename")
		return
	}

	// Check if image is being used by any product
	products, _, err := h.productService.GetProducts(r.Context(), product.GetAllFilters{})
	if err != nil {
		web.RespondInternalError(w, "failed to check image usage")
		return
	}

	for _, product := range products {
		for _, imageURL := range product.Images {
			if strings.HasSuffix(imageURL, filename) {
				web.RespondBadRequest(w, "image is being used by a product")
				return
			}
		}
	}

	// Delete file
	filePath := filepath.Join(h.uploadDir, filename)
	if err := os.Remove(filePath); err != nil {
		if os.IsNotExist(err) {
			web.RespondNotFound(w, "image not found")
			return
		}
		web.RespondInternalError(w, "failed to delete image")
		return
	}

	web.RespondOK(w, map[string]string{
		"message": "image deleted successfully",
	})
}
