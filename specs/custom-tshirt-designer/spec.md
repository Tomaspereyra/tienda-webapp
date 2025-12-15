# Feature Specification: Diseñador de Remeras Personalizado

*Created*: 2025-12-09

## User Scenarios & Testing (mandatory)

### User Story 1 - Browse Design Templates Gallery (Priority: P1)

Un visitante accede a la sección "Diseñá tu Remera" y ve una galería de plantillas prediseñadas con imágenes religiosas que puede seleccionar como base para su diseño personalizado.

*Why this priority*: Es el punto de entrada del diseñador. Sin plantillas base, el usuario no tiene con qué empezar su diseño.

*Independent Test*: Navegar a `/designer` y verificar que se muestra una galería de al menos 5 plantillas religiosas (santos, vírgenes, cruces, etc.) con preview visual claro.

*Acceptance Scenarios*:

1. *Given* estoy en `/designer`, *When* la página carga, *Then* veo una galería grid de plantillas con imágenes preview
2. *Given* veo la galería de plantillas, *When* hago hover sobre una plantilla, *Then* veo un efecto visual sutil y un botón "Usar esta plantilla"
3. *Given* las plantillas están visibles, *When* las inspecciono, *Then* cada una muestra: imagen preview, nombre descriptivo (ej: "Virgen María Moderna"), y categoría si aplica
4. *Given*  veo la galería, *When* hago click en "Usar esta plantilla", *Then* la plantilla se carga en el canvas editor
5. *Given* estoy en mobile, *When* veo la galería, *Then* el grid se adapta a 1-2 columnas manteniendo buena visualización

---

### User Story 2 - Add Custom Text to Template (Priority: P1)

Un usuario selecciona una plantilla y puede agregar texto personalizado (nombre, frase, fecha) posicionándolo sobre la imagen del diseño.

*Why this priority*: La personalización de texto es el feature más básico y demandado. Es el MVP del MVP.

*Independent Test*: Seleccionar una plantilla, agregar texto "Juan 3:16", verificar que aparece sobre el diseño y puedo cambiar color/tamaño.

*Acceptance Scenarios*:

1. *Given* tengo una plantilla cargada en el canvas, *When* hago click en "Agregar texto", *Then* aparece un cuadro de texto editable sobre el diseño
2. *Given* agregué un texto, *When* escribo contenido, *Then* el texto se muestra en tiempo real sobre el diseño
3. *Given* tengo texto en el canvas, *When* selecciono el texto, *Then* puedo cambiarlo arrastrándolo a diferentes posiciones
4. *Given* texto seleccionado, *When* uso los controles de formato, *Then* puedo cambiar: color, tamaño de fuente, y fuente tipográfica
5. *Given* agregué texto, *When* hago click en "Eliminar", *Then* el texto se elimina del diseño
6. *Given* varios textos agregados, *When* los muevo, *Then* cada texto es independiente y no interfiere con otros

---

### User Story 3 - Preview Design on T-Shirt Mockup (Priority: P1)

Un usuario puede ver cómo quedará su diseño personalizado en una remera real mediante un mockup visual.

*Why this priority*: El preview es crucial para la decisión de compra. Sin esto, el cliente no puede visualizar el producto final.

*Independent Test*: Crear un diseño con plantilla + texto, verificar que se muestra un mockup de remera con el diseño aplicado.

*Acceptance Scenarios*:

1. *Given* estoy editando un diseño, *When* veo la interfaz, *Then* hay una sección de preview que muestra el diseño sobre una remera
2. *Given* modifico el diseño (texto, colores), *When* hago cambios, *Then* el mockup se actualiza en tiempo real
3. *Given* veo el mockup, *When* selecciono color de remera, *Then* puedo elegir entre blanco, negro, y otros colores base
4. *Given* el diseño está listo, *When* inspecciono el mockup, *Then* veo exactamente cómo quedará impreso (tamaño relativo correcto)
5. *Given* estoy en mobile, *When* veo el preview, *Then* el mockup se adapta responsivamente

---

### User Story 4 - Select T-Shirt Color (Priority: P2)

Un usuario puede elegir el color base de la remera para ver cómo contrasta con su diseño personalizado.

*Why this priority*: Permite al cliente visualizar diferentes combinaciones y elegir la que mejor contraste tenga con su diseño.

*Independent Test*: Crear un diseño, cambiar color de remera de blanco a negro, verificar que el mockup se actualiza.

*Acceptance Scenarios*:

