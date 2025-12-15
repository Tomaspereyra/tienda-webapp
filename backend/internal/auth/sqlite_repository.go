package auth

import (
	"context"
	"database/sql"
	"fmt"
)

// SQLiteRepository implements Repository using SQLite
type SQLiteRepository struct {
	db *sql.DB
}

// NewSQLiteRepository creates a new SQLite admin repository
func NewSQLiteRepository(db *sql.DB) *SQLiteRepository {
	return &SQLiteRepository{db: db}
}

// GetByUsername retrieves an admin by username
func (r *SQLiteRepository) GetByUsername(ctx context.Context, username string) (*Admin, error) {
	query := `
		SELECT id, username, password_hash, role, created_at
		FROM admins
		WHERE username = ?
	`
	
	var admin Admin
	err := r.db.QueryRowContext(ctx, query, username).Scan(
		&admin.ID,
		&admin.Username,
		&admin.PasswordHash,
		&admin.Role,
		&admin.CreatedAt,
	)
	
	if err == sql.ErrNoRows {
		return nil, ErrInvalidCredentials
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get admin by username: %w", err)
	}
	
	return &admin, nil
}
