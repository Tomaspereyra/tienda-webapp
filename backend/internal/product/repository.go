package product

import "context"

// Repository defines the interface for product data access
type Repository interface {
	// GetAll retrieves products with pagination and filters
	GetAll(ctx context.Context, filters GetAllFilters) ([]*Product, int, error)
	
	// GetByID retrieves a single product by ID
	GetByID(ctx context.Context, id int64) (*Product, error)
	
	// Create creates a new product
	Create(ctx context.Context, input CreateProductInput) (*Product, error)
	
	// Update updates an existing product
	Update(ctx context.Context, id int64, input UpdateProductInput) (*Product, error)
	
	// SoftDelete marks a product as deleted
	SoftDelete(ctx context.Context, id int64) error
}

// GetAllFilters contains filters for product listing
type GetAllFilters struct {
	Page     int
	Limit    int
	Search   string
	Category string
	Sort     string // name, price, created_at
	Order    string // asc, desc
}