1. *Given* estoy en el designer, *When* veo las opciones de remera, *Then* hay un selector de color de remera
2. *Given* el selector está visible, *When* hago click en un color, *Then* el mockup cambia inmediatamente el color de la remera
3. *Given* cambié el color, *When* mi diseño tiene colores que no contrastan bien, *Then* veo una advertencia sutil (opcional pero nice-to-have)
4. *Given* colores disponibles, *When* los veo, *Then* incluyen al menos: Blanco, Negro, Gris, Azul Navy

---

### User Story 5 - Send Design via WhatsApp (Priority: P1)

Un usuario finaliza su diseño personalizado y puede enviarlo por WhatsApp para solicitar presupuesto y realizar el pedido.

*Why this priority*: Es el único CTA del designer. Sin esto, no hay conversión de diseños a ventas.

*Independent Test*: Completar un diseño, hacer click en "Solicitar por WhatsApp", verificar que se abre WhatsApp con preview del diseño y detalles.

*Acceptance Scenarios*:

1. *Given* tengo un diseño completo, *When* hago click en "Solicitar por WhatsApp", *Then* se genera una imagen del diseño finalizado
2. *Given* se genera la imagen, *When* se abre WhatsApp, *Then* el mensaje incluye: nombre del diseño, descripción de personalizaciones (texto agregado), color de remera, y preview/link a imagen
3. *Given* el WhatsApp se abre, *When* verifico el destinatario, *Then* es el número configurado de la tienda
4. *Given* estoy en mobile, *When* envío por WhatsApp, *Then* se abre la app de WhatsApp nativa
5. *Given* diseño sin texto personalizado, *When* intento enviar, *Then* funciona igual (solo plantilla base)

---

### User Story 6 - Choose Typography (Priority: P2)

Un usuario puede seleccionar entre diferentes fuentes tipográficas para el texto que agrega a su diseño.

*Why this priority*: Mejora la personalización y permite adaptarse a diferentes estilos (elegante, moderno, clásico). No es bloqueante para MVP.

*Independent Test*: Agregar texto, seleccionarlo, cambiar fuente tipográfica entre 3 opciones diferentes.

*Acceptance Scenarios*:

1. *Given* tengo texto agregado, *When* lo selecciono, *Then* veo un selector de fuentes tipográficas
2. *Given* el selector está abierto, *When* veo las opciones, *Then* hay al menos 3-5 fuentes (serif elegante, sans-serif moderna, script para nombres)
3. *Given* selecciono una fuente, *When* aplico el cambio, *Then* el texto en el canvas se actualiza inmediatamente
4. *Given* diferentes textos en el canvas, *When* los selecciono individualmente, *Then* cada uno puede tener su propia fuente

---

### User Story 7 - Drag and Position Text (Priority: P2)

Un usuario puede arrastrar libremente los elementos de texto para posicionarlos exactamente donde desea sobre el diseño.

*Why this priority*: Da control total sobre el diseño final. Mejora UX pero no es crítico si hay posiciones predefinidas.

*Independent Test*: Agregar texto, arrastrarlo a diferentes ubicaciones del canvas, verificar que se mueve suavemente.

*Acceptance Scenarios*:

1. *Given* tengo texto en el canvas, *When* hago click y arrastro, *Then* el texto se mueve siguiendo el cursor
2. *Given* estoy arrastrando texto, *When* lo suelto, *Then* queda fijado en la nueva posición
3. *Given* texto posicionado, *When* lo muevo cerca de los bordes, *Then* hay guides visuales o snapping para alinearlo (opcional)
4. *Given* múltiples textos, *When* arrastro uno, *Then* los demás no se ven afectados

---

### User Story 8 - Save Design for Later (Priority: P3)

Un usuario puede guardar su diseño en progreso para editarlo más tarde sin perder su trabajo.

*Why this priority*: Nice-to-have para UX avanzada. No crítico para MVP inicial. Puede ser implementado con localStorage simple.

*Independent Test*: Crear diseño parcial, hacer click en "Guardar borrador", recargar página, verificar que el diseño se mantiene.

*Acceptance Scenarios*:

1. *Given* estoy editando un diseño, *When* hago click en "Guardar borrador", *Then* el diseño se guarda en localStorage
2. *Given* guardé un borrador, *When* recargo la página, *Then* veo opción "Continuar diseño anterior"
3. *Given* tengo un borrador guardado, *When* hago click en "Continuar diseño anterior", *Then* se carga el diseño exactamente como lo dejé
4. *Given* completo un diseño y lo envío por WhatsApp, *When* finaliza el proceso, *Then* el borrador se elimina automáticamente

