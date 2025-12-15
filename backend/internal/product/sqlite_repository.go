package product

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"strings"
	"time"
)

// SQLiteRepository implements Repository using SQLite
type SQLiteRepository struct {
	db *sql.DB
}

// NewSQLiteRepository creates a new SQLite product repository
func NewSQLiteRepository(db *sql.DB) *SQLiteRepository {
	return &SQLiteRepository{db: db}
}

// GetAll retrieves products with pagination and filters
func (r *SQLiteRepository) GetAll(ctx context.Context, filters GetAllFilters) ([]*Product, int, error) {
	// Build WHERE clause
	var whereClauses []string
	var args []interface{}

	// Exclude deleted products
	whereClauses = append(whereClauses, "deleted_at IS NULL")

	// Search filter
	if filters.Search != "" {
		whereClauses = append(whereClauses, "(name LIKE ? OR description LIKE ?)")
		searchTerm := "%" + filters.Search + "%"
		args = append(args, searchTerm, searchTerm)
	}

	// Category filter
	if filters.Category != "" {
		whereClauses = append(whereClauses, "category = ?")
		args = append(args, filters.Category)
	}

	whereClause := ""
	if len(whereClauses) > 0 {
		whereClause = "WHERE " + strings.Join(whereClauses, " AND ")
	}

	// Get total count
	countQuery := fmt.Sprintf("SELECT COUNT(*) FROM products %s", whereClause)
	var total int
	if err := r.db.QueryRowContext(ctx, countQuery, args...).Scan(&total); err != nil {
		return nil, 0, fmt.Errorf("failed to count products: %w", err)
	}

	// Build ORDER BY clause
	orderBy := "created_at"
	if filters.Sort != "" {
		switch filters.Sort {
		case "name", "price", "created_at":
			orderBy = filters.Sort
		}
	}

	order := "DESC"
	if filters.Order == "asc" {
		order = "ASC"
	}

	// Pagination
	limit := filters.Limit
	if limit <= 0 || limit > 100 {
		limit = 20
	}

	offset := 0
	if filters.Page > 1 {
		offset = (filters.Page - 1) * limit
	}

	// Build and execute query
	query := fmt.Sprintf(
		`SELECT id, name, description, price, category, images, tags, sizes, colors, gender, oversize, featured, created_at, updated_at, deleted_at
		 FROM products
		 %s
		 ORDER BY %s %s
		 LIMIT ? OFFSET ?`,
		whereClause, orderBy, order,
	)

	args = append(args, limit, offset)
	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to query products: %w", err)
	}
	defer rows.Close()

	var products []*Product
	for rows.Next() {
		product, err := scanProduct(rows)
		if err != nil {
			return nil, 0, fmt.Errorf("failed to scan product: %w", err)
		}
		products = append(products, product)
	}

	if err := rows.Err(); err != nil {
		return nil, 0, fmt.Errorf("row iteration error: %w", err)
	}

	return products, total, nil
}

// GetByID retrieves a single product by ID
func (r *SQLiteRepository) GetByID(ctx context.Context, id int64) (*Product, error) {
	query := `
		SELECT id, name, description, price, category, images, tags, sizes, colors, gender, oversize, featured, created_at, updated_at, deleted_at
		FROM products
		WHERE id = ? AND deleted_at IS NULL
	`

	row := r.db.QueryRowContext(ctx, query, id)
	product, err := scanProduct(row)
	if err == sql.ErrNoRows {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, fmt.Errorf("failed to get product: %w", err)
	}

	return product, nil
}

