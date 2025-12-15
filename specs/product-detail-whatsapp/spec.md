# Feature Specification: Página de Detalle de Producto con WhatsApp

*Created*: 2025-12-08

## User Scenarios & Testing (mandatory)

### User Story 1 - View Product Detail Page (Priority: P1)

Un visitante hace click en cualquier producto del catálogo y accede a una página dedicada que muestra toda la información detallada: imágenes, descripción completa, talles, colores, precio y características.

*Why this priority*: Es fundamental para que el usuario pueda ver información completa antes de contactar. Sin esto, el flujo de compra/consulta está incompleto.

*Independent Test*: Navegar al catálogo, hacer click en cualquier ProductCard, verificar navegación a `/product/:id` y que se muestra toda la información del producto incluyendo todas las imágenes, descripción completa, talles, colores, género y categoría.

*Acceptance Scenarios*:

1. *Given* estoy en el catálogo (`/`), *When* hago click en una ProductCard, *Then* navego a `/product/:id` con el ID correcto del producto
2. *Given* estoy en `/product/:id`, *When* la página carga, *Then* veo: nombre del producto, precio, descripción completa, galería de imágenes, talles disponibles, colores disponibles, género, categoría y badge de "Destacado"/"Oversize" si aplica
3. *Given* veo la página de detalle, *When* inspecciono las imágenes, *Then* veo todas las imágenes del producto (hasta 4) con la primera como imagen principal
4. *Given* estoy en la página de detalle, *When* hago click en "Volver al catálogo", *Then* navego de vuelta a `/`
5. *Given* accedo a `/product/id-inexistente`, *When* la página intenta cargar, *Then* veo mensaje de error "Producto no encontrado"

---

### User Story 2 - Contact Seller via WhatsApp (Priority: P1)

Un visitante interesado en un producto puede hacer click en el botón de WhatsApp y ser redirigido a WhatsApp Web/App con un mensaje pre-llenado que incluye nombre, precio y link del producto.

*Why this priority*: Es el objetivo principal de esta feature. El botón de WhatsApp es el CTA (Call to Action) que convierte visitantes en clientes potenciales.

*Independent Test*: Navegar a una página de producto, hacer click en "Consultar por WhatsApp", verificar que se abre WhatsApp con el mensaje correcto pre-llenado.

*Acceptance Scenarios*:

1. *Given* estoy en `/product/:id`, *When* hago click en "Consultar por WhatsApp", *Then* se abre WhatsApp Web/App en una nueva pestaña
2. *Given* se abre WhatsApp, *When* veo el chat, *Then* el mensaje está pre-llenado con: "Hola! Me interesa este producto:\n\n[Nombre]\nPrecio: $[precio]\n\n[URL completa de la página]"
3. *Given* se abre WhatsApp, *When* verifico el destinatario, *Then* el chat se abre con el número configurado del administrador
4. *Given* estoy en mobile, *When* hago click en el botón de WhatsApp, *Then* se abre la app de WhatsApp (si está instalada) o WhatsApp Web (si no está instalada)

---

### User Story 3 - Social Links in Footer (Priority: P2)

Un visitante puede acceder a las redes sociales de la tienda (Instagram y WhatsApp) desde el footer que está presente en todas las páginas del sitio.

*Why this priority*: Mejora la presencia de la marca y facilita el contacto desde cualquier página, pero no es bloqueante para la funcionalidad principal de detalle de producto.

*Independent Test*: Navegar a cualquier página del sitio, hacer scroll al footer, verificar que hay enlaces a Instagram y WhatsApp que abren en nueva pestaña.

*Acceptance Scenarios*:

1. *Given* estoy en cualquier página del sitio, *When* hago scroll al footer, *Then* veo una nueva sección "Seguinos" con iconos y links de Instagram y WhatsApp
2. *Given* veo el footer, *When* hago click en el link de Instagram, *Then* se abre la página de Instagram de la tienda en una nueva pestaña
3. *Given* veo el footer, *When* hago click en el link de WhatsApp, *Then* se abre WhatsApp Web/App con el número del administrador (sin mensaje pre-llenado)
4. *Given* estoy en mobile, *When* veo el footer, *Then* el layout se adapta responsivamente manteniendo los 4 bloques en columnas verticales

---

### Edge Cases

- ¿Qué pasa cuando accedo a `/product/:id` con un ID que no existe? → **Mostrar mensaje "Producto no encontrado" con botón "Volver al catálogo"**
- ¿Qué pasa cuando un producto tiene solo 1 imagen? → **Mostrar solo la imagen principal sin thumbnails**
- ¿Qué pasa cuando una imagen del producto no carga? → **Mostrar placeholder "Imagen no disponible"**
- ¿Qué pasa si el número de WhatsApp no está configurado? → **Mostrar botón deshabilitado o mensaje de error en consola**
- ¿Qué pasa cuando el usuario está en un navegador que bloquea popups? → **El link de WhatsApp debe usar `target="_blank"` con `rel="noopener noreferrer"` para evitar bloqueo**
- ¿Qué pasa si cargo la página de detalle directamente (no desde el catálogo)? → **Debe funcionar correctamente haciendo fetch del producto por ID**

