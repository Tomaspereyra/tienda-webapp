# Feature Specification: Bug Fixes - Product Management & UI Issues

*Created*: December 28, 2025  

## User Scenarios & Testing (mandatory)

### User Story 1 - Multiline Product Descriptions (Priority: P1)

Admin users need to be able to add line breaks in product descriptions to improve readability and formatting. Currently, descriptions appear as a single continuous block of text even when users attempt to add line breaks, resulting in poor user experience.

*Why this priority*: Critical UX issue that directly affects content quality and readability. Product descriptions are key to customer decision-making.

*Independent Test*: Can be fully tested by creating/editing a product with a description containing multiple paragraphs or bullet points, then viewing it on the product detail page to verify line breaks are preserved.

*Acceptance Scenarios*:

1. *Given* an admin is creating a product, *When* they type a description with line breaks (pressing Enter), *Then* the line breaks should be visible in the textarea
2. *Given* an admin saves a product with multiline description, *When* viewing the product in the catalog/detail page, *Then* the line breaks should be rendered correctly
3. *Given* a user views a product detail page, *When* reading the description, *Then* paragraphs and line breaks should be clearly separated
4. *Given* an admin edits an existing product with multiline description, *When* the form loads, *Then* the existing line breaks should be preserved in the textarea

---

### User Story 2 - Add Unisex Gender Option (Priority: P1)

Admin users need to add products with "Unisex" gender category to accommodate products that aren't gender-specific. Currently only "Hombre", "Mujer", and "Niño" are available.

*Why this priority*: Business requirement - many products (especially religious-themed t-shirts) are designed to be unisex. This directly affects product catalog completeness.

*Independent Test*: Can be tested by creating a product with Unisex gender, then filtering by Unisex in the catalog to verify it appears correctly.

*Acceptance Scenarios*:

1. *Given* an admin is creating a new product, *When* they view the gender dropdown, *Then* "Unisex" should appear as an option alongside Hombre, Mujer, and Niño
2. *Given* an admin selects "Unisex" gender and saves the product, *When* the product is viewed, *Then* it should display "Unisex" as the gender
3. *Given* a user is on the catalog page, *When* they view the gender filters, *Then* "Unisex" should appear as a filter option
4. *Given* a user selects the "Unisex" filter, *When* the filter is applied, *Then* only products with Unisex gender should be displayed
5. *Given* a user has "Unisex" filter selected, *When* they also select another gender (e.g., "Hombre"), *Then* products from both genders should be displayed

---

### User Story 3 - Fix Mobile Filter Layout (Priority: P2)

Users browsing on mobile devices need the filter section to be properly aligned and not overflow to the right. Currently, the "FILTRAR PRODUCTOS" section appears shifted right on mobile screens, creating a poor mobile experience.

*Why this priority*: Important for mobile UX but doesn't block core functionality. Many users browse on mobile, so this affects user satisfaction.

*Independent Test*: Can be tested by viewing the catalog page on a mobile device or mobile viewport and verifying the filter section is properly contained within the screen width.

*Acceptance Scenarios*:

1. *Given* a user is on mobile device (viewport < 768px), *When* they view the catalog page, *Then* the filter section should be fully contained within the screen width without horizontal scrolling
2. *Given* a mobile user views the filter section, *When* they see the gender filter buttons, *Then* they should be properly wrapped and aligned
3. *Given* a mobile user views the filter section, *When* they scroll down, *Then* no horizontal scrollbar should appear
4. *Given* a mobile user interacts with filters, *When* selecting options, *Then* all interactive elements should be easily tappable without zooming

---

### User Story 4 - Fix Product Limit Issue (Priority: P1)

Admin users need to be able to add more than 20 products without overwriting existing products. Currently, adding the 21st product overwrites one of the previously created products.

*Why this priority*: Critical data integrity issue that causes data loss. This blocks scaling the product catalog beyond 20 items.

*Independent Test*: Can be tested by creating 20 products, then creating a 21st product and verifying all 21 products exist without any being overwritten.

*Acceptance Scenarios*:

1. *Given* there are 20 products in the database, *When* an admin creates the 21st product, *Then* all 21 products should exist in the catalog
2. *Given* there are 20 products in the database, *When* an admin creates the 21st product, *Then* no existing product should be modified or deleted
3. *Given* the system has the product limit bug, *When* investigating the root cause, *Then* it should be identified whether this is a frontend, backend, or database issue
4. *Given* the product limit is fixed, *When* adding products beyond 21 (e.g., 30, 50, 100), *Then* all products should be created without issues
5. *Given* an admin is on the admin products list, *When* more than 20 products exist, *Then* pagination or scrolling should work correctly to display all products

---

### Edge Cases

- What happens when a description has very long paragraphs with many line breaks?
  - System should preserve all line breaks and render them correctly
- How does the system handle descriptions with only white space or empty lines?
  - Should preserve the spacing but trim excessive leading/trailing whitespace
- What happens when filtering by multiple genders including Unisex?
  - Should show products matching ANY of the selected gender filters (OR logic)
- How does the mobile filter layout behave on tablets (medium screens)?
  - Should use appropriate breakpoints to ensure good UX on all screen sizes
- What happens when trying to create the 100th, 200th, or 1000th product?
  - System should handle any reasonable number of products without data loss
- What if the database or storage has hard limits on product count?
  - Need to identify and document any actual technical limits

## Requirements (mandatory)

### Functional Requirements

#### Bug Fix 1: Multiline Descriptions

- *FR-001*: System MUST preserve line breaks entered in product description textarea
- *FR-002*: System MUST render line breaks correctly when displaying product descriptions on detail pages
- *FR-003*: System MUST render line breaks correctly when displaying product descriptions in catalog cards (if shown)
- *FR-004*: System MUST support common text formatting (e.g., \n for new lines, or HTML <br> tags, or preserve whitespace)
- *FR-005*: System MUST display multiline descriptions properly on both desktop and mobile devices

#### Bug Fix 2: Unisex Gender

- *FR-006*: System MUST include "Unisex" as a gender option in the product creation/edit form
- *FR-007*: System MUST include "Unisex" as a filter option in the public catalog
- *FR-008*: System MUST store "Unisex" gender value in the database alongside existing genders
- *FR-009*: System MUST maintain existing gender filter behavior (multi-select with OR logic)
- *FR-010*: System MUST display "Unisex" label correctly in Spanish UI

#### Bug Fix 3: Mobile Filter Layout

- *FR-011*: System MUST render filter section within viewport bounds on mobile devices (width < 768px)
- *FR-012*: System MUST prevent horizontal overflow/scrolling caused by filter section on mobile
- *FR-013*: System MUST maintain filter functionality and interactivity on mobile devices
- *FR-014*: System MUST use appropriate responsive spacing and padding for mobile filters
- *FR-015*: System MUST ensure filter buttons/checkboxes are touch-friendly (min 44x44px tap targets)

#### Bug Fix 4: Product Limit

- *FR-016*: System MUST allow creation of unlimited products (or a reasonable high limit like 10,000+)
- *FR-017*: System MUST NOT overwrite existing products when adding new products
- *FR-018*: System MUST generate unique IDs for each product (investigate if ID collision is the cause)
- *FR-019*: System MUST properly handle product list pagination or infinite scroll when products exceed 20
- *FR-020*: System MUST maintain data integrity across all CRUD operations regardless of product count

### Key Entities

- *Product*: 
  - `description` field should support multiline text (storing \n characters or HTML)
  - `gender` field should accept new value "Unisex" in addition to existing values
  - `id` field must be truly unique and not limited to 1-20 range

- *Gender Filter*:
  - Should include "Unisex" option
  - Should support multi-select behavior

### Non-Functional Requirements

- *NFR-001*: Line break rendering should not introduce XSS vulnerabilities (properly escape/sanitize)
- *NFR-002*: Mobile filter fix should work on all screen sizes from 320px to 768px width
- *NFR-003*: Product limit fix should not degrade performance when displaying 100+ products
- *NFR-004*: All changes should be backwards compatible with existing product data

