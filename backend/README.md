# Tienda Backend API

Go backend API for the t-shirt e-commerce platform. Provides RESTful endpoints for product management, admin authentication, and image uploads.

## Features

- ✅ RESTful API with product CRUD operations
- ✅ SQLite database for lightweight deployment
- ✅ JWT-based admin authentication
- ✅ Image upload and serving
- ✅ Pagination, search, and filtering
- ✅ Soft-delete for products
- ✅ CORS support for frontend integration

## Tech Stack

- **Language**: Go 1.21+
- **Database**: SQLite 3
- **Router**: gorilla/mux
- **Auth**: JWT tokens with bcrypt password hashing
- **Architecture**: Package-Oriented Design (POD)

## Quick Start

### Prerequisites

- Go 1.21 or higher
- GCC compiler (for SQLite driver)

### Installation

1. Clone the repository
2. Copy environment configuration:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and set your JWT secret
4. Install dependencies:
   ```bash
   go mod download
   ```

### Running

```bash
# Development mode
go run cmd/app/main.go

# Build binary
go build -o tienda-server cmd/app/main.go

# Run binary
./tienda-server
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

### First-time Setup

On first run, the database will be automatically created with migrations. To create a default admin user, use the seed script (coming soon) or manually insert into the database.

Default admin credentials (if using seed):
- Username: `admin`
- Password: `admin123` (change immediately!)

## API Documentation

### Public Endpoints

#### GET /api/products
Get paginated product list

**Query Parameters:**
- `page` (default: 1)
- `limit` (default: 20, max: 100)
- `search` - search in name/description
- `category` - filter by category
- `sort` - sort by field (name, price, created_at)
- `order` - asc/desc

**Example:**
```bash
curl http://localhost:3000/api/products?page=1&limit=20&category=Santos
```

#### GET /api/products/:id
Get single product details

**Example:**
```bash
curl http://localhost:3000/api/products/1
```

### Authentication

#### POST /api/auth/login
Admin login

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
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

### Protected Endpoints (Requires JWT)

All admin endpoints require the `Authorization: Bearer <token>` header.

#### POST /api/products
Create new product

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**Body:**
```json
{
  "name": "Nueva Remera",
  "description": "Descripción del producto",
  "price": 5500,
  "category": "Santos",
  "images": ["/uploads/image.png"],
  "tags": ["nuevo", "diseño"]
}
```

#### PUT /api/products/:id
Update entire product (all fields required)

#### PATCH /api/products/:id
Partial product update

#### DELETE /api/products/:id
Soft-delete product

#### POST /api/admin/upload
Upload image file

**Headers:**
```
Authorization: Bearer <your-jwt-token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file` - image file (max 5MB, jpg/png/gif)

## Project Structure

```
backend/
├── cmd/
│   └── app/
│       ├── main.go              # Application entry point
│       └── handler/             # HTTP handlers
├── internal/
│   ├── product/                 # Product domain
│   ├── auth/                    # Authentication domain
│   ├── upload/                  # File upload domain
│   └── platform/                # Infrastructure
│       ├── database/            # DB connection & migrations
│       ├── config/              # Configuration
│       ├── middleware/          # CORS, auth, logging
│       └── web/                 # Response helpers
├── uploads/                     # Uploaded images
├── data/                        # SQLite database
└── README.md
```

## Development

### Running Tests

```bash
# Run all tests
go test ./...

# Run with coverage
go test -cover ./...

# Run with race detector
go test -race ./...
```

### Code Quality

```bash
# Format code
go fmt ./...

# Vet code
go vet ./...

# Tidy dependencies
go mod tidy
```

## Deployment

### Single Binary

Build a single binary for deployment:

```bash
# Linux
GOOS=linux GOARCH=amd64 go build -o tienda-server cmd/app/main.go

# Windows
GOOS=windows GOARCH=amd64 go build -o tienda-server.exe cmd/app/main.go

# macOS
GOOS=darwin GOARCH=amd64 go build -o tienda-server cmd/app/main.go
```

### Environment Variables

Ensure all required environment variables are set in production. Never use default values for `JWT_SECRET`.

### Database

The SQLite database file will be created automatically. For production, consider:
- Regular backups of `./data/tienda.db`
- Proper file permissions
- Adequate disk space

## Security Considerations

- Always change default admin password
- Use a strong `JWT_SECRET` (minimum 32 characters)
- Keep dependencies updated
- Run behind a reverse proxy (nginx, caddy) in production
- Use HTTPS in production
- Validate and sanitize all user inputs
- Implement rate limiting (consider using middleware)

## License

Proprietary - All rights reserved