// Create creates a new product
func (r *SQLiteRepository) Create(ctx context.Context, input CreateProductInput) (*Product, error) {
	// Serialize arrays to JSON
	imagesJSON, _ := json.Marshal(input.Images)
	tagsJSON, _ := json.Marshal(input.Tags)
	sizesJSON, _ := json.Marshal(input.Sizes)
	colorsJSON, _ := json.Marshal(input.Colors)

	query := `
		INSERT INTO products (name, description, price, category, images, tags, sizes, colors, gender, oversize, featured, created_at, updated_at)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	`

	now := time.Now()
	oversizeInt := 0
	if input.Oversize {
		oversizeInt = 1
	}
	featuredInt := 0
	if input.Featured {
		featuredInt = 1
	}

	result, err := r.db.ExecContext(
		ctx, query,
		input.Name,
		input.Description,
		input.Price,
		input.Category,
		string(imagesJSON),
		string(tagsJSON),
		string(sizesJSON),
		string(colorsJSON),
		input.Gender,
		oversizeInt,
		featuredInt,
		now,
		now,
	)
	if err != nil {
		return nil, fmt.Errorf("failed to create product: %w", err)
	}

	id, err := result.LastInsertId()
	if err != nil {
		return nil, fmt.Errorf("failed to get last insert ID: %w", err)
	}

	// Return the created product
	return r.GetByID(ctx, id)
}

// Update updates an existing product
func (r *SQLiteRepository) Update(ctx context.Context, id int64, input UpdateProductInput) (*Product, error) {
	// Check if product exists
	_, err := r.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	// Build UPDATE query dynamically
	var setClauses []string
	var args []interface{}

	if input.Name != nil {
		setClauses = append(setClauses, "name = ?")
		args = append(args, *input.Name)
	}
	if input.Description != nil {
		setClauses = append(setClauses, "description = ?")
		args = append(args, *input.Description)
	}
	if input.Price != nil {
		setClauses = append(setClauses, "price = ?")
		args = append(args, *input.Price)
	}
	if input.Category != nil {
		setClauses = append(setClauses, "category = ?")
		args = append(args, *input.Category)
	}
	if input.Images != nil {
		imagesJSON, _ := json.Marshal(*input.Images)
		setClauses = append(setClauses, "images = ?")
		args = append(args, string(imagesJSON))
	}
	if input.Tags != nil {
		tagsJSON, _ := json.Marshal(*input.Tags)
		setClauses = append(setClauses, "tags = ?")
		args = append(args, string(tagsJSON))
	}
	if input.Sizes != nil {
		sizesJSON, _ := json.Marshal(*input.Sizes)
		setClauses = append(setClauses, "sizes = ?")
		args = append(args, string(sizesJSON))
	}
	if input.Colors != nil {
		colorsJSON, _ := json.Marshal(*input.Colors)
		setClauses = append(setClauses, "colors = ?")
		args = append(args, string(colorsJSON))
	}
	if input.Gender != nil {
		setClauses = append(setClauses, "gender = ?")
		args = append(args, *input.Gender)
	}
	if input.Oversize != nil {
		oversizeInt := 0
		if *input.Oversize {
			oversizeInt = 1
		}
		setClauses = append(setClauses, "oversize = ?")
		args = append(args, oversizeInt)
	}
	if input.Featured != nil {
		featuredInt := 0
		if *input.Featured {
			featuredInt = 1
		}
		setClauses = append(setClauses, "featured = ?")
		args = append(args, featuredInt)
	}

	// Always update updated_at
	setClauses = append(setClauses, "updated_at = ?")
	args = append(args, time.Now())

	// Add ID to args
	args = append(args, id)

	// Execute update
	query := fmt.Sprintf(
		"UPDATE products SET %s WHERE id = ? AND deleted_at IS NULL",
		strings.Join(setClauses, ", "),
	)

	_, err = r.db.ExecContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to update product: %w", err)
	}

	// Return updated product
	return r.GetByID(ctx, id)
}

// SoftDelete marks a product as deleted
func (r *SQLiteRepository) SoftDelete(ctx context.Context, id int64) error {
	// Check if product exists
	_, err := r.GetByID(ctx, id)
	if err != nil {
		return err
	}

	query := "UPDATE products SET deleted_at = ? WHERE id = ?"
	_, err = r.db.ExecContext(ctx, query, time.Now(), id)
	if err != nil {
		return fmt.Errorf("failed to soft delete product: %w", err)
	}

	return nil
}
