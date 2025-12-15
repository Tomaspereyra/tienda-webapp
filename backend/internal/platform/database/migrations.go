package database

import (
	"database/sql"
	"fmt"
)

// Migration represents a database schema migration
type Migration struct {
	Version     int
	Description string
	SQL         string
}

// migrations contains all database migrations in order
var migrations = []Migration{
	{
		Version:     1,
		Description: "Create products table",
		SQL: `
			CREATE TABLE IF NOT EXISTS products (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				description TEXT,
				price INTEGER NOT NULL,
				category TEXT,
				images TEXT,
				tags TEXT,
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
				deleted_at TIMESTAMP NULL
			);

			CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
			CREATE INDEX IF NOT EXISTS idx_products_deleted ON products(deleted_at);
		`,
	},
	{
		Version:     2,
		Description: "Create admins table",
		SQL: `
			CREATE TABLE IF NOT EXISTS admins (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				username TEXT UNIQUE NOT NULL,
				password_hash TEXT NOT NULL,
				role TEXT DEFAULT 'admin',
				created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`,
	},
	{
		Version:     3,
		Description: "Create schema_migrations table",
		SQL: `
			CREATE TABLE IF NOT EXISTS schema_migrations (
				version INTEGER PRIMARY KEY,
				applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
			);
		`,
	},
	{
		Version:     4,
		Description: "Add sizes, colors, gender, oversize, and featured to products",
		SQL: `
			ALTER TABLE products ADD COLUMN sizes TEXT;
			ALTER TABLE products ADD COLUMN colors TEXT;
			ALTER TABLE products ADD COLUMN gender TEXT;
			ALTER TABLE products ADD COLUMN oversize INTEGER DEFAULT 0;
			ALTER TABLE products ADD COLUMN featured INTEGER DEFAULT 0;
			
			CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
		`,
	},
}

// Migrate runs all pending migrations
func Migrate(db *sql.DB) error {
	// Ensure schema_migrations table exists
	_, err := db.Exec(`
		CREATE TABLE IF NOT EXISTS schema_migrations (
			version INTEGER PRIMARY KEY,
			applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
		);
	`)
	if err != nil {
		return fmt.Errorf("failed to create schema_migrations table: %w", err)
	}

	// Get current version
	currentVersion := 0
	row := db.QueryRow("SELECT COALESCE(MAX(version), 0) FROM schema_migrations")
	if err := row.Scan(&currentVersion); err != nil {
		return fmt.Errorf("failed to get current migration version: %w", err)
	}

	// Apply pending migrations
	for _, migration := range migrations {
		if migration.Version <= currentVersion {
			continue
		}

		// Begin transaction
		tx, err := db.Begin()
		if err != nil {
			return fmt.Errorf("failed to begin transaction for migration %d: %w", migration.Version, err)
		}

		// Execute migration
		if _, err := tx.Exec(migration.SQL); err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to execute migration %d (%s): %w", migration.Version, migration.Description, err)
		}

		// Record migration
		if _, err := tx.Exec("INSERT INTO schema_migrations (version) VALUES (?)", migration.Version); err != nil {
			tx.Rollback()
			return fmt.Errorf("failed to record migration %d: %w", migration.Version, err)
		}

		// Commit transaction
		if err := tx.Commit(); err != nil {
			return fmt.Errorf("failed to commit migration %d: %w", migration.Version, err)
		}

		fmt.Printf("Applied migration %d: %s\n", migration.Version, migration.Description)
	}

	return nil
}
