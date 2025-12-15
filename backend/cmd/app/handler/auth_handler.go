package handler

import (
	"encoding/json"
	"net/http"

	"github.com/tomas/tienda-backend/internal/auth"
	"github.com/tomas/tienda-backend/internal/platform/web"
)

// AuthHandler handles authentication HTTP requests
type AuthHandler struct {
	authService *auth.Service
}

// NewAuthHandler creates a new auth handler
func NewAuthHandler(authService *auth.Service) *AuthHandler {
	return &AuthHandler{authService: authService}
}

// Login handles POST /api/auth/login
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var input auth.LoginInput
	
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		web.RespondBadRequest(w, "invalid request body")
		return
	}
	
	response, err := h.authService.Login(r.Context(), input)
	if err != nil {
		if err == auth.ErrInvalidCredentials {
			web.RespondUnauthorized(w, "invalid username or password")
			return
		}
		web.RespondInternalError(w, "internal server error")
		return
	}
	
	web.RespondOK(w, response)
}
