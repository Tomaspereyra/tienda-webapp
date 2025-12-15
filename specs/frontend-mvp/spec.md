# Feature Specification: Frontend MVP - Tienda de Remeras

*Created*: 2025-12-08

## User Scenarios & Testing (mandatory)

### User Story 1 - View Featured Products Carousel (Priority: P1)

Un visitante accede a la página principal y ve inmediatamente los productos destacados en un carrousel atractivo que muestra las remeras premium de la tienda.

*Why this priority*: Es la primera impresión del sitio. Un carrousel bien diseñado aumenta engagement y muestra los productos más importantes.

*Independent Test*: Navegar a `/` y verificar que el carrousel muestra 4 productos destacados con navegación infinita (vuelve al inicio después del último slide).

*Acceptance Scenarios*:

1. *Given* la home está cargada, *When* visualizo el carrousel, *Then* veo 4 productos destacados con imagen, nombre y precio
2. *Given* estoy en el carrousel, *When* hago click en "siguiente", *Then* se muestra el siguiente producto con animación suave
3. *Given* estoy en el último slide del carrousel, *When* hago click en "siguiente", *Then* vuelve al primer producto (loop infinito)
4. *Given* el carrousel está visible, *When* espero 5 segundos, *Then* avanza automáticamente al siguiente slide

---

### User Story 2 - Browse All Products in Grid (Priority: P1)

Un visitante puede ver todos los productos de la tienda en un grid de cards debajo del carrousel, con información básica de cada remera.

*Why this priority*: Es el catálogo principal. Sin esto, no hay tienda funcional.

*Independent Test*: Scroll hacia abajo desde el carrousel y verificar que se muestra un grid responsive con todas las remeras disponibles.

*Acceptance Scenarios*:

1. *Given* la home está cargada, *When* hago scroll debajo del carrousel, *Then* veo un grid de cards con todos los productos
2. *Given* veo una card de producto, *When* la inspecciono, *Then* muestra: 1 imagen, nombre, precio, talles disponibles y colores disponibles
3. *Given* veo el grid en desktop, *When* cambio el tamaño de la ventana, *Then* el grid se adapta responsivamente (4 columnas → 3 → 2 → 1)

---

### User Story 3 - Filter Products by Criteria (Priority: P2)

Un visitante puede filtrar los productos del grid por género, tipo (oversize) y categoría para encontrar remeras específicas.

*Why this priority*: Mejora la experiencia de navegación cuando hay muchos productos. No es crítico para MVP inicial pero sí valioso.

*Independent Test*: Aplicar filtros de género="Hombre" + categoría="Deportivo" y verificar que solo se muestran productos que cumplen ambos criterios.

*Acceptance Scenarios*:

1. *Given* estoy en la home, *When* selecciono filtro "Hombre", *Then* el grid muestra solo productos de hombre
2. *Given* tengo filtro "Hombre" activo, *When* selecciono también "Oversize", *Then* el grid muestra solo productos hombre + oversize
3. *Given* tengo filtros activos, *When* selecciono categoría "Deportivo", *Then* se combinan los 3 filtros (Hombre + Oversize + Deportivo)
4. *Given* tengo filtros activos, *When* hago click en "Limpiar filtros", *Then* se muestran todos los productos nuevamente
5. *Given* tengo filtros activos, *When* veo el carrousel, *Then* el carrousel NO se ve afectado (siempre muestra productos destacados)

---

### User Story 4 - Admin Login (Priority: P1)

Un administrador puede acceder al panel de administración mediante autenticación con email y password.

*Why this priority*: Sin autenticación no hay acceso al panel admin. Es bloqueante para todas las funcionalidades de administración.

*Independent Test*: Intentar acceder a `/admin` sin estar autenticado y verificar redirect a `/login`. Luego hacer login exitoso y verificar acceso a `/admin`.

*Acceptance Scenarios*:

1. *Given* no estoy autenticado, *When* intento acceder a `/admin`, *Then* soy redirigido a `/login`
2. *Given* estoy en `/login`, *When* ingreso credenciales válidas y hago click en "Ingresar", *Then* obtengo JWT y soy redirigido a `/admin`
3. *Given* estoy en `/login`, *When* ingreso credenciales inválidas, *Then* veo mensaje de error "Credenciales incorrectas"
4. *Given* estoy autenticado, *When* recargo la página `/admin`, *Then* mantengo la sesión activa (JWT en localStorage)
5. *Given* estoy autenticado, *When* hago click en "Cerrar sesión", *Then* se elimina el JWT y soy redirigido a `/login`

---

### User Story 5 - Admin View Products List (Priority: P2)

Un administrador autenticado puede ver un listado completo de todos los productos con opciones de búsqueda, edición y eliminación.

