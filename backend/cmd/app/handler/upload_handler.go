package handler

import (
	"net/http"

	"github.com/tomas/tienda-backend/internal/upload"
	"github.com/tomas/tienda-backend/internal/platform/web"
)

// UploadHandler handles file upload HTTP requests
type UploadHandler struct {
	uploadService *upload.Service
}

// NewUploadHandler creates a new upload handler
func NewUploadHandler(uploadService *upload.Service) *UploadHandler {
	return &UploadHandler{uploadService: uploadService}
}

// UploadImage handles POST /api/admin/upload
func (h *UploadHandler) UploadImage(w http.ResponseWriter, r *http.Request) {
	// Parse multipart form (32MB max memory)
	if err := r.ParseMultipartForm(32 << 20); err != nil {
		web.RespondBadRequest(w, "failed to parse form")
		return
	}
	
	// Get file from form
	file, header, err := r.FormFile("file")
	if err != nil {
		web.RespondBadRequest(w, "file is required")
		return
	}
	defer file.Close()
	
	// Save file
	result, err := h.uploadService.SaveFile(file, header)
	if err != nil {
		web.RespondBadRequest(w, err.Error())
		return
	}
	
	web.RespondOK(w, result)
}
