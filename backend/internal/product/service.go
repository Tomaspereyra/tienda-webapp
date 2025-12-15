package product

import "context"

// Service provides business logic for products
type Service struct {
	repo Repository
}

// NewService creates a new product service
func NewService(repo Repository) *Service {
	return &Service{repo: repo}
}

// GetProducts retrieves products with filters
func (s *Service) GetProducts(ctx context.Context, filters GetAllFilters) ([]*Product, int, error) {
	return s.repo.GetAll(ctx, filters)
}

// GetProduct retrieves a single product by ID
func (s *Service) GetProduct(ctx context.Context, id int64) (*Product, error) {
	return s.repo.GetByID(ctx, id)
}

// CreateProduct creates a new product with validation
func (s *Service) CreateProduct(ctx context.Context, input CreateProductInput) (*Product, error) {
	// Validate input
	if err := input.Validate(); err != nil {
		return nil, err
	}
	
	return s.repo.Create(ctx, input)
}

// UpdateProduct updates an existing product
func (s *Service) UpdateProduct(ctx context.Context, id int64, input UpdateProductInput) (*Product, error) {
	// Validate price if provided
	if input.Price != nil && *input.Price <= 0 {
		return nil, ErrInvalidInput("price must be greater than 0")
	}
	
	return s.repo.Update(ctx, id, input)
}

// DeleteProduct soft-deletes a product
func (s *Service) DeleteProduct(ctx context.Context, id int64) error {
	return s.repo.SoftDelete(ctx, id)
}
