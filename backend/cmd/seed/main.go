package main

import (
	"context"
	"log"

	"github.com/tomas/tienda-backend/internal/auth"
	"github.com/tomas/tienda-backend/internal/platform/config"
	"github.com/tomas/tienda-backend/internal/platform/database"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Connect to database
	db, err := database.New(cfg.DBPath)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Check if admin already exists
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM admins WHERE username = 'admin'").Scan(&count)
	if err != nil {
		log.Fatalf("Failed to check for existing admin: %v", err)
	}

	if count > 0 {
		log.Println("Default admin user already exists")
		return
	}

	// Hash password
	passwordHash, err := auth.HashPassword("admin123")
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}

	// Insert default admin
	_, err = db.ExecContext(
		context.Background(),
		"INSERT INTO admins (username, password_hash, role) VALUES (?, ?, ?)",
		"admin",
		passwordHash,
		"admin",
	)
	if err != nil {
		log.Fatalf("Failed to create default admin: %v", err)
	}

	log.Println("Default admin user created successfully")
	log.Println("  Username: admin")
	log.Println("  Password: admin123")
	log.Println("  IMPORTANT: Change the password immediately!")
}
