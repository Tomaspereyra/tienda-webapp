# Feature Specification: Frontend-Backend Integration & Production Deployment

*Created*: December 10, 2025

## User Scenarios & Testing

### User Story 1 - Admin Product Management Flow (Priority: P1)

Admin users can manage the entire product catalog through the web interface using the backend API. This includes logging in, creating products, uploading images, editing products, and deleting products - all through a seamless integrated experience.

*Why this priority*: Core business functionality - the admin panel is the primary way to manage inventory and is essential for the business to operate.

*Independent Test*: Can be fully tested by logging into the admin panel, creating a product with images, editing it, and verifying all changes persist in the database and display correctly on the public catalog.

*Acceptance Scenarios*:

1. *Given* admin visits the login page, *When* they enter valid credentials (admin/admin123), *Then* they receive a JWT token and are redirected to the admin dashboard
2. *Given* authenticated admin on product creation page, *When* they fill product details and upload an image, *Then* product is created via POST /api/products and image via POST /api/admin/upload
3. *Given* authenticated admin viewing product list, *When* they click edit on a product, *Then* product details are fetched via GET /api/products/:id and displayed in edit form
4. *Given* authenticated admin editing a product, *When* they submit changes, *Then* product is updated via PATCH /api/products/:id and changes reflect immediately
5. *Given* authenticated admin viewing product list, *When* they delete a product, *Then* product is soft-deleted via DELETE /api/products/:id and disappears from public catalog
6. *Given* JWT token expires, *When* admin attempts any protected action, *Then* system shows 401 error and redirects to login

---

### User Story 2 - Public Product Browsing (Priority: P1)

Public visitors can browse the product catalog, search for products, filter by category, and view detailed product information including images, prices, and descriptions - all powered by the backend API.

*Why this priority*: This is the customer-facing functionality that drives sales. Without this, customers cannot see or purchase products.

*Independent Test*: Can be tested by opening the public catalog page, verifying products load from GET /api/products, using search/filters, and clicking through to product details loaded from GET /api/products/:id.

*Acceptance Scenarios*:

1. *Given* visitor opens the catalog page, *When* page loads, *Then* products are fetched via GET /api/products with pagination and displayed in grid
2. *Given* visitor on catalog page, *When* they type search term "virgen", *Then* frontend calls GET /api/products?search=virgen and displays filtered results
3. *Given* visitor browsing catalog, *When* they select category "Santos", *Then* frontend calls GET /api/products?category=Santos and displays filtered products
4. *Given* visitor viewing catalog, *When* they click on a product, *Then* product details are fetched via GET /api/products/:id and displayed with all images and information
5. *Given* visitor viewing product details, *When* they navigate to WhatsApp inquiry, *Then* product name and details are pre-filled in WhatsApp message
6. *Given* catalog has many products, *When* visitor scrolls to bottom, *Then* next page is loaded via GET /api/products?page=2

---

### User Story 3 - Production Deployment (Priority: P2)

The complete application (frontend + backend) is deployed to production with proper configuration, security, and monitoring. The system runs reliably and securely in a production environment.

*Why this priority*: Required for actual business operation, but can be done after core functionality is working in development.

*Independent Test*: Can be tested by deploying both frontend and backend to production servers, verifying all endpoints work with HTTPS, checking environment variables are properly configured, and confirming the application is accessible publicly.

*Acceptance Scenarios*:

1. *Given* backend is deployed to production server, *When* environment variables are configured, *Then* server starts without errors and listens on configured port
2. *Given* frontend is built for production, *When* deployed to web server, *Then* static files are served correctly and API_BASE_URL points to production backend
3. *Given* both services are running in production, *When* frontend makes API calls, *Then* CORS is properly configured and requests succeed
4. *Given* production deployment, *When* JWT_SECRET is set to strong value, *Then* authentication is secure and tokens cannot be forged
5. *Given* production backend, *When* database file is created, *Then* proper permissions are set and backups are configured
6. *Given* production system, *When* errors occur, *Then* they are logged properly but don't expose sensitive information to clients

---

### User Story 4 - Custom T-Shirt Designer Integration (Priority: P2)

The custom t-shirt designer feature is integrated with the backend to save and retrieve custom designs, allowing users to create custom products that can be managed through the admin panel.

*Why this priority*: Important differentiator for the business, but the basic catalog functionality is more critical.

*Independent Test*: Can be tested by creating a custom design in the designer, saving it (which creates a product via POST /api/products), and verifying it appears in the admin panel and can be managed like any other product.

*Acceptance Scenarios*:

1. *Given* user completes a custom design, *When* they click save/order, *Then* design data is sent to backend via POST /api/products with design metadata
2. *Given* custom design is saved, *When* admin views products, *Then* custom designs are marked and include design configuration in product data
3. *Given* custom design product exists, *When* user wants to edit it, *Then* design configuration is loaded and designer is initialized with saved state
4. *Given* custom design images are uploaded, *When* design is saved, *Then* images are uploaded via POST /api/admin/upload and URLs are included in product

---

### Edge Cases

- What happens when backend server is down or unreachable?
  - Frontend should show user-friendly error messages
  - Failed API calls should be retried with exponential backoff
  - Critical operations should be queued for retry

- How does system handle network timeouts during API calls?
  - Frontend should have reasonable timeout values (30s for uploads, 10s for queries)
  - Loading states should be shown during long operations
  - User should be informed if operation times out

- What happens when JWT token expires mid-session?
  - Frontend should detect 401 responses
  - User should be prompted to re-login
  - Current work should be saved if possible (draft state)

- How does frontend handle malformed API responses?
  - Validate response structure before processing
  - Show generic error if response doesn't match expected schema
  - Log errors for debugging but don't expose to user

- What happens when image uploads fail?
  - User should see clear error message
  - Form should not be submitted if image upload is required
  - Partial uploads should be cleaned up

- How does pagination behave when products are added/deleted between page loads?
  - Accept potential duplicate/missing items as acceptable tradeoff
  - Implement refresh mechanism to reload current view
  - Consider using cursor-based pagination for future enhancement

- What happens when concurrent admins edit the same product?
  - Last write wins (acceptable for MVP)
  - Consider adding optimistic locking in future (check updated_at timestamp)
  - Show warning if product was modified since last fetch

- How does system handle special characters in product names/descriptions?
  - Backend uses prepared statements (already handled)
  - Frontend should properly encode/decode UTF-8
  - Test with special characters (ñ, á, é, etc.) common in Spanish

## Requirements

### Functional Requirements

**API Integration**
- *FR-001*: Frontend MUST store JWT token securely (localStorage or sessionStorage)
- *FR-002*: Frontend MUST include Authorization header in all protected API calls
- *FR-003*: Frontend MUST handle 401 responses by redirecting to login
- *FR-004*: Frontend MUST validate API responses before processing
- *FR-005*: Frontend MUST show loading states during API calls

**Data Management**
- *FR-006*: Frontend MUST fetch products from GET /api/products on catalog page
- *FR-007*: Frontend MUST support pagination via page query parameter
- *FR-008*: Frontend MUST support search via search query parameter
- *FR-009*: Frontend MUST support category filtering via category query parameter
- *FR-010*: Admin panel MUST fetch product details via GET /api/products/:id for editing

**Authentication Flow**
- *FR-011*: Login form MUST POST credentials to /api/auth/login
- *FR-012*: Frontend MUST store returned JWT token upon successful login
- *FR-013*: Frontend MUST clear token on logout
- *FR-014*: Frontend MUST redirect unauthenticated users trying to access admin pages
- *FR-015*: Frontend MUST auto-logout when token expires

**Product Management**
- *FR-016*: Admin panel MUST create products via POST /api/products
- *FR-017*: Admin panel MUST update products via PATCH /api/products/:id
- *FR-018*: Admin panel MUST delete products via DELETE /api/products/:id
- *FR-019*: Admin panel MUST upload images via POST /api/admin/upload before creating products
- *FR-020*: Image upload MUST validate file size (max 5MB) before uploading

**Production Configuration**
- *FR-021*: Frontend MUST use environment variable for API base URL
- *FR-022*: Backend MUST use strong JWT_SECRET in production (min 32 chars)
- *FR-023*: Backend MUST configure CORS for production frontend domain
- *FR-024*: Both services MUST use HTTPS in production
- *FR-025*: Backend MUST not expose stack traces in production error responses

**Error Handling**
- *FR-026*: Frontend MUST show user-friendly error messages for failed API calls
- *FR-027*: Frontend MUST log errors to console for debugging
- *FR-028*: Frontend MUST handle network errors gracefully (offline mode)
- *FR-029*: Frontend MUST validate form inputs before API submission
- *FR-030*: Frontend MUST display validation errors from backend (400 responses)

### Technical Requirements

**Frontend**
- *TR-001*: Frontend MUST use axios or fetch for HTTP requests
- *TR-002*: Frontend MUST implement API client abstraction layer
- *TR-003*: Frontend MUST use environment variables (.env files)
- *TR-004*: Frontend build MUST be optimized for production (minification, tree-shaking)
- *TR-005*: Frontend MUST implement request/response interceptors for auth

