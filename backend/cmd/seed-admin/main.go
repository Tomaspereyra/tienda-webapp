package main

import (
	"fmt"
	"log"

	"github.com/tomas/tienda-backend/internal/auth"
	"github.com/tomas/tienda-backend/internal/platform/database"
)

func main() {
	// Connect to database
	db, err := database.New("data/tienda.db")
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Check if admin already exists
	var count int
	err = db.QueryRow("SELECT COUNT(*) FROM admins WHERE username = ?", "admin@tienda.com").Scan(&count)
	if err != nil {
		log.Fatalf("Failed to check for existing admin: %v", err)
	}

	if count > 0 {
		log.Println("Admin user already exists")
		return
	}

	// Hash the password
	passwordHash, err := auth.HashPassword("admin123")
	if err != nil {
		log.Fatalf("Failed to hash password: %v", err)
	}

	// Insert admin
	_, err = db.Exec(`
		INSERT INTO admins (username, password_hash, role)
		VALUES (?, ?, ?)
	`, "admin@tienda.com", passwordHash, "admin")

	if err != nil {
		log.Fatalf("Failed to create admin: %v", err)
	}

	fmt.Println("✓ Created admin user")
	fmt.Println("  Email: admin@tienda.com")
	fmt.Println("  Password: admin123")
	fmt.Println("  Role: admin")
}
