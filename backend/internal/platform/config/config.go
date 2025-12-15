package config

import (
	"fmt"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Config holds all application configuration
type Config struct {
	Port            string
	Env             string
	DBPath          string
	JWTSecret       string
	JWTExpiryHours  int
	CORSOrigin      string
	UploadDir       string
	MaxUploadSizeMB int
	LogLevel        string
	BaseURL         string
}

// Load reads configuration from environment variables
// It first attempts to load from .env file, then reads from environment
func Load() (*Config, error) {
	// Load .env file if it exists (ignore error if not found)
	_ = godotenv.Load()

	cfg := &Config{
		Port:            getEnv("PORT", "3000"),
		Env:             getEnv("ENV", "development"),
		DBPath:          getEnv("DB_PATH", "./data/tienda.db"),
		JWTSecret:       getEnv("JWT_SECRET", ""),
		JWTExpiryHours:  getEnvAsInt("JWT_EXPIRY_HOURS", 24),
		CORSOrigin:      getEnv("CORS_ORIGIN", "http://localhost:5173"),
		UploadDir:       getEnv("UPLOAD_DIR", "./uploads"),
		MaxUploadSizeMB: getEnvAsInt("MAX_UPLOAD_SIZE_MB", 5),
		LogLevel:        getEnv("LOG_LEVEL", "info"),
		BaseURL:         getEnv("BASE_URL", "http://localhost:3000"),
	}

	// Validate required fields
	if cfg.JWTSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET is required but not set")
	}

	if len(cfg.JWTSecret) < 32 {
		return nil, fmt.Errorf("JWT_SECRET must be at least 32 characters long")
	}

	return cfg, nil
}

// getEnv retrieves an environment variable or returns a default value
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}

// getEnvAsInt retrieves an environment variable as integer or returns default
func getEnvAsInt(key string, defaultValue int) int {
	valueStr := os.Getenv(key)
	if valueStr == "" {
		return defaultValue
	}

	value, err := strconv.Atoi(valueStr)
	if err != nil {
		return defaultValue
	}

	return value
}
