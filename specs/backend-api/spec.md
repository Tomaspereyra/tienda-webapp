# Feature Specification: Go Backend API with SQLite

*Created*: December 9, 2025

## User Scenarios & Testing

### User Story 1 - Browse Products Catalog (Priority: P1)

Public users can view the t-shirt product catalog without authentication. The API returns product listings with pagination, filtering, and search capabilities.

*Why this priority*: Core business functionality - customers must be able to see products before they can purchase.

*Independent Test*: Can be tested by making a GET request to `/api/products` and verifying the response contains product data with images, prices, and descriptions.

*Acceptance Scenarios*:

1. *Given* no authentication, *When* user requests `/api/products`, *Then* system returns paginated list of all active products
2. *Given* a search query "virgen", *When* user requests `/api/products?search=virgen`, *Then* system returns only products matching the search term
3. *Given* pagination params, *When* user requests `/api/products?page=2&limit=10`, *Then* system returns second page with 10 products
4. *Given* a category filter, *When* user requests `/api/products?category=Santos`, *Then* system returns only products in that category

---

### User Story 2 - View Product Details (Priority: P1)

Public users can view detailed information about a specific product including all images, full description, price, and availability.

*Why this priority*: Essential for customer decision-making before purchase.

*Independent Test*: Can be tested by making a GET request to `/api/products/{id}` and verifying response contains complete product information.

*Acceptance Scenarios*:

1. *Given* a valid product ID, *When* user requests `/api/products/123`, *Then* system returns complete product details
2. *Given* an invalid product ID, *When* user requests `/api/products/999`, *Then* system returns 404 Not Found
3. *Given* a deleted product ID, *When* user requests that product, *Then* system returns 404 Not Found

---

### User Story 3 - Admin Authentication (Priority: P2)

Admin users can authenticate with username/password to access protected admin endpoints. JWT tokens are issued for subsequent requests.

*Why this priority*: Required for admin operations but not customer-facing features.

*Independent Test*: Can be tested by POST to `/api/auth/login` with credentials and verifying JWT token is returned.

*Acceptance Scenarios*:

1. *Given* valid admin credentials, *When* admin posts to `/api/auth/login`, *Then* system returns JWT token with admin role
2. *Given* invalid credentials, *When* user attempts login, *Then* system returns 401 Unauthorized
3. *Given* a valid JWT token, *When* admin accesses protected route, *Then* request is authorized
4. *Given* an expired JWT token, *When* admin accesses protected route, *Then* system returns 401 Unauthorized

---

### User Story 4 - Create New Product (Priority: P2)

Admin users can create new products with name, description, price, category, images, and tags via authenticated API endpoint.

*Why this priority*: Core admin functionality for managing inventory.

*Independent Test*: Can be tested by POST to `/api/products` with JWT token and product data, verifying product is created in database.

*Acceptance Scenarios*:

1. *Given* authenticated admin and valid product data, *When* admin posts to `/api/products`, *Then* system creates product and returns 201 with product ID
2. *Given* missing required fields, *When* admin attempts to create product, *Then* system returns 400 Bad Request with validation errors
3. *Given* duplicate product name, *When* admin attempts creation, *Then* system either creates with unique ID or returns conflict error
4. *Given* image file upload, *When* admin creates product, *Then* system saves image and returns image URL

---

### User Story 5 - Update Existing Product (Priority: P2)

Admin users can update any product field including images, prices, descriptions via authenticated API endpoint.

*Why this priority*: Essential for maintaining accurate product information.

*Independent Test*: Can be tested by PUT to `/api/products/{id}` with changes and verifying updates persist.

*Acceptance Scenarios*:

1. *Given* authenticated admin and valid updates, *When* admin updates product, *Then* system applies changes and returns updated product
2. *Given* invalid product ID, *When* admin attempts update, *Then* system returns 404 Not Found
3. *Given* partial update data, *When* admin sends PATCH request, *Then* system updates only specified fields
4. *Given* new image upload, *When* admin updates product, *Then* system replaces old image with new one

---

### User Story 6 - Delete Product (Priority: P2)

