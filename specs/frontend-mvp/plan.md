# Implementation Plan: Frontend MVP - React + Vite

*Date*: 2025-12-08  
*Spec*: [spec.md](file:///c:/Users/tomas/webapp-tienda/specs/frontend-mvp/spec.md)

## Summary

Build a lightweight e-commerce frontend using React + Vite for a t-shirt store. The MVP includes a public catalog with featured products carousel and filterable grid, plus an admin panel with JWT authentication for CRUD operations on products. Implementation will start with mock data to validate UI/UX flows, then integrate with real backend API endpoints.

## Technical Context

*Language/Version*: TypeScript 5+  
*Primary Dependencies*: React 18+, Vite 5+, React Router v6, React Hook Form  
*Storage*: LocalStorage for JWT token  
*Testing*: Vitest (unit tests), React Testing Library (component tests)  
*Target Platform*: Modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)  
*Project Type*: Single Page Application (SPA)  
*Performance Goals*: 
- Initial load < 2s
- Bundle size < 500KB gzipped
- Lighthouse score > 90  

*Constraints*: 
- Desktop-first responsive design
- Must work without backend (mock data phase)
- Zero external CSS frameworks (CSS Modules only)

*Scale/Scope*: 
- MVP with ~8 user stories
- Single admin user (multi-user in future)
- Estimated ~20 components
- ~10 pages/views

## Project Structure

### Documentation (this feature)

```
specs/frontend-mvp/
├── plan.md              # This file
└── spec.md             # Feature specification
```

### Source Code (repository root)

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── main.jsx                 # Entry point
│   ├── App.jsx                  # Root component with routing
│   ├── styles/
│   │   └── global.css           # Global styles, CSS variables
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   ├── catalog/
│   │   │   ├── ProductCarousel.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── Filters.jsx
│   │   ├── admin/
│   │   │   ├── ProductForm.jsx
│   │   │   ├── ProductTable.jsx
│   │   │   └── ConfirmDialog.jsx
│   │   └── common/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── Toast.jsx
│   ├── pages/
│   │   ├── Home.jsx              # Public catalog
│   │   ├── Login.jsx             # Admin login
│   │   ├── AdminDashboard.jsx    # Product listing
│   │   ├── CreateProduct.jsx     # New product form
│   │   └── EditProduct.jsx       # Edit product form
│   ├── services/
│   │   ├── api.js                # API wrapper with interceptors
│   │   ├── auth.js               # Auth helpers (login, logout, token)
│   │   └── products.js           # Product CRUD operations
│   ├── data/
│   │   └── mock.js               # Mock data for Phase 1
│   ├── context/
│   │   └── AuthContext.jsx       # Auth state management
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── useProducts.js
│   └── utils/
│       ├── validation.js          # Form validations
│       └── constants.js           # App constants (categories, sizes, etc)
├── tests/
│   ├── unit/
│   ├── integration/
│   └── setup.js
├── package.json
├── vite.config.js
└── .env.example
```

*Structure Decision*: Feature-based organization within `src/components` (catalog, admin) for scalability. Services layer abstracts API logic for easy mock-to-real transition. Context API for auth state to avoid prop drilling.

---

## Phase 1: Setup (Shared Infrastructure)

*Purpose*: Project initialization and basic structure

- [ ] T001 Initialize Vite + React + TypeScript project with `npm create vite@latest frontend -- --template react-ts`
- [ ] T002 Install dependencies: `react-router-dom`, `react-hook-form`
- [ ] T003 Install dev dependencies: `vitest`, `@testing-library/react`
- [ ] T004 Create project structure (folders: components, pages, services, etc.)
- [ ] T005 Configure Vite for absolute imports (jsconfig.json or vite alias)
- [ ] T006 Setup ESLint + Prettier for code quality
- [ ] T007 Create `.env.example` with `VITE_API_BASE_URL=http://localhost:3000`

---

## Phase 2: Foundational (Blocking Prerequisites)

*Purpose*: Core infrastructure that MUST be complete before ANY user story can be implemented

*⚠️ CRITICAL*: No user story work can begin until this phase is complete