---

### Edge Cases

- ¿Qué pasa cuando el texto es muy largo y excede el área del diseño? → **Mostrar warning y permitir ajustar tamaño/posición**
- ¿Qué pasa cuando selecciono una fuente que no se carga correctamente? → **Fallback a fuente por defecto + warning en consola**
- ¿Qué pasa si la imagen de la plantilla no carga? → **Mostrar placeholder "Imagen no disponible" con opción de recargar**
- ¿Qué pasa cuando usuario elige color de texto igual al color de remera? → **Mostrar sugerencia de cambiar color para mejor visibility**
- ¿Qué pasa si canvas es muy complejo y la exportación falla? → **Mostrar error amigable "Error al generar imagen, intenta simplificar el diseño"**
- ¿Qué pasa en pantallas muy pequeñas (< 400px)? → **Mostrar mensaje sugiriendo usar dispositivo con pantalla más grande para mejor experiencia**

## Requirements (mandatory)

### Functional Requirements

- *FR-001*: Sistema DEBE mostrar galería de plantillas prediseñadas obtenidas de data estática o API
- *FR-002*: Usuario DEBE poder seleccionar una plantilla que se carga en canvas editor
- *FR-003*: Sistema DEBE permitir agregar texto personalizado sobre el diseño en canvas
- *FR-004*: Usuario DEBE poder editar texto: contenido, color, tamaño y fuente tipográfica
- *FR-005*: Sistema DEBE permitir arrastrar y posicionar elementos de texto libremente
- *FR-006*: Usuario DEBE poder eliminar elementos de texto individuales
- *FR-007*: Sistema DEBE mostrar preview en tiempo real del diseño sobre mockup de remera
- *FR-008*: Usuario DEBE poder seleccionar color de remera base (mínimo: Blanco, Negro, Gris)
- *FR-009*: Sistema DEBE actualizar mockup en tiempo real cuando cambian diseño o color de remera
- *FR-010*: Sistema DEBE exportar diseño finalizado como imagen PNG/JPEG para compartir
- *FR-011*: Usuario DEBE poder enviar diseño por WhatsApp con mensaje pre-llenado incluyendo detalles
- *FR-012*: Sistema DEBE incluir al menos 3-5 fuentes tipográficas diferentes
- *FR-013*: Canvas DEBE ser responsive adaptándose a desktop, tablet y mobile
- *FR-014*: Sistema DEBE permitir guardar diseño en localStorage (P3 - opcional para MVP)
- *FR-015*: Sistema DEBE validar que el diseño tiene contenido antes de permitir envío por WhatsApp
- *FR-016*: Navegación DEBE incluir botón "Volver al catálogo" desde `/designer`

### Key Entities

- *DesignTemplate*: Plantilla prediseñada base
  - Atributos: id, name, category (opcional), imageUrl, description (opcional), tags[] (opcional)
  
- *CustomDesign*: Diseño personalizado del usuario
  - Atributos: 
    - templateId (referencia a plantilla base)
    - textElements[] (array de bloques de texto agregados)
    - shirtColor (color seleccionado para la remera)
    - createdAt, updatedAt (para tracking)
  
- *TextElement*: Bloque de texto personalizado
  - Atributos: 
    - content (string del texto)
    - position { x, y } (coordenadas en canvas)
    - fontSize (number en px)
    - fontFamily (string nombre de fuente)
    - color (hex color string)
    - id (identificador único del elemento)

- *TShirtColor*: Colores disponibles para remera base
  - Atributos: name, hexValue, imageUrl (mockup de remera en ese color)

## Success Criteria (mandatory)

### Measurable Outcomes

- *SC-001*: Usuario puede completar un diseño personalizado (plantilla + texto) en menos de 3 minutos
- *SC-002*: Canvas editor responde a cambios de texto en menos de 100ms (actualización en tiempo real)
- *SC-003*: Exportación de diseño a imagen toma menos de 2 segundos
- *SC-004*: Preview mockup se actualiza en tiempo real (\<200ms) cuando cambia diseño o color
- *SC-005*: Galería de plantillas carga y muestra todas las opciones en menos de 1 segundo
- *SC-006*: Usuario puede enviar diseño por WhatsApp en 1 click desde la interfaz
- *SC-007*: Canvas es completamente funcional en pantallas de 768px o más
- *SC-008*: Al menos 80% de los elementos de texto se posicionan con precisión al primer arrastre
- *SC-009*: Interfaz soporta hasta 5 elementos de texto simultáneos sin degradación de performance
- *SC-010*: Diseños guardados en localStorage persisten tras cerrar/reabrir navegador