*Why this priority*: Es la vista principal del admin. Permite gestionar el catálogo existente.

*Independent Test*: Login como admin, navegar a `/admin` y verificar tabla con todos los productos mostrando nombre, precio, categoría, destacado, y acciones.

*Acceptance Scenarios*:

1. *Given* estoy autenticado como admin, *When* accedo a `/admin`, *Then* veo una tabla con todos los productos
2. *Given* veo la tabla de productos, *When* la inspecciono, *Then* cada fila muestra: nombre, precio, categoría, si está destacado, y botones Editar/Eliminar
3. *Given* veo la tabla, *When* escribo en el campo de búsqueda, *Then* la tabla se filtra en tiempo real por nombre de producto
4. *Given* veo un producto, *When* hago click en "Editar", *Then* navego a `/admin/productos/:id/editar`
5. *Given* veo un producto, *When* hago click en "Eliminar", *Then* aparece confirmación "¿Estás seguro?"

---

### User Story 6 - Admin Create New Product (Priority: P1)

Un administrador puede crear un nuevo producto ingresando toda la información necesaria mediante un formulario.

*Why this priority*: Sin esta funcionalidad no se pueden agregar productos al catálogo. Es crítico para el MVP.

*Independent Test*: Login, navegar a `/admin/productos/nuevo`, completar formulario con datos válidos y verificar que el producto aparece en el catálogo público y en el listado admin.

*Acceptance Scenarios*:

1. *Given* estoy en `/admin`, *When* hago click en "Nuevo Producto", *Then* navego a `/admin/productos/nuevo`
2. *Given* estoy en el formulario de nuevo producto, *When* completo todos los campos obligatorios, *Then* el botón "Guardar" se habilita
3. *Given* completo el formulario, *When* hago click en "Guardar", *Then* se crea el producto via API POST y veo mensaje "Producto creado exitosamente"
4. *Given* guardé un producto, *When* navego al catálogo público, *Then* el nuevo producto aparece en el grid
5. *Given* estoy en el formulario, *When* no completo campos obligatorios, *Then* veo validaciones "Este campo es requerido"
6. *Given* estoy agregando URLs de imágenes, *When* intento agregar más de 4, *Then* veo mensaje "Máximo 4 imágenes permitidas"

---

### User Story 7 - Admin Edit Existing Product (Priority: P2)

Un administrador puede modificar la información de un producto existente.

*Why this priority*: Permite corregir errores y actualizar información. No es bloqueante para el MVP inicial pero sí muy útil.

*Independent Test*: Editar el precio de un producto, guardar cambios y verificar que se refleja en el catálogo público.

*Acceptance Scenarios*:

1. *Given* estoy en `/admin`, *When* hago click en "Editar" de un producto, *Then* navego a `/admin/productos/:id/editar` con el formulario pre-llenado
2. *Given* veo el formulario de edición, *When* modifico campos y hago click en "Actualizar", *Then* se actualiza via API PUT y veo mensaje "Producto actualizado"
3. *Given* actualicé un producto, *When* navego al catálogo público, *Then* veo los cambios reflejados
4. *Given* estoy editando, *When* hago click en "Cancelar", *Then* vuelvo a `/admin` sin guardar cambios

---

### User Story 8 - Admin Delete Product (Priority: P2)

Un administrador puede eliminar un producto del catálogo con confirmación previa.

*Why this priority*: Necesario para gestionar el inventario. Con confirmación se evitan eliminaciones accidentales.

*Independent Test*: Eliminar un producto, confirmar la acción y verificar que ya no aparece en el catálogo público ni en el listado admin.

*Acceptance Scenarios*:

1. *Given* estoy en `/admin`, *When* hago click en "Eliminar" de un producto, *Then* aparece modal de confirmación
2. *Given* veo el modal de confirmación, *When* hago click en "Confirmar", *Then* se elimina via API DELETE y desaparece de la tabla
3. *Given* eliminé un producto, *When* navego al catálogo público, *Then* el producto ya no aparece
4. *Given* veo el modal de confirmación, *When* hago click en "Cancelar", *Then* el modal se cierra sin eliminar nada

---

### Edge Cases

- ¿Qué pasa cuando el backend devuelve 0 productos destacados? → **Ocultar carrousel completamente**
- ¿Qué pasa cuando no hay productos en el catálogo? → **Mostrar mensaje "No hay productos disponibles"**
- ¿Qué pasa cuando los filtros no coinciden con ningún producto? → **Mostrar "No se encontraron productos con estos filtros"**
- ¿Qué pasa si el JWT expira mientras estoy en `/admin`? → **Interceptor detecta 401 y redirige a `/login`**
- ¿Qué pasa si una imagen externa (S3) no carga? → **Mostrar imagen genérica "imagen no disponible"**
- ¿Qué pasa si ingreso una URL de imagen inválida en el formulario? → **Validar formato URL antes de guardar**
- ¿Qué pasa si pierdo conexión durante creación de producto? → **Mostrar error "Error de conexión, intenta nuevamente"**