## Requirements (mandatory)

### Functional Requirements

- *FR-001*: Sistema DEBE permitir navegación desde ProductCard a `/product/:id` mediante click en toda la card
- *FR-002*: Sistema DEBE cargar producto individual via servicio `productsService.getById(id)`
- *FR-003*: Página de detalle DEBE mostrar: nombre, precio, descripción completa, todas las imágenes, talles, colores, género, categoría, badges (destacado/oversize)
- *FR-004*: Sistema DEBE mostrar estado de loading mientras carga el producto
- *FR-005*: Sistema DEBE mostrar mensaje de error si el producto no existe (404)
- *FR-006*: Página de detalle DEBE tener botón "Volver al catálogo" que navega a `/`
- *FR-007*: Sistema DEBE incluir botón "Consultar por WhatsApp" que genera URL de WhatsApp con mensaje pre-llenado
- *FR-008*: Mensaje de WhatsApp DEBE incluir: nombre del producto, precio formateado y URL completa de la página
- *FR-009*: Link de WhatsApp DEBE abrir en nueva pestaña con `target="_blank"` y `rel="noopener noreferrer"`
- *FR-010*: Número de WhatsApp DEBE estar configurado en archivo centralizado `src/config/contact.ts`
- *FR-011*: Footer DEBE incluir nueva columna "Seguinos" con enlaces a Instagram y WhatsApp
- *FR-012*: Enlaces de redes sociales DEBEN incluir iconos SVG inline (Instagram y WhatsApp)
- *FR-013*: Enlaces de redes sociales DEBEN abrir en nueva pestaña
- *FR-014*: Footer DEBE mantener diseño responsive adaptando de 4 columnas (desktop) a 1 columna (mobile)
- *FR-015*: Página de detalle DEBE ser responsive con layout adaptativo: 2 columnas (desktop) a stack vertical (mobile)
- *FR-016*: ProductCard DEBE ser clickeable en toda su superficie (convertir a link)

### Key Entities

- *Product* (ya existe): Misma entidad del spec frontend-mvp, sin cambios
  - Atributos relevantes: id, name, description, price, images[], sizes[], colors[], gender, category, oversize, featured

- *ContactInfo* (nueva configuración): Información de contacto de la tienda
  - Atributos: 
    - whatsapp.phoneNumber (string en formato internacional sin + ni espacios, ej: "5491123456789")
    - whatsapp.defaultMessage (string opcional)
    - instagram.url (string, URL completa de Instagram)

## Success Criteria (mandatory)

### Measurable Outcomes

- *SC-001*: Página de detalle carga en menos de 2 segundos
- *SC-002*: Click en ProductCard navega a detalle en menos de 300ms
- *SC-003*: Botón de WhatsApp genera link correcto en 100% de las pruebas
- *SC-004*: Link de WhatsApp abre en nueva pestaña sin bloqueos de popup
- *SC-005*: Página de detalle es completamente responsive en viewports de 320px a 1920px
- *SC-006*: Footer con redes sociales se muestra correctamente en todas las páginas del sitio
- *SC-007*: Transición entre catálogo y detalle es suave y sin parpadeos
- *SC-008*: Galería de imágenes muestra todas las fotos del producto sin errores de carga

## Technical Requirements

### Technology Stack

*Misma stack que frontend-mvp*:
- Frontend Framework: React 18+ with Vite 5+
- Routing: React Router v6
- Styling: CSS Modules
- State Management: React Context API + hooks
- HTTP Client: fetch API con servicio existente `productsService`

### New Route Structure

```
/product/:id                → Product detail page (public, NEW)
```

### Routing Changes

```tsx
// App.tsx - agregar nueva ruta pública
<Route path="/product/:id" element={<ProductDetail />} />
```

### API Contracts

**Nuevo método en productsService**:

```typescript
// src/services/products.ts
async getById(id: string): Promise<Product>
```

- Description: Get single product by ID
- Auth: None (public)
- Implementación inicial: Buscar en array de mock data
- Response: Objeto Product o throw error si no se encuentra

### Contact Configuration

**Nuevo archivo de configuración**:

```typescript
// src/config/contact.ts
export const CONTACT_INFO = {
  whatsapp: {
    phoneNumber: '5491123456789', // NEEDS CLARIFICATION: número real del administrador
    defaultMessage: 'Hola! Me interesa este producto:',
  },
  instagram: {
    url: 'https://www.instagram.com/tu_tienda', // NEEDS CLARIFICATION: usuario real de Instagram
  },
};
```

### WhatsApp URL Generation

```typescript
const generateWhatsAppLink = (product: Product): string => {
  const message = `${CONTACT_INFO.whatsapp.defaultMessage}\n\n${product.name}\nPrecio: $${product.price.toLocaleString('es-AR')}\n\n${window.location.href}`;
  return `https://wa.me/${CONTACT_INFO.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
};
```

### Design System

**Utilizará el mismo design system del frontend-mvp**:
- Color palette: Mantener colores existentes
- Nuevo color para WhatsApp: `--color-whatsapp: #25D366` (verde oficial)
- Typography: Misma tipografía 'Inter'
- Spacing: Mismo sistema base 8px
- Responsive breakpoints: Mismos breakpoints

