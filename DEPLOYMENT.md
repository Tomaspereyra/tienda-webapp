# Docker Deployment Guide - Tienda Inmaculada

## Quick Start

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: deletes database!)
docker-compose down -v
```

## Architecture

```
┌────────────────────────────────────────────┐
│  Browser (https://your-domain.com)         │
└──────────────┬─────────────────────────────┘
               │ HTTPS (443)
               ▼
┌──────────────────────────────────────────────┐
│  Nginx Proxy Manager                         │
│  - SSL/TLS Termination (Let's Encrypt)       │
│  - Reverse Proxy                             │
│  - Port 80, 443 (public)                     │
│  - Port 81 (admin interface)                 │
└──────────────┬───────────────────────────────┘
               │ HTTP (internal)
       ┌───────┴────────┐
       ▼                ▼
┌─────────────┐  ┌──────────────┐
│  Frontend   │  │  Backend API │
│  (Nginx)    │  │  (Go)        │
│  Port: 80   │  │  Port: 3000  │
└──────┬──────┘  └──────┬───────┘
       │                │
       ▼                ▼
┌──────────────────────────────────────────────┐
│  Volumes (Persistent Storage)                │
│  - db-data: SQLite database                  │
│  - uploads: Product images                   │
│  - npm-data: Proxy Manager config            │
│  - npm-letsencrypt: SSL certificates         │
└──────────────────────────────────────────────┘
```

## Services

### Nginx Proxy Manager (NEW!)
- **Image**: jc21/nginx-proxy-manager:latest
- **Ports**: 
  - 80 (HTTP - redirects to HTTPS)
  - 443 (HTTPS)
  - 81 (Admin Web Interface)
- **Features**:
  - Let's Encrypt SSL automation
  - Web UI for configuration
  - Automatic certificate renewal
- **Admin Access**: http://your-server:81
  - Default login: `admin@example.com` / `changeme`
  - **CHANGE THIS IMMEDIATELY!**

### Backend
- **Image**: Multi-stage Go build
- **Port**: 3000 (internal Docker network)
- **Exposed Port**: 3000 (for external access if needed)
- **Health Check**: GET `/health`
- **Volumes**:
  - `db-data:/app/data` - SQLite database persistence
  - `uploads:/app/uploads` - Uploaded images persistence

### Frontend
- **Image**: React build served by Nginx
- **Port**: 80
- **Exposed Port**: 80 (access via http://localhost)
- **Health Check**: GET `/health`
- **Environment**: `VITE_API_BASE_URL=http://backend:3000`

## Environment Variables

### Backend (.env or docker-compose.yml)
```bash
PORT=3000                                    # Server port
ENV=production                               # Environment
CORS_ORIGIN=http://localhost                 # Frontend origin (update for your domain)
JWT_SECRET=facaQeG4k8JbQxzczLYWP9VsrgRuVADxP8Lw7hUfxcQ=  # CHANGE THIS!
JWT_EXPIRY_HOURS=24                          # Token expiry
DATABASE_PATH=data/tienda.db                 # DB file path
UPLOAD_DIR=uploads                           # Upload directory
MAX_UPLOAD_SIZE_MB=5                         # Max file size
```

### Frontend (.env.production)
```bash
VITE_API_BASE_URL=http://backend:3000       # Backend service name (Docker internal)
```

## First Time Setup

### 1. Update JWT Secret (IMPORTANT!)
Generate a new secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Update in `docker-compose.yml`:
```yaml
environment:
  - JWT_SECRET=YOUR_NEW_SECRET_HERE
```

### 2. Update CORS for Your Domain
If deploying with a domain, update:
```yaml
environment:
  - CORS_ORIGIN=https://your-domain.com
```

### 3. Build and Start
```bash
docker-compose up -d
```

### 4. Verify Services
```bash
# Check all services are running
docker-compose ps

# Check backend health
curl http://localhost:3000/health

# Check frontend health  
curl http://localhost/health

# View logs
docker-compose logs backend
docker-compose logs frontend
```

### 5. Access Application
- **Frontend**: http://localhost
- **Backend API**: http://localhost:3000
- **Admin Login**: 
  - Email: `admin@tienda.com`
  - Password: `admin123`

## Database & Migrations

### Automatic Migrations
The backend automatically runs database migrations on startup:
- Migration v1: Create products table
- Migration v2: Create admins table
- Migration v3: Create schema_migrations table
- Migration v4: Add sizes, colors, gender, oversize, featured fields

### Seed Data
To seed products and admin user:
```bash
# Enter backend container
docker exec -it tienda-backend sh

# Seed admin (only needed once)
./seed-admin

# Seed products (optional)
./seed-products

# Exit container
exit
```

## Volume Management

### View Volumes
```bash
docker volume ls
```

### Backup Database
```bash
# Copy database out of container
docker cp tienda-backend:/app/data/tienda.db ./backup-tienda.db
```

### Restore Database
```bash
# Copy database into container
docker cp ./backup-tienda.db tienda-backend:/app/data/tienda.db

# Restart backend
docker-compose restart backend
```

### Backup Uploads
```bash
# Create backup directory
mkdir -p ./backups

# Copy uploads
docker cp tienda-backend:/app/uploads ./backups/uploads-backup
```

## Troubleshooting

### Container Won't Start
```bash
# View logs
docker-compose logs backend
docker-compose logs frontend

# Check container status
docker-compose ps
```

### Database Connection Issues
```bash
# Check if volume exists
docker volume inspect webapp-tienda_db-data

# Restart backend
docker-compose restart backend
```

### Frontend Can't Reach Backend
1. Check network: `docker network ls`
2. Verify backend health: `docker-compose ps backend`
3. Check environment: `docker exec tienda-frontend env | grep VITE`
4. Rebuild frontend: `docker-compose up -d --build frontend`

### Permission Issues
```bash
# Give proper permissions to volumes
docker exec -it tienda-backend chown -R app:app /app/data /app/uploads
```

## Production Deployment

### Update for Production Domain

1. **Update CORS**
```yaml
# docker-compose.yml
environment:
  - CORS_ORIGIN=https://your-domain.com
```

2. **Update Frontend API URL**
If using same domain with proxy:
```bash
# frontend/.env.production
VITE_API_BASE_URL=https://your-domain.com/api
```

3. **Add Reverse Proxy (Recommended)**
Use Nginx or Traefik to:
- Handle HTTPS/SSL
- Route `/api/*` to backend
- Route `/*` to frontend
- Add rate limiting

### Security Checklist
- [ ] Change JWT_SECRET to strong random value
- [ ] Update default admin password
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up regular backups
- [ ] Enable Docker log rotation
- [ ] Review CORS origins
- [ ] Set secure file permissions

## Development vs Production

### Development (Current Setup)
```bash
# Frontend: npm run dev (Vite dev server)
# Backend: go run ./cmd/app
# Database: SQLite local file
```

### Production (Docker)
```bash
# Frontend: Nginx serving static build
# Backend: Compiled Go binary  
# Database: SQLite on persistent volume
# Access: http://localhost (or your domain)
```

## Useful Commands

```bash
# Rebuild specific service
docker-compose up -d --build backend

# View real-time logs
docker-compose logs -f --tail=100

# Scale services (not applicable for this app)
docker-compose up -d --scale backend=2

# Execute command in container
docker exec -it tienda-backend sh

# Clean up everything
docker-compose down -v --rmi all

# Update and restart
docker-compose pull
docker-compose up -d --force-recreate
```

## Monitoring

### Health Checks
Docker automatically monitors service health:
- Backend: `GET /health` every 30s
- Frontend: `GET /health` every 30s

Unhealthy containers restart automatically.

### Logs
```bash
# All logs
docker-compose logs

# Specific service
docker-compose logs backend

# Follow logs
docker-compose logs -f

# Last N lines
docker-compose logs --tail=50
```

## Next Steps

1. ✅ Services running successfully
2. Test admin panel: http://localhost/admin/login
3. Test public catalog: http://localhost
4. Configure domain and SSL (if deploying publicly)
5. Set up automated backups
6. Configure monitoring/alerts

---

**Note**: This setup uses Docker's internal networking. Frontend talks to backend via service name `backend:3000`, which Docker resolves automatically within the `tienda-network`.