## Requirements (mandatory)

### Functional Requirements

- *FR-001*: Sistema DEBE mostrar carrousel con productos destacados obtenidos de API GET `/api/products/featured`
- *FR-002*: Sistema DEBE mostrar grid de productos obtenidos de API GET `/api/products`
- *FR-003*: Sistema DEBE permitir filtrar productos por género (Hombre/Mujer/Niño), oversize (sí/no) y categoría (Casual/Religioso/Deportivo)
- *FR-004*: Filtros DEBEN combinarse (múltiples filtros activos simultáneamente)
- *FR-005*: Carrousel NO DEBE verse afectado por filtros (siempre muestra destacados)
- *FR-006*: Sistema DEBE proteger ruta `/admin/*` con autenticación JWT
- *FR-007*: Usuario no autenticado DEBE ser redirigido a `/login` al intentar acceder a `/admin`
- *FR-008*: Sistema DEBE permitir login con email/password via API POST `/api/auth/login`
- *FR-009*: Sistema DEBE almacenar JWT en localStorage tras login exitoso
- *FR-010*: Sistema DEBE incluir JWT en header `Authorization: Bearer <token>` en todas las requests a `/api/*` (excepto login)
- *FR-011*: Admin DEBE poder crear productos via API POST `/api/products` con todos los campos del formulario
- *FR-012*: Admin DEBE poder editar productos via API PUT `/api/products/:id`
- *FR-013*: Admin DEBE poder eliminar productos via API DELETE `/api/products/:id` con confirmación previa
- *FR-014*: Sistema DEBE validar campos obligatorios: nombre, precio, al menos 1 URL de imagen
- *FR-015*: Sistema DEBE limitar a máximo 4 URLs de imágenes por producto
- *FR-016*: Admin DEBE poder buscar/filtrar productos en el listado de `/admin`
- *FR-017*: Carrousel DEBE tener navegación infinita (loop) y auto-advance cada 5 segundos
- *FR-018*: Grid DEBE ser responsive (desktop-first): 4 → 3 → 2 → 1 columnas

### Key Entities

- *Product*: Representa una remera en el catálogo
  - Atributos: id, nombre, descripción, precio, género (Hombre/Mujer/Niño), categoría (Casual/Religioso/Deportivo), oversize (boolean), destacado (boolean), talles[] (array de strings), colores[] (array de strings), imágenes[] (array de URLs, max 4)
  - Relaciones: ninguna en MVP

- *AdminUser*: Representa un usuario administrador
  - Atributos: id, email, password (hasheado en backend)
  - Relaciones: ninguna en MVP
  - Nota: Autenticación via JWT, frontend solo maneja token

## Success Criteria (mandatory)

### Measurable Outcomes

- *SC-001*: Catálogo público carga en menos de 2 segundos con 100 productos
- *SC-002*: Carrousel muestra productos destacados con transiciones suaves (<300ms)
- *SC-003*: Filtros se aplican en tiempo real (<100ms de delay)
- *SC-004*: Formulario de nuevo producto valida campos en tiempo real sin lag
- *SC-005*: Admin puede crear un producto completo en menos de 2 minutos
- *SC-006*: Grid es completamente responsive en viewports de 320px a 1920px
- *SC-007*: Login exitoso redirige a `/admin` en menos de 1 segundo
- *SC-008*: JWT persiste en localStorage y mantiene sesión tras recargar página
- *SC-009*: Búsqueda en listado admin filtra en tiempo real (<100ms)
- *SC-010*: Aplicación frontend bundle size < 500KB (gzipped)

## Technical Requirements

### Technology Stack

- *Frontend Framework*: React 18+ with Vite 5+
- *Routing*: React Router v6
- *Styling*: CSS Modules (built-in with Vite)
- *State Management*: React Context API + hooks (evitar Redux para MVP)
- *HTTP Client*: fetch API with custom wrapper
- *Form Handling*: React Hook Form (liviano, performante)
- *Build Tool*: Vite (HMR ultra rápido, bundle optimizado)

### Routing Structure (English)

```
/                          → Home (public catalog)
/login                     → Admin login
/admin                     → Admin dashboard (protected)
/admin/products/new        → Create product (protected)
/admin/products/:id/edit   → Edit product (protected)
```

### API Contracts

> **Implementation Strategy**: Start with mock data, then replace with real API calls

