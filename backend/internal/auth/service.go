package auth

import (
	"context"
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

// Service provides authentication business logic
type Service struct {
	repo       Repository
	jwtManager *JWTManager
}

// NewService creates a new auth service
func NewService(repo Repository, jwtManager *JWTManager) *Service {
	return &Service{
		repo:       repo,
		jwtManager: jwtManager,
	}
}

// Login authenticates an admin and returns a JWT token
func (s *Service) Login(ctx context.Context, input LoginInput) (*LoginResponse, error) {
	// Validate input
	if err := input.Validate(); err != nil {
		return nil, err
	}
	
	// Get admin by username
	admin, err := s.repo.GetByUsername(ctx, input.Username)
	if err != nil {
		return nil, err
	}
	
	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(admin.PasswordHash), []byte(input.Password)); err != nil {
		return nil, ErrInvalidCredentials
	}
	
	// Generate JWT token
	token, expiresAt, err := s.jwtManager.Generate(admin)
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %w", err)
	}
	
	return &LoginResponse{
		Token:     token,
		ExpiresAt: expiresAt,
		User: &AdminInfo{
			ID:       admin.ID,
			Username: admin.Username,
			Role:     admin.Role,
		},
	}, nil
}

// ValidateToken validates a JWT token and returns the claims
func (s *Service) ValidateToken(tokenString string) (*Claims, error) {
	return s.jwtManager.Validate(tokenString)
}

// HashPassword hashes a password using bcrypt
func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", fmt.Errorf("failed to hash password: %w", err)
	}
	return string(hash), nil
}
