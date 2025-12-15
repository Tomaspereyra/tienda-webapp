package product

import (
	"database/sql"
	"encoding/json"
	"time"
)

// Product represents a t-shirt product in the catalog
type Product struct {
	ID          int64      `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Price       int        `json:"price"` // Price in cents
	Category    string     `json:"category"`
	Images      []string   `json:"images"`
	Tags        []string   `json:"tags"`
	Sizes       []string   `json:"sizes"`
	Colors      []string   `json:"colors"`
	Gender      string     `json:"gender"`
	Oversize    bool       `json:"oversize"`
	Featured    bool       `json:"featured"`
	CreatedAt   time.Time  `json:"created_at"`
	UpdatedAt   time.Time  `json:"updated_at"`
	DeletedAt   *time.Time `json:"deleted_at,omitempty"`
}

// CreateProductInput represents input for creating a product
type CreateProductInput struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	Price       int      `json:"price"`
	Category    string   `json:"category"`
	Images      []string `json:"images"`
	Tags        []string `json:"tags"`
	Sizes       []string `json:"sizes"`
	Colors      []string `json:"colors"`
	Gender      string   `json:"gender"`
	Oversize    bool     `json:"oversize"`
	Featured    bool     `json:"featured"`
}

// UpdateProductInput represents input for updating a product
type UpdateProductInput struct {
	Name        *string   `json:"name,omitempty"`
	Description *string   `json:"description,omitempty"`
	Price       *int      `json:"price,omitempty"`
	Category    *string   `json:"category,omitempty"`
	Images      *[]string `json:"images,omitempty"`
	Tags        *[]string `json:"tags,omitempty"`
	Sizes       *[]string `json:"sizes,omitempty"`
	Colors      *[]string `json:"colors,omitempty"`
	Gender      *string   `json:"gender,omitempty"`
	Oversize    *bool     `json:"oversize,omitempty"`
	Featured    *bool     `json:"featured,omitempty"`
}

// Validate validates product creation input
func (input *CreateProductInput) Validate() error {
	if input.Name == "" {
		return ErrInvalidInput("name is required")
	}
	if input.Price <= 0 {
		return ErrInvalidInput("price must be greater than 0")
	}
	return nil
}

// scanProduct scans a database row into a Product
func scanProduct(row interface{ Scan(...interface{}) error }) (*Product, error) {
	var p Product
	var imagesJSON, tagsJSON, sizesJSON, colorsJSON sql.NullString
	var gender sql.NullString
	var oversize, featured sql.NullInt64
	var deletedAt sql.NullTime

	err := row.Scan(
		&p.ID,
		&p.Name,
		&p.Description,
		&p.Price,
		&p.Category,
		&imagesJSON,
		&tagsJSON,
		&sizesJSON,
		&colorsJSON,
		&gender,
		&oversize,
		&featured,
		&p.CreatedAt,
		&p.UpdatedAt,
		&deletedAt,
	)
	if err != nil {
		return nil, err
	}

	// Parse JSON arrays
	if imagesJSON.Valid && imagesJSON.String != "" {
		json.Unmarshal([]byte(imagesJSON.String), &p.Images)
	}
	if tagsJSON.Valid && tagsJSON.String != "" {
		json.Unmarshal([]byte(tagsJSON.String), &p.Tags)
	}
	if sizesJSON.Valid && sizesJSON.String != "" {
		json.Unmarshal([]byte(sizesJSON.String), &p.Sizes)
	}
	if colorsJSON.Valid && colorsJSON.String != "" {
		json.Unmarshal([]byte(colorsJSON.String), &p.Colors)
	}

	// Parse nullable fields
	if gender.Valid {
		p.Gender = gender.String
	}
	if oversize.Valid {
		p.Oversize = oversize.Int64 == 1
	}
	if featured.Valid {
		p.Featured = featured.Int64 == 1
	}

	if deletedAt.Valid {
		p.DeletedAt = &deletedAt.Time
	}

	// Initialize empty slices if nil
	if p.Images == nil {
		p.Images = []string{}
	}
	if p.Tags == nil {
		p.Tags = []string{}
	}
	if p.Sizes == nil {
		p.Sizes = []string{}
	}
	if p.Colors == nil {
		p.Colors = []string{}
	}

	return &p, nil
}