Admin users can soft-delete products. Deleted products are hidden from public catalog but preserved in database for reference.

*Why this priority*: Important for inventory management without data loss.

*Independent Test*: Can be tested by DELETE to `/api/products/{id}` and verifying product no longer appears in public listings.

*Acceptance Scenarios*:

1. *Given* authenticated admin and valid product ID, *When* admin deletes product, *Then* system marks as deleted and returns 204 No Content
2. *Given* deleted product, *When* public user requests catalog, *Then* deleted product is not included
3. *Given* deleted product ID, *When* admin views deleted products list, *Then* product appears with deleted status

---

### Edge Cases

- What happens when database file is locked (concurrent writes)?
- How does system handle image uploads exceeding size limits?
- What happens when JWT token is tampered with?
- How does system handle special characters in product names (SQL injection)?
- What happens when disk is full during image upload?
- How does pagination behave when total count changes during request?
- What happens when searching with empty or very long search terms?
- How does system handle concurrent product updates by multiple admins?

## Requirements

### Functional Requirements

- *FR-001*: System MUST provide RESTful API endpoints for product CRUD operations
- *FR-002*: System MUST use SQLite database for persistence
- *FR-003*: System MUST authenticate admin users via JWT tokens
- *FR-004*: System MUST support image file uploads for products
- *FR-005*: System MUST serve uploaded images as static files
- *FR-006*: System MUST validate all input data before database operations
- *FR-007*: System MUST implement soft-delete for products (preserve data)
- *FR-008*: System MUST support pagination for product listings
- *FR-009*: System MUST support search and filtering of products
- *FR-010*: System MUST enable CORS for frontend at `http://localhost:5173`
- *FR-011*: System MUST hash admin passwords using bcrypt
- *FR-012*: System MUST log all API requests and errors
- *FR-013*: System MUST handle database migrations for schema changes
- *FR-014*: System MUST return consistent JSON error responses
- *FR-015*: System MUST limit image uploads to reasonable sizes (5MB)

### Technical Requirements

- *TR-001*: Backend MUST be written in Go (version 1.21+)
- *TR-002*: Database MUST be SQLite 3
- *TR-003*: Server MUST run on port 3000 by default
- *TR-004*: JWT tokens MUST expire after 24 hours
- *TR-005*: Image uploads MUST be stored in `./uploads` directory
- *TR-006*: Database file MUST be `./data/tienda.db`
- *TR-007*: API MUST follow RESTful conventions
- *TR-008*: Response times MUST be under 100ms for simple queries
- *TR-009*: System MUST be deployable as single binary
- *TR-010*: System MUST use minimal external dependencies

### Key Entities

- *Product*: 
  - Represents a t-shirt product in the catalog
  - Attributes: ID, name, description, price, category, images (array), tags (array), created_at, updated_at, deleted_at (nullable)
  - Relationships: Can have multiple images

- *Admin*:
  - Represents an admin user with system access
  - Attributes: ID, username, password_hash, role, created_at
  - Relationships: None (single admin table)

- *Image*:
  - Represents an uploaded product image
  - Stored as file on disk, URL stored in Product
  - Attributes: filename, path, mime_type, size

## API Endpoints Design

### Public Endpoints (No Auth Required)

#### GET /api/products
Get paginated list of products

**Query Params:**
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `search` - text search in name/description
- `category` - filter by category
- `sort` - sort field (name, price, created_at)
- `order` - asc/desc

**Response 200:**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Remera Virgen María",
      "description": "...",
      "price": 5000,
      "category": "Santos",
      "images": ["/uploads/image1.png"],
      "tags": ["virgen", "maria"],
      "created_at": "2025-12-09T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

#### GET /api/products/:id
Get single product details

**Response 200:**
```json
{
  "id": 1,
  "name": "Remera Virgen María",
  "description": "Diseño...",
  "price": 5000,
  "category": "Santos",
  "images": ["/uploads/image1.png", "/uploads/image2.png"],
  "tags": ["virgen", "maria"],
  "created_at": "2025-12-09T10:00:00Z",
  "updated_at": "2025-12-09T12:00:00Z"
}
```