- [ ] T008 Create global CSS file with design system variables (colors, spacing, typography)
- [ ] T009 Setup Google Fonts (Inter) in index.html
- [ ] T010 Create API service wrapper in `src/services/api.js` with fetch + interceptors
- [ ] T011 Create mock data file `src/data/mock.js` with 20+ sample products
- [ ] T012 Setup React Router in `App.jsx` with basic routes structure
- [ ] T013 Create AuthContext for managing JWT and auth state
- [ ] T014 Create ProtectedRoute component for guarding admin routes
- [ ] T015 Create common UI components: Button, Input, Toast (with CSS Modules)
- [ ] T016 Create constants file with product categories, sizes, genders

*Checkpoint*: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - View Featured Products Carousel (Priority: P1)

*Goal*: Display featured products in an auto-playing infinite carousel on home page

*Independent Test*: Navigate to `/`, verify carousel shows 4 products with auto-advance and infinite loop

### Tests for User Story 1

- [ ] T017 [P] [US1] Unit test for ProductCarousel component - verify render with mock data
- [ ] T018 [P] [US1] Integration test - carousel navigation (next/prev buttons)
- [ ] T019 [P] [US1] Integration test - auto-advance after 5 seconds

### Implementation for User Story 1

- [ ] T020 [P] [US1] Create ProductCarousel component in `src/components/catalog/ProductCarousel.jsx`
- [ ] T021 [US1] Implement carousel logic (infinite loop, auto-advance)
- [ ] T022 [US1] Style carousel with CSS Modules (modern, minimal design)
- [ ] T023 [US1] Create Home page in `src/pages/Home.jsx`
- [ ] T024 [US1] Fetch featured products from mock data in Home component
- [ ] T025 [US1] Integrate carousel into Home page
- [ ] T025b [US1] Add logic to hide carousel when 0 featured products returned

*Checkpoint*: Carousel functional with mock data and beautiful design

---

## Phase 4: User Story 2 - Browse All Products in Grid (Priority: P1)

*Goal*: Display all products in a responsive grid below the carousel

*Independent Test*: Scroll down from carousel, verify responsive grid adapts from 4→3→2→1 columns

### Tests for User Story 2

- [ ] T026 [P] [US2] Unit test for ProductCard component
- [ ] T027 [P] [US2] Unit test for ProductGrid component with different viewport sizes
- [ ] T028 [P] [US2] Integration test - grid renders all products from mock data

### Implementation for User Story 2

- [ ] T029 [P] [US2] Create ProductCard component in `src/components/catalog/ProductCard.jsx`
- [ ] T030 [P] [US2] Style ProductCard with CSS Modules (show 1 image, name, price, sizes, colors)
- [ ] T030b [US2] Add fallback image placeholder for broken/missing image URLs in ProductCard
- [ ] T031 [US2] Create ProductGrid component in `src/components/catalog/ProductGrid.jsx`
- [ ] T032 [US2] Implement responsive grid layout (4→3→2→1 columns with media queries)
- [ ] T033 [US2] Fetch all products from mock data in Home component
- [ ] T034 [US2] Integrate grid into Home page below carousel
- [ ] T034b [US2] Add empty state message "No hay productos disponibles" when catalog is empty

*Checkpoint*: Home page shows carousel + grid with all products

---

## Phase 5: User Story 3 - Filter Products by Criteria (Priority: P2)

*Goal*: Allow users to filter grid products by gender, oversize, and category (combined filters)

*Independent Test*: Apply filters "Hombre" + "Deportivo", verify only matching products shown

### Tests for User Story 3

- [ ] T035 [P] [US3] Unit test for Filters component
- [ ] T036 [P] [US3] Integration test - single filter applied
- [ ] T037 [P] [US3] Integration test - multiple combined filters
- [ ] T038 [P] [US3] Integration test - clear filters button

### Implementation for User Story 3

- [ ] T039 [P] [US3] Create Filters component in `src/components/catalog/Filters.jsx`
- [ ] T040 [US3] Implement filter UI (dropdowns for gender, category, checkbox for oversize)
- [ ] T041 [US3] Style Filters component with CSS Modules
- [ ] T042 [US3] Add filter state management in Home component
- [ ] T043 [US3] Implement filter logic (combine multiple filters)
- [ ] T044 [US3] Add "Clear filters" button
- [ ] T045 [US3] Ensure carousel is NOT affected by filters
- [ ] T045b [US3] Add empty state message "No se encontraron productos con estos filtros" when no matches

