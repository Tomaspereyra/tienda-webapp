package handler

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/tomas/tienda-backend/internal/auth"
	"github.com/tomas/tienda-backend/internal/platform/middleware"
	"github.com/tomas/tienda-backend/internal/product"
	"github.com/tomas/tienda-backend/internal/upload"
)

// SetupRouter configures all routes and returns the router
func SetupRouter(
	productService *product.Service,
	authService *auth.Service,
	uploadService *upload.Service,
	corsOrigin string,
	uploadDir string,
) *mux.Router {
	r := mux.NewRouter()

	// Create handlers
	productHandler := NewProductHandler(productService)
	authHandler := NewAuthHandler(authService)
	uploadHandler := NewUploadHandler(uploadService)
	imagesHandler := NewImagesHandler(productService, uploadDir)

	// Apply global middleware
	r.Use(middleware.Logger)
	r.Use(middleware.CORS(corsOrigin))

	// Serve static uploaded files BEFORE API subrouter to avoid conflicts
	r.PathPrefix("/api/uploads/").Handler(
		http.StripPrefix("/api/uploads/", http.FileServer(http.Dir("/app/uploads"))),
	)

	// API router
	api := r.PathPrefix("/api").Subrouter()

	// Public routes
	api.HandleFunc("/products", productHandler.GetProducts).Methods("GET", "OPTIONS")
	api.HandleFunc("/products/{id}", productHandler.GetProduct).Methods("GET", "OPTIONS")

	// Auth routes
	api.HandleFunc("/auth/login", authHandler.Login).Methods("POST", "OPTIONS")

	// OPTIONS routes for admin endpoints (must be registered BEFORE auth middleware to handle CORS preflight)
	optionsHandler := func(w http.ResponseWriter, r *http.Request) {
		// CORS headers are already set by global middleware
		w.WriteHeader(http.StatusNoContent)
	}
	api.HandleFunc("/products", optionsHandler).Methods("OPTIONS")
	api.HandleFunc("/products/{id}", optionsHandler).Methods("OPTIONS")
	api.HandleFunc("/admin/upload", optionsHandler).Methods("OPTIONS")
	api.HandleFunc("/admin/images/orphaned", optionsHandler).Methods("OPTIONS")
	api.HandleFunc("/admin/images/{filename}", optionsHandler).Methods("OPTIONS")

	// Protected admin routes (authenticated)
	authMW := middleware.AuthMiddleware(authService)

	adminAPI := api.PathPrefix("").Subrouter()
	adminAPI.Use(authMW)
	adminAPI.HandleFunc("/products", productHandler.CreateProduct).Methods("POST")
	adminAPI.HandleFunc("/products/{id}", productHandler.UpdateProduct).Methods("PUT", "PATCH")
	adminAPI.HandleFunc("/products/{id}", productHandler.DeleteProduct).Methods("DELETE")
	adminAPI.HandleFunc("/admin/upload", uploadHandler.UploadImage).Methods("POST")
	adminAPI.HandleFunc("/admin/images/orphaned", imagesHandler.GetOrphanedImages).Methods("GET")
	adminAPI.HandleFunc("/admin/images/{filename}", imagesHandler.DeleteImage).Methods("DELETE")

	// Health check
	r.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(200)
		w.Write([]byte("OK"))
	}).Methods("GET")

	return r
}