## Success Criteria (mandatory)

### Measurable Outcomes

- *SC-001*: Admin users can create product descriptions with line breaks that render correctly 100% of the time
- *SC-002*: "Unisex" gender option is available and functional in both admin forms and public filters
- *SC-003*: Mobile users (viewport < 768px) can view and interact with filters without horizontal scrolling
- *SC-004*: Admin users can create 50+ products without any data loss or overwrites
- *SC-005*: Zero XSS vulnerabilities introduced by the multiline description fix
- *SC-006*: All existing products remain unaffected and functional after implementing fixes
- *SC-007*: **Zero database migrations required - all existing product data continues to work without modification**

## Backwards Compatibility & Data Migration (mandatory)

> [!IMPORTANT]
> All bug fixes MUST be 100% backwards compatible with existing product data in the database. No data migrations, conversions, or manual interventions should be required.

### Bug Fix 1: Multiline Descriptions - Backwards Compatibility

**Existing Data:**
- Products already in database have `description` field as plain text (likely without `\n` characters)
- Example: `"Este es un producto religioso de alta calidad"`

**Compatibility Strategy:**
- ✅ Existing descriptions will continue to display correctly (single line)
- ✅ Only NEW descriptions or EDITED descriptions will support line breaks
- ✅ Database schema: NO changes needed (description is already stored as TEXT/STRING)
- ✅ Rendering logic: Use CSS `white-space: pre-wrap` or convert `\n` to `<br>` - both handle single-line text correctly

**Validation:**
- Load a product with existing single-line description → Should display exactly as before
- Edit that same product without changing description → Should save without issues
- Edit that same product and add line breaks → Should save and display with line breaks

---

### Bug Fix 2: Unisex Gender - Backwards Compatibility

**Existing Data:**
- Products have `gender` field with values: `"Hombre"`, `"Mujer"`, or `"Niño"`
- Example: 20 products distributed among these three genders

**Compatibility Strategy:**
- ✅ Existing gender values remain valid and unchanged
- ✅ Database schema: NO changes needed if gender is stored as VARCHAR/STRING
- ⚠️ If gender is stored as ENUM: Need to ADD "Unisex" to enum (non-breaking addition)
- ✅ Frontend: Existing gender filters continue to work
- ✅ Backend validation: Update to accept 4 values instead of 3

**Validation:**
- Load existing products with "Hombre", "Mujer", "Niño" → Should display and filter correctly
- Filter by existing genders → Should return correct products
- Edit existing product → Should show current gender selected in dropdown (with new Unisex option visible but not selected)

---

### Bug Fix 3: Mobile Filter Layout - Backwards Compatibility

**Existing Data:**
- No database interaction - pure CSS/UI fix

**Compatibility Strategy:**
- ✅ No data changes whatsoever
- ✅ Only CSS/component changes
- ✅ Desktop experience remains unchanged

**Validation:**
- Desktop users → No visual or functional changes
- Existing filters and functionality → Work identically

---

### Bug Fix 4: Product Limit - Backwards Compatibility

**Existing Data:**
- Currently ~20 products in database
- Each has a unique ID (need to investigate ID generation mechanism)

**Compatibility Strategy:**
- ✅ Existing 20 products MUST remain with same IDs
- ✅ NO changes to existing product records
- ✅ Only fix the ID generation/storage mechanism to allow 21+
- ⚠️ **Critical**: Investigate if issue is with:
  - Fixed-size array in frontend state (just increase limit)
  - Auto-increment ID with max constraint (remove constraint)
  - Manual ID assignment collision (fix generation logic)
  - Pagination bug showing only 20 (fix query/pagination)

**Validation:**
- Query all existing products → All 20 should still exist with original IDs
- Create product 21 → Should NOT modify any of the existing 20
- Delete product 21 → Should leave existing 20 intact
- Create products 22, 23, 24 → Should all be added without affecting previous products

---

### Database Schema Changes Summary

