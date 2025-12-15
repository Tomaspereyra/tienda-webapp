package product

import (
	"errors"
	"fmt"
)

var (
	// ErrNotFound indicates a product was not found
	ErrNotFound = errors.New("product not found")
	
	// ErrInvalidInput indicates invalid input data
	ErrInvalidInput = func(msg string) error {
		return fmt.Errorf("invalid input: %s", msg)
	}
)
