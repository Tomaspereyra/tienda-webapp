package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/tomas/tienda-backend/cmd/app/handler"
	"github.com/tomas/tienda-backend/internal/auth"
	"github.com/tomas/tienda-backend/internal/platform/config"
	"github.com/tomas/tienda-backend/internal/platform/database"
	"github.com/tomas/tienda-backend/internal/product"
	"github.com/tomas/tienda-backend/internal/upload"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	log.Printf("Starting Tienda Backend API in %s mode", cfg.Env)

	// Initialize database
	db, err := database.New(cfg.DBPath)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	log.Println("Database connection established")

	// Run migrations
	if err := database.Migrate(db.DB); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	log.Println("Database migrations completed")

	// Seed default admin user if database is empty
	if err := database.SeedDefaultAdmin(db.DB); err != nil {
		log.Fatalf("Failed to seed default admin: %v", err)
	}

	// Initialize repositories
	productRepo := product.NewSQLiteRepository(db.DB)
	authRepo := auth.NewSQLiteRepository(db.DB)

	// Initialize JWT manager
	jwtManager := auth.NewJWTManager(cfg.JWTSecret, cfg.JWTExpiryHours)

	// Initialize services
	productService := product.NewService(productRepo)
	authService := auth.NewService(authRepo, jwtManager)
	uploadService := upload.NewService(cfg.UploadDir, cfg.MaxUploadSizeMB, cfg.BaseURL)

	// Setup router
	router := handler.SetupRouter(productService, authService, uploadService, cfg.CORSOrigin, cfg.UploadDir)

	// Create HTTP server
	addr := ":" + cfg.Port
	srv := &http.Server{
		Addr:         addr,
		Handler:      router,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Start server in goroutine
	go func() {
		log.Printf("Server listening on %s", addr)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Wait for interrupt signal for graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Shutting down server...")

	// Graceful shutdown with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Server forced to shutdown: %v", err)
	}

	log.Println("Server exited")
}
