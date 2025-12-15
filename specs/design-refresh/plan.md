# Implementation Plan: Professional Design Refresh

*Date*: 2025-12-08  
*Spec*: [spec.md](file:///c:/Users/tomas/webapp-tienda/specs/design-refresh/spec.md)

## Summary

Transform the current e-commerce MVP into a professional, elegant design inspired by the Alameda Squarespace template. Focus exclusively on visual refinement (typography, colors, spacing, styling) without changing any functionality. The goal is to elevate the site's appearance from "functional MVP" to "premium boutique" while maintaining all existing features.

**Technical Approach**: CSS-only changes to existing components, new Google Fonts imports, and updated design tokens in global styles.

## Technical Context

*Language/Version*: TypeScript 5+, React 18, CSS Modules  
*Primary Dependencies*: Vite 7, React Router v6, React Hook Form  
*Storage*: Mock data (in-memory, no backend)  
*Testing*: Vitest + React Testing Library (existing tests should pass unchanged)  
*Target Platform*: Modern browsers (Chrome, Firefox, Safari, Edge)  
*Project Type*: Web (SPA)  
*Performance Goals*: No performance impact (CSS changes only)  
*Constraints*: Zero functionality changes, maintain all existing features  
*Scale/Scope*: 15 components, 7 CSS module files to modify

## Project Structure

### Documentation (this feature)

```
specs/design-refresh/
├── plan.md              # This file 
└── spec.md             # Feature specification
```

### Source Code (repository root)

```
frontend/
├── src/
│   ├── components/
│   │   ├── admin/
│   │   │   └── ProductForm.module.css
│   │   ├── catalog/
│   │   │   ├── ProductCard.module.css
│   │   │   ├── ProductCarousel.module.css
│   │   │   └── Filters.module.css
│   │   ├── common/
│   │   │   ├── Button.module.css
│   │   │   └── Input.module.css
│   │   └── layout/
│   ├── pages/
│   │   └── Home.module.css
│   └── styles/
│       └── global.css
├── index.html           # For Google Fonts import
└── tests/               # Existing tests (no changes)
```

*Structure Decision*: All changes are CSS-only. No new components or TypeScript files. We're modifying existing `.module.css` files and `global.css` to update the visual design system.

---

## Phase 1: Design System Foundation

*Purpose*: Update core design tokens (colors, typography, spacing) that all components inherit

- [ ] T001 Import Google Fonts (Cormorant Garamond, Work Sans, Raleway) in `index.html`
- [ ] T002 Update color palette variables in `global.css` (neutrals, greys, beiges)
- [ ] T003 Update typography variables in `global.css` (font families, weights, sizes)
- [ ] T004 Update spacing scale in `global.css` (12px base, increased scale)
- [ ] T005 Update shadow definitions in `global.css` (ultra-subtle versions)
- [ ] T006 Verify color contrast meets WCAG AA standards

*Checkpoint*: Design tokens updated - components will inherit new styles

---

## Phase 2: User Story 1 - Enhanced Visual Hierarchy (Priority: P1)

*Goal*: Implement clean, elegant layout with clear hierarchy using refined typography and spacing

*Independent Test*: Navigate to homepage and verify generous spacing, elegant typography, and visual clarity

### Implementation for User Story 1

- [ ] T007 [US1] Update `Home.module.css` header styling (simplified background, refined padding)
- [ ] T008 [US1] Update section titles in `Home.module.css` to use serif headings
- [ ] T009 [US1] Increase spacing between sections in `Home.module.css`
- [ ] T010 [US1] Update `.content` margins and padding for better hierarchy
- [ ] T011 [US1] Verify responsive spacing on mobile/tablet/desktop

*Checkpoint*: Homepage has refined visual hierarchy with elegant typography

---

## Phase 3: User Story 2 - Refined Product Presentation (Priority: P1)

*Goal*: Transform product cards into minimalist, elegant presentations

*Independent Test*: View product grid and confirm minimalist design with smooth hover effects

### Implementation for User Story 2

- [ ] T012 [US2] Update `ProductCard.module.css` box-shadow to ultra-subtle
- [ ] T013 [US2] Adjust product image aspect ratio and object-fit
- [ ] T014 [US2] Refine product name styling (Work Sans, capitalization)
- [ ] T015 [US2] Update price color to primary text (remove accent color)
- [ ] T016 [US2] Implement elegant hover effect (subtle zoom + shadow)
- [ ] T017 [US2] Simplify "Destacado" badge styling (minimalist label)
- [ ] T018 [US2] Update `ProductGrid.module.css` gap spacing
- [ ] T019 [US2] Verify grid responsive behavior

*Checkpoint*: Product cards have premium, minimalist appearance

---

## Phase 4: User Story 3 - Premium Color Palette (Priority: P2)

*Goal*: Apply refined color palette throughout interface

*Independent Test*: Inspect elements and confirm neutral color scheme (no saturated colors)

### Implementation for User Story 3

- [ ] T020 [US3] Update button colors in `Button.module.css` (primary → charcoal)
- [ ] T021 [US3] Update filter button colors in `Filters.module.css`
- [ ] T022 [US3] Update carousel background in `ProductCarousel.module.css`
- [ ] T023 [US3] Update admin panel colors in `ProductForm.module.css`
- [ ] T024 [US3] Verify all interactive elements use refined palette
- [ ] T025 [US3] Test color consistency across all pages

*Checkpoint*: Entire site uses sophisticated neutral color scheme

---

## Phase 5: User Story 4 - Sophisticated Typography (Priority: P2)

*Goal*: Apply elegant typography hierarchy across all text elements

*Independent Test*: Read content and confirm elegant fonts with generous line-height

### Implementation for User Story 4

- [ ] T026 [US4] Apply Cormorant Garamond to all headings (h1, h2, h3)
- [ ] T027 [US4] Verify Work Sans applied to body text
- [ ] T028 [US4] Use Raleway for buttons and labels
- [ ] T029 [US4] Adjust font weights (lighter than current)
- [ ] T030 [US4] Increase line-height for better readability (1.7)
- [ ] T031 [US4] Test typography rendering across browsers

*Checkpoint*: Typography is elegant and readable throughout

---

## Phase 6: User Story 5 - Minimalist Navigation (Priority: P3)

*Goal*: Refine navigation and UI controls for minimal, discrete appearance

*Independent Test*: Verify header is clean and filters/buttons are subtle

### Implementation for User Story 5

- [ ] T032 [US5] Simplify header styling in `Home.module.css`
- [ ] T033 [US5] Update filter button styling in `Filters.module.css` (small border-radius)
- [ ] T034 [US5] Refine button styling in `Button.module.css` (minimal borders)
- [ ] T035 [US5] Update input styling in `Input.module.css` (subtle borders)
- [ ] T036 [US5] Simplify carousel controls in `ProductCarousel.module.css`
- [ ] T037 [US5] Remove/reduce decorative elements across components

*Checkpoint*: All navigation and controls are minimalist and discrete

---

## Phase 7: Polish & Consistency

*Purpose*: Final refinements and cross-component consistency

- [ ] T038 Verify consistent spacing across all pages
- [ ] T039 Test all hover states for smoothness (300ms transitions)
- [ ] T040 Verify responsive design on mobile (375px), tablet (768px), desktop (1440px)
- [ ] T041 Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] T042 Side-by-side comparison with Alameda reference
- [ ] T043 Verify all existing functionality still works (no regressions)
- [ ] T044 Run existing test suite (`npm run test`)
- [ ] T045 Visual QA on admin panel pages
- [ ] T046 Final typography polish and adjustments

