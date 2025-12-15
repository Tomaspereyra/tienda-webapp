package auth

import "context"

// Repository defines the interface for admin data access
type Repository interface {
	// GetByUsername retrieves an admin by username
	GetByUsername(ctx context.Context, username string) (*Admin, error)
}
