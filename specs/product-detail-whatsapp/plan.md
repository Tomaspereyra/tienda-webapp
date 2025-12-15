# Implementation Plan: Product Detail Page with WhatsApp Integration

*Date*: 2025-12-08  
*Spec*: [spec.md](file:///c:/Users/tomas/webapp-tienda/specs/product-detail-whatsapp/spec.md)

## Summary

Implement a dedicated product detail page accessible from the catalog that displays comprehensive product information (images, description, sizes, colors, price) with a WhatsApp contact button that generates pre-filled messages. Additionally, enhance the footer with social media links (Instagram and WhatsApp) visible across all pages. This feature enables direct customer-seller communication while maintaining the existing mock-first approach.

**Technical Approach**: Create new React components for product detail page and WhatsApp button, add navigation from ProductCard using React Router, implement URL generation for WhatsApp Web/App, and update footer with new social links column. All contact configuration centralized in a config file for easy updates.

## Technical Context

*Language/Version*: TypeScript 5+  
*Primary Dependencies*: React 18+, Vite 5+, React Router v6  
*Storage*: Mock data (in-memory, extending existing productsService)  
*Testing*: Vitest + React Testing Library (extending existing test suite)  
*Target Platform*: Modern browsers (Chrome, Firefox, Safari, Edge) + Mobile (WhatsApp app integration)  
*Project Type*: Web (SPA)  
*Performance Goals*: 
- Product detail page load < 2s
- WhatsApp link generation < 100ms
- Maintain bundle size < 500KB gzipped

*Constraints*: 
- Must work with mock data (no backend dependency)
- Maintain existing design system consistency
- WhatsApp config must be easily changeable (centralized)
- Fully responsive (320px - 1920px)

*Scale/Scope*: 
- 7 new files (components + config)
- 6 existing files to modify
- 3 user stories (2 P1, 1 P2)
- ~300 lines of new code

## Project Structure

### Documentation (this feature)

```
specs/product-detail-whatsapp/
├── plan.md              # This file 
└── spec.md             # Feature specification
```

### Source Code (repository root)

```
frontend/
├── src/
│   ├── components/
│   │   ├── catalog/
│   │   │   ├── ProductCard.tsx          # MODIFY - make clickeable
│   │   │   └── ProductCard.module.css   # MODIFY - link styles
│   │   ├── common/
│   │   │   ├── WhatsAppButton.tsx       # NEW - reusable button
│   │   │   └── WhatsAppButton.module.css # NEW - button styles
│   │   ├── icons/
│   │   │   ├── InstagramIcon.tsx        # NEW - SVG icon
│   │   │   └── WhatsAppIcon.tsx         # NEW - SVG icon
│   │   └── layout/
│   │       ├── Footer.tsx               # MODIFY - add social links
│   │       └── Footer.module.css        # MODIFY - 4 columns layout
│   ├── pages/
│   │   ├── ProductDetail.tsx            # NEW - detail page
│   │   └── ProductDetail.module.css     # NEW - page styles
│   ├── services/
│   │   └── products.ts                  # MODIFY - add getById()
│   ├── config/
│   │   └── contact.ts                   # NEW - contact configuration
│   └── App.tsx                          # MODIFY - add route
└── tests/
    └── components/
        └── WhatsAppButton.test.tsx      # NEW - unit tests
```

*Structure Decision*: Following existing frontend-mvp structure. New config folder for centralized contact info. Icons in new `components/icons/` for organization. WhatsAppButton in `common/` for reusability. ProductDetail in `pages/` alongside other pages.

---

## Phase 1: Setup (Configuration & Icons)

*Purpose*: Create shared configuration and icon components that other features will use

- [ ] T001 Create `src/config/` directory
- [ ] T002 Create contact configuration file `src/config/contact.ts` with placeholder values
- [ ] T003 Create `src/components/icons/` directory
- [ ] T004 Create WhatsApp SVG icon component `src/components/icons/WhatsAppIcon.tsx`
- [ ] T005 Create Instagram SVG icon component `src/components/icons/InstagramIcon.tsx`

---

## Phase 2: Foundational (Services & Routing)

*Purpose*: Core infrastructure that MUST be complete before ANY user story can be implemented

*⚠️ CRITICAL*: No user story work can begin until this phase is complete

- [ ] T006 Add `getById(id: string)` method to `src/services/products.ts`
- [ ] T007 Implement mock data search in `getById()` (search existing mock array by id)
- [ ] T008 Add error handling in `getById()` for product not found
- [ ] T009 Add new route `/product/:id` to `src/App.tsx`
- [ ] T010 Verify route works with placeholder component (test navigation)

*Checkpoint*: Foundation ready - can navigate to /product/:id and fetch product by ID

---

## Phase 3: User Story 1 - View Product Detail Page (Priority: P1)

*Goal*: Display comprehensive product information on dedicated detail page with navigation from catalog

*Independent Test*: Click any ProductCard from catalog, navigate to `/product/:id`, verify all product information displays correctly

### Tests for User Story 1

- [ ] T011 [P] [US1] Unit test for ProductDetail component with mock product data
- [ ] T012 [P] [US1] Integration test - navigation from ProductCard to ProductDetail
- [ ] T013 [P] [US1] Integration test - product not found shows error message
- [ ] T014 [P] [US1] Integration test - "Volver al catálogo" button navigation

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create ProductDetail page component in `src/pages/ProductDetail.tsx`
- [ ] T016 [US1] Implement product loading logic using `useParams` and `getById()`
- [ ] T017 [US1] Add loading state while fetching product
- [ ] T018 [US1] Add error state for product not found
- [ ] T019 [US1] Implement product information layout (2-column grid: images + details)
- [ ] T020 [US1] Display product images gallery (primary image + thumbnails if multiple)
- [ ] T021 [US1] Display product details section (name, price, description, sizes, colors, metadata)
- [ ] T022 [US1] Add "Volver al catálogo" button with navigation to `/`
- [ ] T023 [US1] Add badges for "Destacado" and "Oversize" if applicable
- [ ] T024 [US1] Create `ProductDetail.module.css` with responsive layout
- [ ] T025 [US1] Style image gallery with fallback for broken images
- [ ] T026 [US1] Style product details section (typography, spacing, colors)
- [ ] T027 [US1] Add responsive breakpoints (2-column desktop → 1-column mobile)
- [ ] T028 [US1] Update ProductCard to be clickeable using React Router Link
- [ ] T029 [US1] Wrap ProductCard content in `<Link to={/product/${product.id}}>`
- [ ] T030 [US1] Update `ProductCard.module.css` to style link (remove underline, maintain hover)
- [ ] T031 [US1] Improve hover effect to indicate clickability

*Checkpoint*: Product detail page fully functional with navigation from catalog, responsive design

---

## Phase 4: User Story 2 - Contact Seller via WhatsApp (Priority: P1)

*Goal*: Enable direct contact with seller through WhatsApp with pre-filled product information

*Independent Test*: Click "Consultar por WhatsApp" button, verify WhatsApp opens with correct message and phone number

### Tests for User Story 2

- [ ] T032 [P] [US2] Unit test for WhatsAppButton component
- [ ] T033 [P] [US2] Unit test for `generateWhatsAppLink()` function
- [ ] T034 [P] [US2] Integration test - WhatsApp link generates correctly with product data
- [ ] T035 [P] [US2] Integration test - link opens in new tab

### Implementation for User Story 2

- [ ] T036 [P] [US2] Create WhatsAppButton component in `src/components/common/WhatsAppButton.tsx`
- [ ] T037 [US2] Implement `generateWhatsAppLink()` function inside component
- [ ] T038 [US2] Generate message with product name, price, and current URL
- [ ] T039 [US2] Implement URL encoding for WhatsApp message
- [ ] T040 [US2] Build WhatsApp Web URL: `https://wa.me/{phone}?text={encodedMessage}`
- [ ] T041 [US2] Render button with WhatsApp icon + text "Consultar por WhatsApp"
- [ ] T042 [US2] Add link with `target="_blank"` and `rel="noopener noreferrer"`
- [ ] T043 [US2] Create `WhatsAppButton.module.css` with WhatsApp green (#25D366)
- [ ] T044 [US2] Style button with icon alignment and hover effects
- [ ] T045 [US2] Add responsive button sizing (full-width on mobile)
- [ ] T046 [US2] Integrate WhatsAppButton into ProductDetail page
- [ ] T047 [US2] Position button prominently in details section
- [ ] T048 [US2] Verify button uses phone number from config file
- [ ] T049 [US2] Add console warning if phone number is not configured

*Checkpoint*: WhatsApp button functional, generates correct links, opens in new tab

---

## Phase 5: User Story 3 - Social Links in Footer (Priority: P2)

*Goal*: Add Instagram and WhatsApp links to footer visible on all pages

*Independent Test*: Navigate to any page, scroll to footer, verify social links open correctly in new tabs

### Tests for User Story 3

- [ ] T050 [P] [US3] Unit test for Footer component with social links
- [ ] T051 [P] [US3] Integration test - Instagram link opens correct URL
- [ ] T052 [P] [US3] Integration test - WhatsApp link opens with correct number

### Implementation for User Story 3

- [ ] T053 [P] [US3] Update `src/components/layout/Footer.tsx` to import icons and config
- [ ] T054 [US3] Add new footer column "Seguinos" to existing footer grid
- [ ] T055 [US3] Create Instagram link with InstagramIcon component
- [ ] T056 [US3] Create WhatsApp link with WhatsAppIcon component
- [ ] T057 [US3] Add `target="_blank"` and `rel="noopener noreferrer"` to social links
- [ ] T058 [US3] Add `aria-label` to social links for accessibility
- [ ] T059 [US3] Update `Footer.module.css` to support 4-column grid
- [ ] T060 [US3] Style social links with icons + text (vertical layout)
- [ ] T061 [US3] Add hover effects for social links
- [ ] T062 [US3] Update responsive breakpoints for 4-column layout
- [ ] T063 [US3] Test footer on desktop (4 columns), tablet (2x2 grid), mobile (1 column)
- [ ] T064 [US3] Verify footer appears correctly on all existing pages (Home, ProductDetail, Login, Admin)

*Checkpoint*: Footer updated with social links, responsive layout working across all pages

---

## Phase 6: Polish & Cross-Cutting Concerns

*Purpose*: Final refinements and edge case handling

- [ ] T065 Add image loading error handling in ProductDetail (show placeholder)
- [ ] T066 Test direct URL navigation to `/product/:id` (deep linking)
- [ ] T067 Test with products that have 1 image vs 4 images
- [ ] T068 Test with very long product names and descriptions
- [ ] T069 Verify responsive design on mobile (375px), tablet (768px), desktop (1440px)
- [ ] T070 Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T071 Test WhatsApp link on mobile devices (opens app vs web)
- [ ] T072 Verify social links work from all pages
- [ ] T073 Add loading skeleton for ProductDetail (optional, for better UX)
- [ ] T074 Run existing test suite to ensure no regressions
- [ ] T075 Update README with instructions to configure contact info
- [ ] T076 Create example values in contact.ts config with clear comments

---

## Dependencies & Execution Order

### Phase Dependencies

- *Setup (Phase 1)*: No dependencies - can start immediately
- *Foundational (Phase 2)*: Depends on Setup completion - BLOCKS all user stories
- *User Stories (Phase 3-5)*: All depend on Foundational phase completion
  - US1 and US2 are tightly coupled (US2 needs ProductDetail page from US1)
  - US3 is independent and can be done in parallel
- *Polish (Phase 6)*: Depends on all user stories being complete

### User Story Dependencies

- *User Story 1 (P1)*: Depends on Phase 2 - Must complete first (US2 needs it)
- *User Story 2 (P1)*: Depends on US1 (needs ProductDetail page to place button)
- *User Story 3 (P2)*: Depends on Phase 2 - Independent from US1/US2, can run in parallel

### Suggested Execution Order

1. **Phase 1**: Setup (config + icons)
2. **Phase 2**: Foundational (services + routing)
3. **Phase 3**: US1 (product detail page)
4. **Phase 4**: US2 (WhatsApp button) - depends on US1
5. **Phase 5**: US3 (footer social links) - can be done anytime after Phase 2
6. **Phase 6**: Polish

### Within Each User Story

- Tests before implementation (TDD approach)
- Component logic before styling
- Desktop layout before responsive adjustments
- Core functionality before edge cases
- Verify independently after completing each user story

## Verification Plan

### Automated Tests

Run all tests with:
```bash
cd frontend
npm run test
```

Expected: All existing tests pass + new tests for WhatsAppButton and ProductDetail

### Manual Verification - Product Detail Page

1. Start dev server: `npm run dev`
2. Navigate to `http://localhost:5173/`
3. **Verify ProductCard navigation**:
   - Hover over any ProductCard → cursor changes to pointer
   - Click anywhere on card → navigates to `/product/:id`
   - URL changes correctly with product ID
4. **Verify ProductDetail page**:
   - Page loads without errors
   - Product name displays in large heading
   - Price shows formatted (e.g., $12.000)
   - Description displays in full
   - All images show (or placeholder if broken)
   - Sizes list displays correctly (e.g., "S, M, L, XL")
   - Colors count displays (e.g., "3 colores")
   - Gender and category display
   - Badges show if product is "Destacado" or "Oversize"
5. **Verify "Volver al catálogo" button**:
   - Button visible and styled correctly
   - Click → navigates back to `/`
6. **Verify responsive layout**:
   - Desktop (> 768px): 2-column layout (images left, details right)
   - Mobile (< 768px): 1-column stack (images top, details bottom)
7. **Verify error handling**:
   - Navigate to `/product/invalid-id`
   - See "Producto no encontrado" message
   - "Volver al catálogo" button works

### Manual Verification - WhatsApp Integration

1. From ProductDetail page, locate "Consultar por WhatsApp" button
2. **Verify button styling**:
   - Green background (#25D366)
   - WhatsApp icon visible
   - Text "Consultar por WhatsApp" readable
   - Hover effect works (darker green + shadow)
3. **Verify WhatsApp link**:
   - Right-click button → "Open in new tab"
   - New tab opens to `wa.me/{number}?text=...`
   - Message is pre-filled with:
     - "Hola! Me interesa este producto:"
     - Product name
     - Price
     - Full URL of current page
   - Phone number matches config value
4. **Test on mobile device** (optional):
   - Open on phone
   - Click WhatsApp button
   - Should prompt to open WhatsApp app (if installed)
   - Or open WhatsApp Web (if app not installed)

### Manual Verification - Footer Social Links

1. Navigate to any page (Home, ProductDetail, Login, Admin)
2. Scroll to footer
3. **Verify new "Seguinos" column**:
   - Fourth column visible on desktop
   - Contains Instagram and WhatsApp links
   - Icons display correctly
4. **Verify Instagram link**:
   - Click Instagram link → opens in new tab
   - URL matches config (`https://www.instagram.com/...`)
   - Icon visible and styled
5. **Verify WhatsApp link**:
   - Click WhatsApp link → opens in new tab
   - Opens WhatsApp with configured number
   - No pre-filled message (just opens chat)
6. **Verify responsive footer**:
   - Desktop (> 1024px): 4 columns horizontal
   - Tablet (768px - 1024px): 2x2 grid
   - Mobile (< 768px): 4 columns vertical stack
7. **Verify hover effects**:
   - Hover over social links → visual feedback (color change or underline)

### Configuration Verification

1. Open `src/config/contact.ts`
2. **Verify structure**:
   ```typescript
   export const CONTACT_INFO = {
     whatsapp: {
       phoneNumber: '5491123456789', // Placeholder
       defaultMessage: 'Hola! Me interesa este producto:',
     },
     instagram: {
       url: 'https://www.instagram.com/tu_tienda', // Placeholder
     },
   };
   ```
3. **Test updating config**:
   - Change phone number → restart dev server
   - Click WhatsApp button → verify new number used
   - Change Instagram URL → restart dev server
   - Click Instagram link → verify new URL opens

### Performance Verification

1. **Check bundle size**:
   ```bash
   npm run build
   ```
   - Verify dist/ size still < 500KB gzipped
   - New icons are SVG inline (minimal size impact)

2. **Test page load time**:
   - Navigate to `/product/:id` from catalog
   - Check network tab → should load < 2 seconds
   - Verify no layout shift when images load

3. **Test WhatsApp link generation**:
   - Open browser console
   - Click WhatsApp button
   - Generation should be instant (< 100ms)

## Notes

- **Configuration placeholders**: Contact info uses placeholder values that must be updated before production
- **Mock data approach**: Maintains consistency with frontend-mvp (no backend dependency)
- **Reusable components**: WhatsAppButton can be used in future features (e.g., catalog cards, other pages)
- **Icons as components**: SVG inline approach allows full style control and keeps bundle small
- **Deep linking support**: ProductDetail works with direct URL access (not just navigation from catalog)
- **SEO consideration**: While meta tags are out of scope for MVP, the clean URLs (`/product/:id`) are SEO-friendly
- **Future enhancements**: 
  - Image zoom/lightbox
  - Product image carousel
  - Share buttons for other social networks
  - Related products section
- **Git workflow**: Consider creating feature branch `feature/product-detail-whatsapp` before merging to main
- **Accessibility**: All links have proper aria-labels, external links have rel attributes
- **Mobile-first**: While design is desktop-first for existing features, ProductDetail should work seamlessly on mobile (WhatsApp especially important on mobile)

## Configuration Instructions for User

After implementation, to configure real contact information:

1. Open `frontend/src/config/contact.ts`
2. Update `whatsapp.phoneNumber` with your WhatsApp number:
   - Format: International format without + or spaces
   - Example Argentina: `5491123456789` (country code 54 + area code 911 + number)
   - Example USA: `15551234567` (country code 1 + number)
3. Update `instagram.url` with your Instagram profile:
   - Format: Full URL including https://
   - Example: `https://www.instagram.com/your_store_name`
4. Restart dev server: `npm run dev`
5. Test both links to verify they work correctly

**Important**: Do not commit real phone numbers to public repositories. Consider using environment variables for production deployments.