#### Public Endpoints

**GET /api/products/featured**
- Description: Get featured products for carousel
- Auth: None
- Response:
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "string",
      "price": "number",
      "images": ["url1", "url2"],
      "sizes": ["S", "M", "L"],
      "colors": ["Negro", "Blanco"],
      "gender": "Hombre" | "Mujer" | "Niño",
      "category": "Casual" | "Religioso" | "Deportivo",
      "oversize": "boolean",
      "featured": "boolean",
      "description": "string"
    }
  ]
}
```

**GET /api/products**
- Description: Get all products with optional filters
- Auth: None
- Query params: `?gender=Hombre&category=Deportivo&oversize=true`
- Response: Same structure as featured

#### Admin Endpoints

**POST /api/auth/login**
- Description: Authenticate admin user
- Auth: None
- Request:
```json
{
  "email": "string",
  "password": "string"
}
```
- Response:
```json
{
  "token": "jwt-string",
  "user": {
    "id": "uuid",
    "email": "string"
  }
}
```

**POST /api/products**
- Description: Create new product
- Auth: JWT required (Bearer token)
- Request:
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "gender": "Hombre" | "Mujer" | "Niño",
  "category": "Casual" | "Religioso" | "Deportivo",
  "oversize": "boolean",
  "featured": "boolean",
  "sizes": ["array of strings"],
  "colors": ["array of strings"],
  "images": ["url1", "url2", "url3", "url4"]
}
```
- Response: Created product object

**PUT /api/products/:id**
- Description: Update existing product
- Auth: JWT required
- Request: Same as POST
- Response: Updated product object

**DELETE /api/products/:id**
- Description: Delete product
- Auth: JWT required
- Response: `{ "success": true }`

**GET /api/products** (admin version with auth)
- Description: Get all products including admin metadata
- Auth: JWT required
- Response: Same as public but may include additional fields

### Design System

**Color Palette** (Modern Minimalist - Light Theme):
```css
/* Primary Colors */
--color-primary: #2D3436;
--color-secondary: #636E72;
--color-accent: #0984E3;

/* Background Colors */
--color-bg-primary: #FFFFFF;
--color-bg-secondary: #F8F9FA;
--color-bg-tertiary: #E9ECEF;

/* State Colors */
--color-success: #00B894;
--color-error: #D63031;
--color-warning: #FDCB6E;

/* Shadows */
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
--shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.1);
```

**Typography**:
- Font family: 'Inter' (Google Fonts)
- Font sizes: 14px, 16px, 18px, 24px, 32px, 48px
- Font weights: 400 (regular), 500 (medium), 700 (bold)

**Spacing System**: Base 8px (4, 8, 16, 24, 32, 48, 64px)

**Responsive Breakpoints** (Desktop-first):
```css
--breakpoint-xl: 1280px;  /* 4 columns */
--breakpoint-lg: 1024px;  /* 3 columns */
--breakpoint-md: 768px;   /* 2 columns */
--breakpoint-sm: 640px;   /* 1 column */
```

### Authentication & Authorization

- JWT stored in `localStorage` with key `auth_token`
- Expired/invalid token → redirect to `/login`
- Protected routes check token presence before rendering
- HTTP interceptor adds `Authorization: Bearer <token>` to all requests
- Logout clears `localStorage` and redirects to `/login`

### Implementation Phases

**Phase 1: Mock Data First**
- Implement all components with hardcoded/mock data
- No API calls, just static JSON in `src/data/mock.js`
- Validate UI/UX flows work correctly

**Phase 2: API Integration**
- Replace mock data with real fetch calls
- Implement error handling and loading states
- Test with real backend

### Performance Targets

- Initial page load: < 2 seconds
- Time to Interactive (TTI): < 3 seconds
- Bundle size (gzipped): < 500KB
- Lighthouse score: > 90
- Images: Lazy loading below the fold

### Validation Rules

**Product Form**:
- Name: Required, min 3 chars, max 100 chars
- Description: Required, min 10 chars, max 500 chars
- Price: Required, number > 0
- Images: Required, min 1 URL, max 4 URLs, valid URL format
- Sizes: Required, min 1 size selected
- Colors: Required, min 1 color
- Gender: Required (Hombre/Mujer/Niño)
- Category: Required (Casual/Religioso/Deportivo)

**Login Form**:
- Email: Required, valid email format
- Password: Required, min 6 chars

### Error Handling

- Network errors: Toast notification "Error de conexión"
- 401 Unauthorized: Redirect to `/login`
- 404 Not Found: Show "Producto no encontrado"
- 500 Server Error: Toast "Error del servidor"
- Validation errors: Inline messages below form fields