---

## Dependencies & Execution Order

### Phase Dependencies

- *Design System Foundation (Phase 1)*: No dependencies - must complete FIRST before any visual changes
- *User Stories (Phases 2-6)*: All depend on Phase 1 completion
  - Can be done sequentially in priority order (recommended)
  - Or in parallel if separating concerns (typography vs colors vs spacing)
- *Polish (Phase 7)*: Depends on all user stories being complete

### User Story Dependencies

- *User Story 1 (P1)*: Depends on Phase 1 - Can start immediately after
- *User Story 2 (P1)*: Depends on Phase 1 - Can run parallel with US1 (different files)
- *User Story 3 (P2)*: Depends on Phase 1 - Touches many files, recommended after US1/US2
- *User Story 4 (P2)*: Depends on Phase 1 - Can run parallel with US3
- *User Story 5 (P3)*: Depends on Phase 1 - Recommended last as it touches multiple components

### Within Each User Story

- CSS changes are independent (no build step dependencies)
- Test visual changes in browser after each task
- Commit after completing each user story phase

## Notes

- **Zero functionality changes** - only CSS modifications
- All existing TypeScript/React code remains unchanged
- Existing tests should pass without modifications
- Changes are easily reversible (CSS only)
- Google Fonts loaded from CDN (no build impact)
- Performance impact: negligible (CSS changes + 3 font files ~40KB total)
- Browser compatibility: Modern browsers only (ES6+, CSS Grid, Flexbox)
- Consider creating a git branch for testing before merging
- Visual validation more important than automated tests for this feature
