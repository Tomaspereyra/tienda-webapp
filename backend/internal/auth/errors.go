package auth

import "errors"

var (
	// ErrInvalidCredentials indicates invalid username or password
	ErrInvalidCredentials = errors.New("invalid credentials")
	
	// ErrUnauthorized indicates unauthorized access
	ErrUnauthorized = errors.New("unauthorized")
	
	// ErrInvalidToken indicates an invalid JWT token
	ErrInvalidToken = errors.New("invalid token")
)