**Backend**
- *TR-006*: Backend API base URL MUST be http://localhost:3000 (development)
- *TR-007*: Backend MUST run as service/daemon in production
- *TR-008*: Backend MUST log to stdout/stderr (not files) for container compatibility
- *TR-009*: Backend MUST handle graceful shutdown (SIGTERM/SIGINT)
- *TR-010*: Backend database path MUST be configurable via environment variable

**Deployment**
- *TR-011*: Frontend MUST be deployable as static files
- *TR-012*: Backend MUST be deployable as single binary
- *TR-013*: Database file MUST be backed up regularly
- *TR-014*: Uploaded images MUST be stored persistently
- *TR-015*: Environment secrets MUST NOT be committed to git

### Key Entities

**Integration Points**:
- API Client: Frontend abstraction for communicating with backend API
- Authentication State: JWT token storage and management in frontend
- API Base URL: Configurable endpoint for backend (dev vs production)
- CORS Configuration: Backend whitelist of allowed frontend origins

**Data Flow**:
- Authentication: Login → JWT token → Store in localStorage → Include in requests
- Product Listing: Fetch → Transform → Display → Paginate
- Product Creation: Form → Upload images → Create product → Refresh list
- Product Editing: Fetch → Populate form → Edit → Update → Refresh

## Success Criteria

### Measurable Outcomes

**Integration Success**
- *SC-001*: Admin can log in and access admin panel without errors
- *SC-002*: Admin can create a product with images and see it in public catalog within 5 seconds
- *SC-003*: Public users can browse and search products with < 2 second page load time
- *SC-004*: All CRUD operations work correctly 100% of the time in development environment

**Production Readiness**
- *SC-005*: Application runs without errors for 24 hours in production
- *SC-006*: API response times average < 100ms for simple queries
- *SC-007*: Frontend loads and becomes interactive within 3 seconds on 3G connection
- *SC-008*: No console errors on production frontend
- *SC-009*: Backend handles 50 concurrent users without performance degradation

**User Experience**
- *SC-010*: Admin can complete full product creation workflow in < 2 minutes
- *SC-011*: Search results appear within 1 second of typing query
- *SC-012*: All error messages are user-friendly and actionable
- *SC-013*: JWT token expiry doesn't cause data loss (graceful re-auth)

**Security & Reliability**
- *SC-014*: Unauthenticated users cannot access admin endpoints
- *SC-015*: Invalid JWT tokens are rejected by backend
- *SC-016*: Uploaded images are validated and malicious files are rejected
- *SC-017*: Backend continues serving requests after frontend deploy
- *SC-018*: Frontend continues working during brief backend unavailability (shows cached data)

## Non-Functional Requirements

### Performance
- API calls should complete in < 100ms for simple queries
- Image uploads should complete in < 5 seconds for 5MB files
- Frontend initial load should be < 3 seconds
- Subsequent page navigation should be < 500ms

### Security
- All passwords transmitted over HTTPS only
- JWT secrets must be cryptographically strong (32+ bytes)
- No sensitive data in frontend localStorage beyond JWT
- Backend validates all inputs
- Uploaded files validated for type and size

### Reliability
- Frontend handles backend downtime gracefully
- Backend auto-restarts on crash
- Database is backed up daily
- Uploaded files are backed up

### Scalability
- System handles 100 concurrent users initially
- Database supports 1000+ products
- Design allows for future backend load balancing
- Frontend can be deployed to CDN

## Technology Stack

**Frontend (Existing)**
- React 18 with Vite
- Axios for HTTP client
- Environment variables via .env files
- localStorage for JWT storage

**Backend (Implemented)**
- Go 1.25.5
- SQLite database
- Server running on port 3000
- CORS enabled for localhost:5173

**Deployment (To Configure)**
- Frontend: Static file hosting (Vercel, Netlify, or similar)
- Backend: VPS or serverless (Railway, Fly.io, or similar)
- Database: SQLite file with backups
- Images: Persistent storage volume

## Implementation Notes

### Current State
- ✅ Backend API fully implemented and running
- ✅ Frontend UI/UX complete with mock data
- ⏳ Frontend not yet connected to backend API
- ⏳ Production deployment not configured

### Integration Tasks
1. Create API client service in frontend
2. Replace mock data with API calls
3. Implement authentication state management
4. Add request/response interceptors
5. Handle loading states and errors
6. Test all flows end-to-end

### Deployment Tasks
1. Configure production environment variables
2. Build and deploy frontend
3. Deploy backend binary
4. Configure reverse proxy with HTTPS
5. Set up database backups
6. Monitor logs and errors

## Future Enhancements (Out of Scope)

- Real-time updates via WebSockets
- Offline support with service workers
- Image optimization pipeline
- CDN for uploaded images
- Admin activity logging
- Product analytics dashboard
- Multi-language support
- Payment gateway integration