## Technical Requirements

### Technology Stack

*Basado en stack existente más librería de canvas*:
- Frontend Framework: React 18+ with Vite 5+
- Routing: React Router v6
- Styling: CSS Modules
- **Canvas Library**: fabric.js v5+ o react-konva v18+
  - Recomendación: **fabric.js** por su facilidad para manejo de textos y exportación
- **Image Export**: html2canvas o fabric.toDataURL()
- **Mockup Generation**: CSS-based o compositing con canvas
- State Management: React Context API + hooks (para estado del diseño)

### New Route Structure

```
/designer                   → Design customizer page (public, NEW)
/designer/:templateId       → Pre-load specific template (public, NEW, opcional)
```

### Routing Changes

```tsx
// App.tsx - agregar nueva ruta pública
<Route path="/designer" element={<DesignCustomizer />} />
<Route path="/designer/:templateId" element={<DesignCustomizer />} /> // opcional
```

### Data Structure

**Design Templates** (inicial: static JSON, futuro: API):

```typescript
// src/data/designTemplates.ts
export const DESIGN_TEMPLATES = [
  {
    id: 'virgen-maria-moderna',
    name: 'Virgen María Moderna',
    category: 'Santos',
    imageUrl: '/templates/virgen-maria-moderna.png',
    description: 'Diseño moderno de la Virgen María',
    tags: ['virgen', 'maria', 'moderno']
  },
  {
    id: 'cruz-radiante',
    name: 'Cruz Radiante',
    category: 'Símbolos',
    imageUrl: '/templates/cruz-radiante.png',
    description: 'Cruz con rayos de luz',
    tags: ['cruz', 'luz', 'religioso']
  },
  // ... más plantillas
];
```

**T-Shirt Colors**:

```typescript
// src/data/tshirtColors.ts
export const TSHIRT_COLORS = [
  { name: 'Blanco', hexValue: '#FFFFFF', mockupUrl: '/mockups/white-tshirt.png' },
  { name: 'Negro', hexValue: '#000000', mockupUrl: '/mockups/black-tshirt.png' },
  { name: 'Gris', hexValue: '#808080', mockupUrl: '/mockups/gray-tshirt.png' },
  { name: 'Azul Navy', hexValue: '#001F3F', mockupUrl: '/mockups/navy-tshirt.png' },
];
```

**Typography Options**:

```typescript
// src/data/fonts.ts
export const AVAILABLE_FONTS = [
  { name: 'Elegante Serif', fontFamily: 'Cormorant Garamond', webfontUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700' },
  { name: 'Moderna Sans', fontFamily: 'Work Sans', webfontUrl: 'https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;500' },
  { name: 'Script', fontFamily: 'Dancing Script', webfontUrl: 'https://fonts.googleapis.com/css2?family=Dancing+Script' },
  { name: 'Bold Impact', fontFamily: 'Oswald', webfontUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@400;700' },
];
```

### Canvas Implementation (Fabric.js approach)

```typescript
// Core canvas setup
import { fabric } from 'fabric';

const initCanvas = (canvasElement: HTMLCanvasElement) => {
  const canvas = new fabric.Canvas(canvasElement, {
    width: 800,
    height: 1000,
    backgroundColor: '#FFFFFF'
  });
  
  // Load template background image
  fabric.Image.fromURL(templateImageUrl, (img) => {
    img.set({
      selectable: false, // Background no seleccionable
      evented: false
    });
    canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
  });
  
  return canvas;
};

// Add text element
const addTextToCanvas = (canvas: fabric.Canvas, text: string) => {
  const textObj = new fabric.IText(text, {
    left: 100,
    top: 100,
    fontSize: 40,
    fontFamily: 'Work Sans',
    fill: '#000000'
  });
  canvas.add(textObj);
  canvas.setActiveObject(textObj);
};

// Export design
const exportDesign = (canvas: fabric.Canvas) => {
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1.0,
    multiplier: 2 // 2x resolution for print quality
  });
  return dataURL;
};
```

### WhatsApp Integration

```typescript
const sendDesignViaWhatsApp = async (design: CustomDesign, designImageUrl: string) => {
  // 1. Generar descripción del diseño
  const textDescriptions = design.textElements.map((el, i) => 
    `Texto ${i + 1}: "${el.content}"`
  ).join('\n');
  
  const message = `Hola! Quiero ordenar una remera personalizada:

Plantilla: ${design.templateName}
Color de remera: ${design.shirtColor.name}
${textDescriptions}

Ver diseño: ${window.location.origin}/designs/${designImageUrl}`;

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp.phoneNumber}?text=${encodeURIComponent(message)}`;
  
  window.open(whatsappUrl, '_blank');
};
```

### Design System

**Mantener mismo design system del site principal**:
- Color palette: Colores profesionales existentes
- Typography: Mismas fuentes del site (Work Sans, Cormorant Garamond)
- Spacing: Sistema base 12px
- Responsive breakpoints: Mismos breakpoints

**New Design Elements para Designer**:

**Canvas Area**:
- Desktop: 800x1000px canvas size
- Mobile: Escala proporcional para fit viewport width
- Background: Blanco o gris muy claro (#FAFAFA)
- Border: 1px solid #E0E0E0

**Template Gallery Cards**:
- Grid: 3 columnas (desktop), 2 (tablet), 1 (mobile)
- Card: Aspect ratio 3:4 (portrait)
- Border-radius: 4px
- Hover: Shadow elevation + scale 1.02

**Toolbar Controls**:
- Position: Sidebar izquierdo (desktop) o bottom drawer (mobile)
- Secciones: Plantillas | Texto | Colores | Exportar
- Buttons: Mismo estilo que botones del site (minimalista, borders sutiles)

**Mockup Preview**:
- Desktop: Panel derecho sticky
- Mobile: Sección expandible/collapsible
- Actualización: Debounced 200ms para performance

### Component Structure

**Nuevos componentes a crear**:

1. `src/pages/DesignCustomizer.tsx` - Página principal del designer
2. `src/pages/DesignCustomizer.module.css` - Estilos
3. `src/components/designer/TemplateGallery.tsx` - Galería de plantillas
4. `src/components/designer/TemplateGallery.module.css`
5. `src/components/designer/CanvasEditor.tsx` - Canvas editor (fabric.js wrapper)
6. `src/components/designer/CanvasEditor.module.css`
7. `src/components/designer/TextControls.tsx` - Controles de texto (font, color, size)
8. `src/components/designer/TextControls.module.css`
9. `src/components/designer/ColorPicker.tsx` - Selector de colores
10. `src/components/designer/ColorPicker.module.css`
11. `src/components/designer/TShirtColorSelector.tsx` - Selector de color de remera
12. `src/components/designer/TShirtColorSelector.module.css`  
13. `src/components/designer/TShirtMockup.tsx` - Preview mockup
14. `src/components/designer/TShirtMockup.module.css`
15. `src/components/designer/DesignToolbar.tsx` - Toolbar con acciones
16. `src/components/designer/DesignToolbar.module.css`
17. `src/data/designTemplates.ts` - Data de plantillas
18. `src/data/tshirtColors.ts` - Data de colores de remera
19. `src/data/fonts.ts` - Data de fuentes disponibles
20. `src/context/DesignContext.tsx` - Context para estado del diseño
21. `src/hooks/useCanvas.ts` - Hook para manejo de canvas
22. `src/utils/canvasHelpers.ts` - Helpers para fabric.js
23. `src/utils/imageExport.ts` - Helpers para exportar imagen

**Componentes a modificar**:

1. `src/App.tsx` - Agregar ruta `/designer`
2. `src/components/layout/Footer.tsx` - Opcionalmente agregar link a "Diseñá tu Remera"
3. Opcional: Agregar CTA en Home para acceder al designer

### Responsive Behavior

**DesignCustomizer Layout**:
- Desktop (> 1024px): 3 columnas (toolbar sidebar | canvas center | mockup sidebar)
- Tablet (768px - 1024px): 2 columnas (canvas + controls drawer | mockup below)
- Mobile (< 768px): 1 columna (canvas full-width, controls bottom sheet, mockup collapsible)

**Canvas Sizing**:
- Desktop: Fixed 800x1000px
- Mobile: Width 100% (max 600px), height proporcional
- Escala: Mantener ratio 4:5 siempre

### Performance Considerations

- Debounce canvas re-renders (200ms) cuando usuario escribe/mueve elementos
- Lazy load template images con placeholders
- Optimize image export (use 2x multiplier max, limit resolution)
- Use fabric.js object caching for better performance
- Virtualize template gallery si hay > 20 plantillas
- Throttle mockup updates durante drag operations

### Accessibility

- Canvas DEBE tener descripción accesible via aria-label
- Todos los controles DEBEN ser keyboard accessible
- Color contrast ratio WCAG AA en todos los controles
- Proveer shortcuts de teclado: Ctrl+Z (undo), Del (delete selected)
- Screen reader friendly: Anunciar cuando se agrega/elimina texto

### SEO Considerations

- Title: "Diseñá tu Remera Personalizada - Tienda Inmaculada"
- Meta description: "Creá tu remera religiosa personalizada con nuestras plantillas de santos y vírgenes. Agregá texto, elegí colores y pedí por WhatsApp"
- Canonical URL: `/designer`
- Open Graph tags para compartir designs (futuro)

### Error Handling

- Canvas initialization fails: Mostrar mensaje "Tu navegador no soporta el editor. Intenta con Chrome/Firefox actualizado"
- Template image fails to load: Placeholder + botón "Reintentar"
- Export fails: Toast "Error al generar imagen. Intenta simplificar el diseño"
- Too many text elements (> 5): Warning "Demasiados elementos. Para mejor performance, usa máximo 5 textos"
- Invalid font: Fallback a Work Sans + log warning

### Testing Strategy

- *Unit tests*: 
  - Canvas helpers (add text, export image, change colors)
  - Image export functionality
- *Component tests*:
  - TemplateGallery renders all templates
  - TextControls updates canvas correctly
  - ColorPicker changes text color
- *Integration tests*:
  - Complete flow: Select template → Add text → Change color → Export design
  - WhatsApp link generation with correct data
- *E2E tests*:
  - User can create complete design and send via WhatsApp
  - Design persists in localStorage (si implementado)
  - Responsive behavior en mobile/tablet/desktop

### Implementation Order

**V1 - MVP (P1 features)**:

1. **Setup & Data** (Day 1)
   - Crear estructura de directorios
   - Definir templates estáticos (JSON)
   - Definir colores de remera
   - Install fabric.js dependency

2. **Core Canvas** (Day 1-2)
   - CanvasEditor component con fabric.js
   - Cargar template como background
   - Basic add text functionality
   - Basic move text (drag)

3. **Template Selection** (Day 2)
   - TemplateGallery component
   - Grid de plantillas
   - Click to load in canvas

4. **Text Controls** (Day 2-3)
   - TextControls component
   - Edit text content
   - Change color (basic picker)
   - Change font size
   - Delete text

5. **T-Shirt Preview** (Day 3)
   - TShirtMockup component
   - Mostrar diseño sobre mockup
   - TShirtColorSelector
   - Update mockup with design changes

6. **Export & WhatsApp** (Day 3)
   - Export canvas to image
   - Generate WhatsApp message
   - Send design link

7. **Polish & Responsive** (Day 4)
   - Responsive layout
   - Loading states
   - Error handling
   - UX polish

**V2 - Enhanced (P2 features)**:

1. **Advanced Typography** (Day 5)
   - Multiple font options (3-5 fonts)
   - Font selector UI
   - Load Google Fonts dynamically

2. **Improved Drag & Drop** (Day 5-6)
   - Smooth dragging
   - Snap guides (optional)
   - Boundaries (keep text in canvas)
   - Multi-select (optional)

3. **Advanced Color Controls** (Day 6)
   - Full color picker (react-color)
   - Color presets
   - Gradient support (optional)

4. **Design Persistence** (Day 6-7)
   - Save to localStorage
   - Load saved design
   - Auto-save drafts

5. **Enhanced Preview** (Day 7)
   - Multiple mockup angles (front/back)
   - Zoom mockup
   - Download mockup image

### Validation Rules

**Design Validation**:
- Al menos 1 elemento visible (template con o sin texto) antes de exportar
- Text content no puede estar vacío (min 1 char)
- Text position debe estar dentro del canvas boundaries

**Template Validation**:
- Image URL debe ser válida
- Template debe tener dimensiones consistentes (recommend 800x1000px)

### Known Limitations (MVP)

- No support para upload de imágenes propias (solo templates predefinidos)
- No layers panel (solo basic stack order)
- No undo/redo (futuro)
- No rotate text (solo position + size)
- No advanced effects (shadows, outlines, etc) - futuro
- No collaborative editing (solo 1 usuario a la vez)
- No design templates API (static data en MVP)
- No print-ready PDF export (solo PNG/JPEG preview)
- No integration con inventory/stock (solo WhatsApp inquiry)