**Required Changes:**
- ✅ **None for description** - already supports text storage
- ⚠️ **Possibly for gender** - IF stored as ENUM, add "Unisex" to enum values (safe addition)
- ✅ **None for mobile UI** - pure frontend
- ⚠️ **Investigate for product limit** - may need to remove constraints or fix ID generation

**Migration Script:**
- ❌ NOT REQUIRED - All changes are additive or fix-only
- ✅ Existing data works as-is with all bug fixes

### Testing Strategy for Backwards Compatibility

Before deploying bug fixes:

1. **Backup existing database** - Safety first
2. **Test with existing data**:
   - Load all 20 existing products in admin panel → Should display correctly
   - Load existing products in public catalog → Should display correctly
   - Filter by existing genders → Should work
   - View existing product details → Descriptions should display (even if single-line)
3. **Test mixed scenario**:
   - Edit 1 existing product to add line breaks in description → Should save and render
   - Create 1 new product with Unisex gender → Should not affect existing 20
   - Create product #21 → Should not overwrite any existing product
4. **Rollback plan**:
   - If issues found, restore database backup
   - Changes are isolated to specific components, can rollback code without data loss

## Technical Context (for implementation reference only)

### Investigation Needed

**Bug 1 - Multiline Descriptions:**
- Investigate how `description` field is stored in database (check if \n is preserved)
- Investigate how `description` is rendered in frontend (check if \n is converted to <br> or uses `white-space: pre-wrap`)
- Check both `ProductDetail.tsx` and `ProductCard.tsx` components

**Bug 2 - Unisex Gender:**
- Update gender type definition (likely in `types/*.ts`)
- Update product form dropdown options
- Update catalog filter component
- Update backend validation to accept "Unisex" value
- Check database schema if gender is enum or string

**Bug 3 - Mobile Filter Layout:**
- Inspect CSS for filter section (likely in `Catalog.module.css` or similar)
- Look for fixed widths, margins, or padding causing overflow
- Test on various mobile widths (320px, 375px, 414px, etc.)
- Based on provided screenshot: the entire "FILTRAR PRODUCTOS" section appears offset to the right

**Bug 4 - Product Limit:**
- Investigate how product IDs are generated (auto-increment? UUID? manual?)
- Check if there's an array with fixed size of 20 in the code
- Check database seeding or initialization code
- Verify backend product creation logic
- Check if pagination/offset logic has bugs

### Likely Files to Change

**Frontend:**
- `src/components/ProductDetail.tsx` - Fix description rendering
- `src/components/admin/ProductForm.tsx` - Add Unisex option, fix textarea
- `src/components/Catalog.tsx` or similar - Fix mobile filter layout
- `src/components/Catalog.module.css` - Mobile responsive fixes
- `src/types/*.ts` - Add Unisex to Gender type
- `src/constants/*.ts` - Add Unisex to gender constants/options

**Backend:**
- Product validation/schema - Accept Unisex gender
- Product creation logic - Investigate ID generation
- Database schema/migration - Check product limit constraints
- Seed data - May need to test with 21+ products

### Current Behavior vs Expected Behavior

**Bug 1:**
- Current: "Line 1 Line 2 Line 3" (all together)
- Expected: "Line 1\nLine 2\nLine 3" (with visual separation)

**Bug 2:**
- Current: Gender options = ["Hombre", "Mujer", "Niño"]
- Expected: Gender options = ["Hombre", "Mujer", "Niño", "Unisex"]

**Bug 3:**
- Current: Filter section overflows right on mobile (see screenshot)
- Expected: Filter section fully contained within screen width

**Bug 4:**
- Current: Product 21 overwrites one of products 1-20
- Expected: Product 21 is added as a new product, all previous products remain

## Out of Scope

- Rich text editor for descriptions (just support plain text with line breaks)
- Markdown support in descriptions
- Multiple filter UI redesign (just fix the layout bug)
- Advanced mobile filter interactions (collapsible, drawer, etc.)
- Increasing product limits beyond fixing the bug (no optimization for 10,000+ products)
- Database performance optimization
- Migration script for existing products (should work with existing data as-is)
