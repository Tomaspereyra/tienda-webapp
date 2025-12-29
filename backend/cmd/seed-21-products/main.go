package main

import (
	"context"
	"fmt"
	"log"

	"github.com/tomas/tienda-backend/internal/platform/config"
	"github.com/tomas/tienda-backend/internal/platform/database"
	"github.com/tomas/tienda-backend/internal/product"
)

func main() {
	// Load configuration
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	// Initialize database
	db, err := database.New(cfg.DBPath)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// Run migrations
	if err := database.Migrate(db.DB); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Initialize repository
	repo := product.NewSQLiteRepository(db.DB)
	ctx := context.Background()

	log.Println("Starting to seed 21 products to test bug...")
	log.Println("========================================")

	// Create exactly 21 products
	for i := 1; i <= 21; i++ {
		input := product.CreateProductInput{
			Name:        fmt.Sprintf("Producto Test %d", i),
			Description: fmt.Sprintf("Esta es la descripción del producto número %d.\nSegunda línea de descripción.\nTercera línea para test de multilínea.", i),
			Price:       2500 + (i * 100), // Variable prices
			Category:    getCategory(i),
			Images: []string{
				"https://via.placeholder.com/800x1000/333333/FFFFFF?text=Producto+" + fmt.Sprint(i),
			},
			Tags:     []string{"test", "seed"},
			Sizes:    []string{"S", "M", "L", "XL"},
			Colors:   []string{"Blanco", "Negro"},
			Gender:   getGender(i),
			Oversize: i%3 == 0, // Every 3rd product is oversize
			Featured: i%5 == 0, // Every 5th product is featured
		}

		createdProduct, err := repo.Create(ctx, input)
		if err != nil {
			log.Fatalf("Failed to create product %d: %v", i, err)
		}

		log.Printf("✓ Created product %d: ID=%d, Name='%s'", i, createdProduct.ID, createdProduct.Name)
	}

	log.Println("========================================")
	log.Println("Seed completed! Testing retrieval...")
	log.Println("")

	// Retrieve all products to verify
	filters := product.GetAllFilters{
		Limit: 100, // Get all products
		Page:  1,
	}

	products, total, err := repo.GetAll(ctx, filters)
	if err != nil {
		log.Fatalf("Failed to retrieve products: %v", err)
	}

	log.Printf("Total products in database: %d", total)
	log.Println("")

	// Check if product #1 still exists
	product1, err := repo.GetByID(ctx, 1)
	if err != nil {
		log.Printf("❌ ERROR: Product with ID=1 not found! (Bug confirmed)")
	} else {
		log.Printf("✓ Product ID=1 exists: '%s'", product1.Name)
	}

	log.Println("")
	log.Println("All products:")
	log.Println("ID | Name")
	log.Println("---|---------------------")
	for _, p := range products {
		log.Printf("%2d | %s", p.ID, p.Name)
	}

	log.Println("")
	if total == 21 {
		log.Println("✅ SUCCESS: All 21 products created correctly!")
	} else {
		log.Printf("❌ BUG DETECTED: Expected 21 products, but found %d", total)
	}

	// Check if any product was overwritten
	log.Println("")
	log.Println("Checking for expected product names...")
	for i := 1; i <= 21; i++ {
		expectedName := fmt.Sprintf("Producto Test %d", i)
		found := false
		for _, p := range products {
			if p.Name == expectedName {
				found = true
				break
			}
		}
		if !found {
			log.Printf("❌ WARNING: '%s' not found - may have been overwritten!", expectedName)
		}
	}
}

// getCategory returns category based on product number
func getCategory(i int) string {
	categories := []string{"Religioso", "Casual", "Deportivo"}
	return categories[i%3]
}

// getGender returns gender based on product number
func getGender(i int) string {
	genders := []string{"Hombre", "Mujer", "Niño"}
	return genders[i%3]
}