**Response 404:** Product not found

---

### Auth Endpoints

#### POST /api/auth/login
Admin authentication

**Request Body:**
```json
{
  "username": "admin",
  "password": "securepassword"
}
```

**Response 200:**
```json
{
  "token": "eyJhbGc...",
  "expires_at": "2025-12-10T10:00:00Z",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "admin"
  }
}
```

**Response 401:** Invalid credentials

---

### Protected Admin Endpoints (JWT Required)

#### POST /api/products
Create new product

**Headers:** `Authorization: Bearer {token}`

**Request Body:**
```json
{
  "name": "Nueva Remera",
  "description": "Descripción...",
  "price": 5500,
  "category": "Santos",
  "images": ["/uploads/newimage.png"],
  "tags": ["nuevo", "diseño"]
}
```

**Response 201:**
```json
{
  "id": 51,
  "name": "Nueva Remera",
  "...": "..."
}
```

**Response 400:** Validation errors
**Response 401:** Unauthorized

#### PUT /api/products/:id
Update entire product

**Headers:** `Authorization: Bearer {token}`

**Request Body:** Same as create

**Response 200:** Updated product
**Response 404:** Product not found
**Response 401:** Unauthorized

#### PATCH /api/products/:id
Partial update

**Headers:** `Authorization: Bearer {token}`

**Request Body:** Partial product data

**Response 200:** Updated product

#### DELETE /api/products/:id
Soft-delete product

**Headers:** `Authorization: Bearer {token}`

**Response 204:** No Content
**Response 404:** Product not found
**Response 401:** Unauthorized

#### POST /api/admin/upload
Upload image file

**Headers:** `Authorization: Bearer {token}`, `Content-Type: multipart/form-data`

**Form Data:** `file` - image file

**Response 200:**
```json
{
  "url": "/uploads/abc123.png",
  "filename": "abc123.png",
  "size": 102400
}
```

**Response 400:** Invalid file type or size
**Response 401:** Unauthorized

## Database Schema

### products table
```sql
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category TEXT,
    images TEXT, -- JSON array
    tags TEXT, -- JSON array
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_deleted ON products(deleted_at);
```

### admins table
```sql
CREATE TABLE admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Success Criteria

### Measurable Outcomes

- *SC-001*: API responds to product listing requests in under 50ms for up to 1000 products
- *SC-002*: System handles 100 concurrent requests without errors
- *SC-003*: Database file size stays under 100MB for 1000 products with images
- *SC-004*: Image upload and processing completes in under 2 seconds
- *SC-005*: JWT authentication prevents all unauthorized access attempts
- *SC-006*: Search returns relevant results in under 100ms
- *SC-007*: System can run continuously for 30 days without memory leaks
- *SC-008*: Admin can perform full product CRUD cycle in under 1 minute
- *SC-009*: Frontend integration works without CORS errors
- *SC-010*: Single binary deployment size under 20MB

## Non-Functional Requirements

### Performance
- Response time < 100ms for simple queries
- Support 100+ concurrent connections
- Start time < 2 seconds

### Security
- Password hashing with bcrypt (cost 10)
- JWT tokens with secure secret
- Input validation on all endpoints
- SQL injection prevention
- File upload validation

### Maintainability
- Clean code structure with handlers, services, repositories
- Comprehensive error logging
- Database migration system
- Environment-based configuration

### Deployment
- Single binary with embedded migrations
- Minimal dependencies (Go standard library + SQLite)
- Environment variables for configuration
- Graceful shutdown support

## Technology Stack

- **Language**: Go 1.21+
- **Database**: SQLite 3
- **Router**: gorilla/mux or chi
- **JWT**: golang-jwt/jwt
- **Database Driver**: mattn/go-sqlite3
- **Password**: golang.org/x/crypto/bcrypt
- **Validation**: go-playground/validator

## Future Enhancements (Out of Scope)

- Order management system
- Email notifications
- Multi-user admin with permissions
- Product variants (sizes, colors)
- Inventory tracking
- Analytics and reporting
- Product reviews/ratings
- PostgreSQL migration path