*Checkpoint*: Filters work independently and in combination, carousel unaffected

---

## Phase 6: User Story 4 - Admin Login (Priority: P1)

*Goal*: Authenticate admin user with email/password, store JWT, protect admin routes

*Independent Test*: Try accessing `/admin` without login → redirects to `/login`. Login with valid credentials → access granted

### Tests for User Story 4

- [ ] T046 [P] [US4] Unit test for Login component
- [ ] T047 [P] [US4] Integration test - successful login with mock JWT
- [ ] T048 [P] [US4] Integration test - failed login with invalid credentials
- [ ] T049 [P] [US4] Integration test - protected route redirect when not authenticated

### Implementation for User Story 4

- [ ] T050 [P] [US4] Create Login page in `src/pages/Login.jsx`
- [ ] T051 [US4] Create login form with React Hook Form (email, password validation)
- [ ] T052 [US4] Style Login page with CSS Modules (centered, minimal design)
- [ ] T053 [US4] Create auth service in `src/services/auth.js` (login, logout, getToken)
- [ ] T054 [US4] Implement login logic with mock JWT in AuthContext
- [ ] T055 [US4] Store JWT in localStorage on successful login
- [ ] T056 [US4] Implement logout functionality (clear token, redirect to /login)
- [ ] T057 [US4] Update ProtectedRoute to check JWT and redirect if missing

*Checkpoint*: Login/logout working, admin routes protected

---

## Phase 7: User Story 5 - Admin View Products List (Priority: P2)

*Goal*: Display all products in admin dashboard with search, edit, and delete actions

*Independent Test*: Login as admin, navigate to `/admin`, verify table shows all products with search functionality

### Tests for User Story 5

- [ ] T058 [P] [US5] Unit test for ProductTable component
- [ ] T059 [P] [US5] Integration test - table renders all products
- [ ] T060 [P] [US5] Integration test - search filters table in real-time

### Implementation for User Story 5

- [ ] T061 [P] [US5] Create AdminDashboard page in `src/pages/AdminDashboard.jsx`
- [ ] T062 [US5] Create ProductTable component in `src/components/admin/ProductTable.jsx`
- [ ] T063 [US5] Implement table UI (columns: name, price, category, featured, actions)
- [ ] T064 [US5] Style ProductTable with CSS Modules
- [ ] T065 [US5] Add search input with real-time filtering
- [ ] T066 [US5] Add Edit button (navigates to `/admin/products/:id/edit`)
- [ ] T067 [US5] Add Delete button (shows confirmation dialog)
- [ ] T068 [US5] Fetch products from mock data in AdminDashboard

*Checkpoint*: Admin dashboard shows product list with search

---

## Phase 8: User Story 6 - Admin Create New Product (Priority: P1)

*Goal*: Admin can create a new product via form with all required fields and validations

*Independent Test*: Navigate to `/admin/products/new`, fill form, save, verify product appears in catalog and admin list

### Tests for User Story 6

- [ ] T069 [P] [US6] Unit test for ProductForm component
- [ ] T070 [P] [US6] Integration test - form validation (required fields)
- [ ] T071 [P] [US6] Integration test - successful product creation
- [ ] T072 [P] [US6] Integration test - max 4 images validation

### Implementation for User Story 6

- [ ] T073 [P] [US6] Create CreateProduct page in `src/pages/CreateProduct.jsx`
- [ ] T074 [P] [US6] Create ProductForm component in `src/components/admin/ProductForm.jsx`
- [ ] T075 [US6] Implement form fields with React Hook Form (all product fields)
- [ ] T076 [US6] Add form validation rules (required fields, min/max lengths, URL format)
- [ ] T077 [US6] Style form with CSS Modules (clean, organized layout)
- [ ] T078 [US6] Create validation utility functions in `src/utils/validation.js`
- [ ] T079 [US6] Implement image URLs input (dynamic array, max 4)
- [ ] T080 [US6] Create product service in `src/services/products.js` (createProduct with mock)
- [ ] T081 [US6] Handle form submission (save to mock data, show success toast)
- [ ] T082 [US6] Add "Nuevo Producto" button in AdminDashboard