**Layout de ProductDetail**:
- Desktop (> 768px): Grid 2 columnas (50% imagen / 50% detalles)
- Mobile (< 768px): Stack vertical (imagen arriba, detalles abajo)
- Padding container: `2rem` (mobile) / `4rem` (desktop)
- Gap entre secciones: `2rem`

**WhatsApp Button Styling**:
- Background: `#25D366` (verde WhatsApp)
- Color texto: blanco
- Padding: `1rem 2rem`
- Border-radius: `8px`
- Hover: Darkened green con elevación (shadow)
- Incluye icono de WhatsApp + texto "Consultar por WhatsApp"

### Component Structure

**Nuevos componentes a crear**:

1. `src/pages/ProductDetail.tsx` - Página principal de detalle
2. `src/pages/ProductDetail.module.css` - Estilos de la página
3. `src/components/common/WhatsAppButton.tsx` - Botón reutilizable de WhatsApp
4. `src/components/common/WhatsAppButton.module.css` - Estilos del botón
5. `src/components/icons/InstagramIcon.tsx` - Icono SVG de Instagram
6. `src/components/icons/WhatsAppIcon.tsx` - Icono SVG de WhatsApp
7. `src/config/contact.ts` - Configuración de contacto

**Componentes a modificar**:

1. `src/App.tsx` - Agregar ruta `/product/:id`
2. `src/components/catalog/ProductCard.tsx` - Hacer clickeable con Link
3. `src/components/catalog/ProductCard.module.css` - Estilos para link
4. `src/components/layout/Footer.tsx` - Agregar columna "Seguinos"
5. `src/components/layout/Footer.module.css` - Estilos para 4 columnas + redes sociales
6. `src/services/products.ts` - Agregar método `getById()`

### Responsive Behavior

**ProductDetail Layout**:
- Desktop (> 768px): 2 columnas lado a lado
- Tablet (768px - 1024px): 2 columnas con relación 40/60
- Mobile (< 768px): 1 columna vertical

**Footer Layout**:
- Desktop (> 1024px): 4 columnas horizontales
- Tablet (768px - 1024px): 2x2 grid
- Mobile (< 768px): 4 columnas verticales

### Performance Considerations

- Lazy load de imágenes en galería
- Optimizar bundle size reutilizando componentes existentes
- Preload de datos del producto al hacer hover en ProductCard (futuro)
- Mantener bundle < 500KB (mismo criterio que MVP)

### Accessibility

- Alt text en todas las imágenes
- Botones con aria-label descriptivo
- Links externos con `rel="noopener noreferrer"`
- Navegación por teclado funcional
- Contrast ratios WCAG AA en todos los elementos
- Focus states visibles en botones y links

### SEO Considerations

- Title tag dinámico: `{product.name} - Tienda de Remeras`
- Meta description con descripción del producto (opcional para MVP)
- URL limpia y semántica: `/product/:id`
- Breadcrumbs visuales: "Home > Producto" (futuro)

### Error Handling

- Producto no encontrado (404): Mostrar mensaje claro + botón volver al catálogo
- Error de red: Toast "Error al cargar producto"
- Imagen no carga: Placeholder "Imagen no disponible"
- WhatsApp config vacía: Warning en consola + botón deshabilitado

### Testing Strategy

- *Unit tests*: `generateWhatsAppLink()` function
- *Component tests*: WhatsAppButton renderiza correctamente
- *Integration tests*: Navegación desde ProductCard a ProductDetail
- *E2E tests*: 
  - Click en producto → ver detalle → click WhatsApp → se abre con mensaje correcto
  - Click en redes sociales del footer → se abren en nueva pestaña

### Implementation Order

1. **Setup & Config** (no depende de nada)
   - Crear `contact.ts` config
   - Crear iconos SVG (Instagram, WhatsApp)

2. **Services** (no depende de nada)
   - Implementar `getById()` en `productsService`

3. **Reusable Components** (depende de config)
   - `WhatsAppButton` component
   - Iconos components

4. **Footer Update** (depende de iconos y config)
   - Modificar Footer con columna de redes sociales

5. **ProductCard Navigation** (depende de routing)
   - Hacer ProductCard clickeable

6. **ProductDetail Page** (depende de todos los anteriores)
   - Crear página completa con WhatsAppButton

7. **Routing** (último)
   - Actualizar App.tsx con ruta nueva

### Validation Rules

**ProductDetail**:
- ID debe ser string válido (UUID o similar)
- Si producto no existe, mostrar error amigable

**WhatsApp Config**:
- Phone number debe ser string no vacío
- Phone number debe estar en formato internacional (solo dígitos)
- Instagram URL debe ser URL válida

### Known Limitations (MVP)

- No hay zoom/lightbox en imágenes (futuro)
- No hay selector interactivo de talles/colores (solo visualización)
- No hay carrito de compras (solo contacto por WhatsApp)
- No hay productos relacionados (futuro)
- No hay breadcrumbs (futuro)
- No hay share buttons para otras redes (futuro)
