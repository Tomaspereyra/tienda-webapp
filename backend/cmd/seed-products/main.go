package main

import (
	"encoding/json"
	"log"

	"github.com/tomas/tienda-backend/internal/platform/config"
	"github.com/tomas/tienda-backend/internal/platform/database"
	_ "modernc.org/sqlite"
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

	// Sample products
	products := []struct {
		Name        string
		Description string
		Price       int
		Category    string
		Images      []string
		Tags        []string
		Sizes       []string
		Colors      []string
		Gender      string
		Oversize    bool
		Featured    bool
	}{
		{
			Name:        "Remera Virgen María",
			Description: "Diseño religioso de alta calidad con estampado de la Virgen María",
			Price:       5000,
			Category:    "Santos",
			Images:      []string{"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800"},
			Tags:        []string{"virgen", "maria", "religioso", "fe"},
			Sizes:       []string{"S", "M", "L", "XL"},
			Colors:      []string{"Blanco", "Negro", "Azul"},
			Gender:      "unisex",
			Oversize:    false,
			Featured:    true,
		},
		{
			Name:        "Remera San Jorge",
			Description: "Estampado del Santo Patrono San Jorge",
			Price:       5500,
			Category:    "Santos",
			Images:      []string{"https://images.unsplash.com/photo-1622445272461-c6580cab8755?w=800"},
			Tags:        []string{"san jorge", "santo", "religioso"},
			Sizes:       []string{"M", "L", "XL"},
			Colors:      []string{"Blanco", "Negro"},
			Gender:      "male",
			Oversize:    false,
			Featured:    false,
		},
		{
			Name:        "Remera Jesús",
			Description: "Diseño inspirador con imagen de Jesús",
			Price:       5200,
			Category:    "Santos",
			Images:      []string{"https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800"},
			Tags:        []string{"jesus", "cristo", "religioso", "fe"},
			Sizes:       []string{"S", "M", "L", "XL", "XXL"},
			Colors:      []string{"Blanco", "Gris", "Negro"},
			Gender:      "unisex",
			Oversize:    false,
			Featured:    true,
		},
		{
			Name:        "Remera Cruz",
			Description: "Diseño minimalista con cruz cristiana",
			Price:       4500,
			Category:    "Santos",
			Images:      []string{"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"},
			Tags:        []string{"cruz", "cristiano", "simple"},
			Sizes:       []string{"S", "M", "L", "XL"},
			Colors:      []string{"Blanco", "Negro", "Gris", "Azul"},
			Gender:      "unisex",
			Oversize:    true,
			Featured:    false,
		},
		{
			Name:        "Remera Personalizada",
			Description: "Diseño custom creado por el cliente",
			Price:       6000,
			Category:    "Custom",
			Images:      []string{"https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800", "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800"},
			Tags:        []string{"custom", "personalizado", "diseño"},
			Sizes:       []string{"S", "M", "L", "XL", "XXL"},
			Colors:      []string{"Todos los colores disponibles"},
			Gender:      "unisex",
			Oversize:    false,
			Featured:    true,
		},
	}

	// Insert products
	for _, p := range products {
		imagesJSON, _ := json.Marshal(p.Images)
		tagsJSON, _ := json.Marshal(p.Tags)
		sizesJSON, _ := json.Marshal(p.Sizes)
		colorsJSON, _ := json.Marshal(p.Colors)

		oversizeInt := 0
		if p.Oversize {
			oversizeInt = 1
		}
		featuredInt := 0
		if p.Featured {
			featuredInt = 1
		}

		query := `
			INSERT INTO products (name, description, price, category, images, tags, sizes, colors, gender, oversize, featured, created_at, updated_at)
			VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
		`

		_, err := db.DB.Exec(query, p.Name, p.Description, p.Price, p.Category,
			string(imagesJSON), string(tagsJSON), string(sizesJSON), string(colorsJSON),
			p.Gender, oversizeInt, featuredInt)
		if err != nil {
			log.Printf("Failed to insert product %s: %v", p.Name, err)
			continue
		}

		log.Printf("✓ Created product: %s", p.Name)
	}

	log.Println("\n🎉 Successfully seeded products!")
	log.Println("Run the frontend to see the products in the catalog.")
}