*Checkpoint*: Can create products via form, validate fields, see in catalog

---

## Phase 9: User Story 7 - Admin Edit Existing Product (Priority: P2)

*Goal*: Admin can update product information via pre-filled form

*Independent Test*: Edit a product's price, save, verify change reflects in public catalog

### Tests for User Story 7

- [ ] T083 [P] [US7] Integration test - form pre-fills with product data
- [ ] T084 [P] [US7] Integration test - successful product update
- [ ] T085 [P] [US7] Integration test - cancel button returns to dashboard

### Implementation for User Story 7

- [ ] T086 [P] [US7] Create EditProduct page in `src/pages/EditProduct.jsx`
- [ ] T087 [US7] Reuse ProductForm component in edit mode (pass product data)
- [ ] T088 [US7] Fetch product by ID from mock data
- [ ] T089 [US7] Pre-fill form with existing product data
- [ ] T090 [US7] Create updateProduct function in products service (mock)
- [ ] T091 [US7] Handle form submission (update mock data, show success toast)
- [ ] T092 [US7] Add Cancel button (navigate back to /admin)

*Checkpoint*: Can edit products, changes reflect everywhere

---

## Phase 10: User Story 8 - Admin Delete Product (Priority: P2)

*Goal*: Admin can delete product with confirmation to prevent accidents

*Independent Test*: Delete a product, confirm action, verify it's removed from catalog and admin list

### Tests for User Story 8

- [ ] T093 [P] [US8] Unit test for ConfirmDialog component
- [ ] T094 [P] [US8] Integration test - delete confirmation appears
- [ ] T095 [P] [US8] Integration test - product deleted on confirm
- [ ] T096 [P] [US8] Integration test - delete cancelled

### Implementation for User Story 8

- [ ] T097 [P] [US8] Create ConfirmDialog component in `src/components/admin/ConfirmDialog.jsx`
- [ ] T098 [US8] Style ConfirmDialog with CSS Modules (modal overlay)
- [ ] T099 [US8] Add delete handler in ProductTable
- [ ] T100 [US8] Show ConfirmDialog on delete button click
- [ ] T101 [US8] Create deleteProduct function in products service (mock)
- [ ] T102 [US8] Remove product from mock data on confirm
- [ ] T103 [US8] Show success toast after deletion

*Checkpoint*: Delete works with confirmation, product removed everywhere

---

## Phase 11: API Integration (Replace Mock Data)

*Purpose*: Connect frontend to real backend API endpoints

- [ ] T104 Update `src/services/api.js` to use real API base URL from .env
- [ ] T105 Update auth service to call `POST /api/auth/login`
- [ ] T106 Update products service to call `GET /api/products/featured`
- [ ] T107 Update products service to call `GET /api/products` with query params
- [ ] T108 Update products service to call `POST /api/products`
- [ ] T109 Update products service to call `PUT /api/products/:id`
- [ ] T110 Update products service to call `DELETE /api/products/:id`
- [ ] T111 Add loading states to all pages/components
- [ ] T112 Add error handling with Toast notifications
- [ ] T113 Test all flows with real backend

*Checkpoint*: Frontend fully integrated with backend API

---

## Phase 12: Polish & Cross-Cutting Concerns

*Purpose*: Improvements that affect multiple user stories

- [ ] T114 Add loading spinners for async operations
- [ ] T115 Implement image lazy loading in ProductCard
- [ ] T116 Add 404 page for unknown routes
- [ ] T117 Add Header and Footer layout components
- [ ] T118 Optimize bundle size (code splitting, lazy loading routes)
- [ ] T119 Add meta tags for SEO in index.html
- [ ] T120 Run Lighthouse audit and fix performance issues
- [ ] T121 Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T122 Mobile responsive testing (down to 320px width)
- [ ] T123 Add README with setup instructions
- [ ] T124 Create .env.example with all required variables

---

## Dependencies & Execution Order

### Phase Dependencies

- *Setup (Phase 1)*: No dependencies - can start immediately
- *Foundational (Phase 2)*: Depends on Setup completion - BLOCKS all user stories
- *User Stories (Phase 3-10)*: All depend on Foundational phase completion
  - Can proceed in parallel if multiple developers
  - Or sequentially in priority order: US1 → US2 → US4 → US6 → US3 → US5 → US7 → US8
