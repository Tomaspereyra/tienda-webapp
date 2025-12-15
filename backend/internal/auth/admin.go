package auth

import (
	"time"
)

// Admin represents an admin user
type Admin struct {
	ID           int64     `json:"id"`
	Username     string    `json:"username"`
	PasswordHash string    `json:"-"` // Never expose password hash
	Role         string    `json:"role"`
	CreatedAt    time.Time `json:"created_at"`
}

// LoginInput represents admin login credentials
type LoginInput struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// LoginResponse represents the login response with token
type LoginResponse struct {
	Token     string      `json:"token"`
	ExpiresAt time.Time   `json:"expires_at"`
	User      *AdminInfo  `json:"user"`
}

// AdminInfo represents non-sensitive admin information
type AdminInfo struct {
	ID       int64  `json:"id"`
	Username string `json:"username"`
	Role     string `json:"role"`
}

// Validate validates login input
func (input *LoginInput) Validate() error {
	if input.Username == "" {
		return ErrInvalidCredentials
	}
	if input.Password == "" {
		return ErrInvalidCredentials
	}
	return nil
}
