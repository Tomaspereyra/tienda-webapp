package database

import (
	"database/sql"
	"log"

	"golang.org/x/crypto/bcrypt"
)

// SeedDefaultAdmin creates a default admin user if no users exist in the database
func SeedDefaultAdmin(db *sql.DB) error {
	// Check if any admins exist
	var count int
	err := db.QueryRow("SELECT COUNT(*) FROM admins").Scan(&count)
	if err != nil {
		return err
	}

	// If admins already exist, don't seed
	if count > 0 {
		log.Println("Admins already exist, skipping admin seed")
		return nil
	}

	log.Println("No users found, creating default admin user...")

	// Create default admin credentials
	username := "jujazpereyra@gmail.com"
	password := "ASDFHLSGKDJ9876!" // This should be changed on first login in production

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	// Insert default admin user
	_, err = db.Exec(`
		INSERT INTO admins (username, password_hash, role, created_at)
		VALUES (?, ?, ?, datetime('now'))
	`, username, string(hashedPassword), "admin")

	if err != nil {
		return err
	}

	return nil
}