- *API Integration (Phase 11)*: Depends on all desired user stories being complete AND backend ready
- *Polish (Phase 12)*: Depends on API integration

### User Story Dependencies

- *User Story 1 (P1)*: Can start after Foundational - Independent
- *User Story 2 (P1)*: Can start after Foundational - Independent (but works well with US1)
- *User Story 3 (P2)*: Depends on US2 (needs grid to filter)
- *User Story 4 (P1)*: Can start after Foundational - Independent
- *User Story 5 (P2)*: Depends on US4 (needs auth)
- *User Story 6 (P1)*: Depends on US4 (needs auth)
- *User Story 7 (P2)*: Depends on US6 (reuses ProductForm)
- *User Story 8 (P2)*: Depends on US5 (delete from table)

### Suggested Execution Order

1. **Phase 1-2**: Setup + Foundation (complete first)
2. **Phase 3-4**: US1 + US2 (public catalog visible)
3. **Phase 6**: US4 (auth working)
4. **Phase 8**: US6 (can create products)
5. **Phase 5**: US3 (add filters to catalog)
6. **Phase 7**: US5 (admin dashboard)
7. **Phase 9-10**: US7 + US8 (complete CRUD)
8. **Phase 11**: API Integration
9. **Phase 12**: Polish

## Verification Plan

### Automated Tests

Run all tests with:
```bash
cd frontend
npm run test
```

Expected: All unit and integration tests pass (Vitest + React Testing Library)

### Manual Verification - Public Catalog

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:5173/`
3. **Verify carousel**:
   - See 4 featured products
   - Click next/prev buttons → smooth transitions
   - Wait 5 seconds → auto-advance to next slide
   - Navigate to last slide → click next → loops back to first
4. **Verify grid**:
   - Scroll down → see product grid
   - Each card shows: image, name, price, sizes, colors
   - Resize browser window → grid adapts (4→3→2→1 columns)
5. **Verify filters**:
   - Select "Hombre" → only men's products shown
   - Add "Deportivo" → combined filters work
   - Check "Oversize" → 3 filters combined
   - Click "Limpiar filtros" → all products shown again
   - Verify carousel unchanged throughout filtering

### Manual Verification - Admin Panel

1. Navigate to `http://localhost:5173/admin`
2. **Verify redirect**: Should redirect to `/login` (not authenticated)
3. **Verify login**:
   - Enter invalid credentials → see error message
   - Enter valid credentials → redirect to `/admin`
   - Check localStorage → JWT token stored
4. **Verify dashboard**:
   - See table with all products
   - Type in search box → table filters in real-time
   - Click Edit → navigate to edit page
   - Click Delete → confirmation dialog appears
5. **Verify create product**:
   - Click "Nuevo Producto" → navigate to form
   - Submit empty form → validation errors shown
   - Try adding 5 images → show max 4 error
   - Fill form correctly → submit → success toast
   - Navigate to home `/` → new product visible in grid
6. **Verify edit product**:
   - From dashboard, edit a product
   - Form pre-filled with data
   - Change price, click Update → success toast
   - Verify change in public catalog
7. **Verify delete product**:
   - Click Delete on a product
   - Cancel confirmation → product still there
   - Click Delete again → Confirm → product removed
   - Verify removed from catalog
8. **Verify logout**:
   - Click logout → redirect to `/login`
   - Try accessing `/admin` → redirect back to `/login`

### Performance Verification

1. Run Lighthouse audit: `npm run build` → serve build → audit with Chrome DevTools
2. **Expected scores**:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 80
3. **Check bundle size**:
   ```bash
   npm run build
   ```
   - Verify dist/ folder gzipped size < 500KB
4. **Test load time**:
   - Clear cache, reload page
   - Check Network tab → total load time < 2s

## Notes

- [US1], [US2], etc. labels map tasks to specific user stories for traceability
- Each user story should be independently completable and testable
- Mock data phase allows frontend development without backend dependency
- CSS Modules ensure no style conflicts and keep bundle size minimal
- Tests written before/during implementation (TDD approach encouraged)
- Stop at any checkpoint to validate story independently
- Commit after each task or logical group of related tasks
