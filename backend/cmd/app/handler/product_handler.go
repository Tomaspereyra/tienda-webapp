package handler

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/tomas/tienda-backend/internal/product"
	"github.com/tomas/tienda-backend/internal/platform/web"
)

// ProductHandler handles product HTTP requests
type ProductHandler struct {
	productService *product.Service
}

// NewProductHandler creates a new product handler
func NewProductHandler(productService *product.Service) *ProductHandler {
	return &ProductHandler{productService: productService}
}

// GetProducts handles GET /api/products
func (h *ProductHandler) GetProducts(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters
	query := r.URL.Query()
	
	page, _ := strconv.Atoi(query.Get("page"))
	if page < 1 {
		page = 1
	}
	
	limit, _ := strconv.Atoi(query.Get("limit"))
	if limit <= 0 {
		limit = 20
	}
	if limit > 100 {
		limit = 100
	}
	
	filters := product.GetAllFilters{
		Page:     page,
		Limit:    limit,
		Search:   query.Get("search"),
		Category: query.Get("category"),
		Sort:     query.Get("sort"),
		Order:    query.Get("order"),
	}
	
	products, total, err := h.productService.GetProducts(r.Context(), filters)
	if err != nil {
		web.RespondInternalError(w, "failed to get products")
		return
	}
	
	// Calculate pagination info
	totalPages := (total + limit - 1) / limit
	
	response := map[string]interface{}{
		"products": products,
		"pagination": map[string]interface{}{
			"page":  page,
			"limit": limit,
			"total": total,
			"pages": totalPages,
		},
	}
	
	web.RespondOK(w, response)
}

// GetProduct handles GET /api/products/:id
func (h *ProductHandler) GetProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		web.RespondBadRequest(w, "invalid product ID")
		return
	}
	
	p, err := h.productService.GetProduct(r.Context(), id)
	if err != nil {
		if errors.Is(err, product.ErrNotFound) {
			web.RespondNotFound(w, "product not found")
			return
		}
		web.RespondInternalError(w, "failed to get product")
		return
	}
	
	web.RespondOK(w, p)
}

// CreateProduct handles POST /api/products
func (h *ProductHandler) CreateProduct(w http.ResponseWriter, r *http.Request) {
	var input product.CreateProductInput
	
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		web.RespondBadRequest(w, "invalid request body")
		return
	}
	
	p, err := h.productService.CreateProduct(r.Context(), input)
	if err != nil {
		web.RespondBadRequest(w, err.Error())
		return
	}
	
	web.RespondCreated(w, p)
}

// UpdateProduct handles PUT /api/products/:id
func (h *ProductHandler) UpdateProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		web.RespondBadRequest(w, "invalid product ID")
		return
	}
	
	var input product.UpdateProductInput
	
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		web.RespondBadRequest(w, "invalid request body")
		return
	}
	
	p, err := h.productService.UpdateProduct(r.Context(), id, input)
	if err != nil {
		if errors.Is(err, product.ErrNotFound) {
			web.RespondNotFound(w, "product not found")
			return
		}
		web.RespondBadRequest(w, err.Error())
		return
	}
	
	web.RespondOK(w, p)
}

// DeleteProduct handles DELETE /api/products/:id
func (h *ProductHandler) DeleteProduct(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		web.RespondBadRequest(w, "invalid product ID")
		return
	}
	
	if err := h.productService.DeleteProduct(r.Context(), id); err != nil {
		if errors.Is(err, product.ErrNotFound) {
			web.RespondNotFound(w, "product not found")
			return
		}
		web.RespondInternalError(w, "failed to delete product")
		return
	}
	
	web.RespondNoContent(w)
}
