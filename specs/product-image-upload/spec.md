# Feature Specification: Product Image Upload Enhancement

*Created*: December 11, 2025  

## User Scenarios & Testing (mandatory)

### User Story 1 - Upload Product Images via File Picker (Priority: P1)

Admin users need to upload product images directly from their device instead of manually copying/pasting image URLs. This improves efficiency and reduces errors.

*Why this priority*: Core functionality change that directly affects the product creation workflow. Currently blocks users who don't have images already hosted.

*Independent Test*: Can be fully tested by creating a new product with uploaded images and verifying the images appear correctly in the catalog.

*Acceptance Scenarios*:

1. *Given* an admin is on the Create Product page, *When* they click "Upload Image" button, *Then* a file picker dialog opens
2. *Given* an admin selects a valid image file (JPG, PNG, GIF, WebP), *When* upload completes, *Then* a preview of the image appears in the form
3. *Given* an admin has uploaded image(s), *When* they submit the form, *Then* the product is created with the uploaded image URLs
4. *Given* an admin uploads an image, *When* the upload is in progress, *Then* they see a progress indicator
5. *Given* an admin uploaded images are displayed, *When* they want to remove one, *Then* they can click a remove button to delete it

---

### User Story 2 - Multiple Image Upload (Priority: P1)

Admin users need to upload multiple product images at once (up to 4 images as currently supported) to show different angles or variations.

*Why this priority*: Products often require multiple images. This is part of the core upload feature.

*Independent Test*: Can be tested by uploading 4 different images for one product and verifying all appear in the catalog carousel.

*Acceptance Scenarios*:

1. *Given* an admin is uploading images, *When* they select multiple files at once, *Then* all files upload sequentially
2. *Given* an admin has uploaded 4 images (max), *When* they try to upload another, *Then* they see a message indicating the limit is reached
3. *Given* an admin has uploaded multiple images, *When* viewing the form, *Then* they see previews of all uploaded images
4. *Given* an admin has multiple images uploaded, *When* they remove one, *Then* they should be able to upload another image

---

### User Story 3 - Upload Error Handling (Priority: P2)

Admin users need clear feedback when image uploads fail (file too large, wrong format, network errors).

*Why this priority*: Important for UX but not critical for MVP. Can be enhanced after basic upload works.

*Independent Test*: Can be tested by attempting to upload invalid files and verifying appropriate error messages.

*Acceptance Scenarios*:

1. *Given* an admin selects a file larger than 5MB, *When* attempting to upload, *Then* they see an error message "File size exceeds 5MB limit"
2. *Given* an admin selects a non-image file (e.g., PDF), *When* attempting to upload, *Then* they see an error message "Invalid file type. Only JPG, PNG, GIF, and WebP are allowed"
3. *Given* an upload fails due to network error, *When* the error occurs, *Then* the user sees a retry button
4. *Given* an upload is in progress, *When* the user navigates away, *Then* they see a confirmation dialog warning about unsaved changes

---

### User Story 4 - Edit Product Image Management (Priority: P2)

Admin users need to manage images when editing existing products (view current images, add new ones, remove old ones).

*Why this priority*: Important for product maintenance but can be implemented after creation flow works.

*Independent Test*: Can be tested by editing an existing product, adding new images, removing existing ones, and verifying changes persist.

*Acceptance Scenarios*:

1. *Given* an admin is editing a product with existing images, *When* the form loads, *Then* they see thumbnails of current images
2. *Given* an admin is editing a product, *When* they upload a new image, *Then* it's added to the existing images (up to max of 4 total)
3. *Given* an admin wants to remove an existing image, *When* they click remove on that image, *Then* it's marked for deletion and removed on save
4. *Given* an admin removes all images, *When* they submit the form, *Then* they see a validation error "At least one image is required"

---

### User Story 5 - Orphaned Images Cleanup (Priority: P3)

Admin users need to identify and clean up uploaded images that are not associated with any product (orphaned images from cancelled uploads or deleted products) to free up storage space.

*Why this priority*: Important for storage management and system maintenance, but not critical for core functionality. Can be implemented after basic upload works.

*Independent Test*: Can be tested by uploading images without creating a product, then accessing the orphaned images section to view and delete them.

*Acceptance Scenarios*:

1. *Given* an admin navigates to Admin Dashboard, *When* they click "Clean Orphaned Images" or similar option, *Then* they see a list of only orphaned images
2. *Given* an admin views an orphaned image, *When* they click "Delete", *Then* they see a confirmation dialog
3. *Given* an admin confirms deletion, *When* the deletion completes, *Then* the image file is removed from the server and the list updates
4. *Given* there are many orphaned images, *When* admin selects multiple images, *Then* they can bulk delete selected images
5. *Given* there are no orphaned images, *When* admin accesses the section, *Then* they see a message "No orphaned images found"

---

### Edge Cases

- What happens when the user uploads the same image multiple times?
  - System should allow it but frontend could show a warning
- How does the system handle very large image files (close to 5MB)?
  - Validation happens client-side first, then server confirms
- What happens if upload succeeds but product creation fails?
  - ✅ Images become orphaned and can be cleaned up via the Orphaned Images Management section
- What happens if user closes browser during upload?
  - Partial uploads are lost, user restarts process
- How does system handle slow network connections?
  - Progress indicator shows upload status, timeout after 30 seconds

## Requirements (mandatory)

### Functional Requirements

- *FR-001*: System MUST provide a file upload button/area for product images instead of URL text inputs
- *FR-002*: System MUST validate image files client-side before upload (type and size)
- *FR-003*: System MUST upload images to backend via POST /api/admin/upload endpoint
- *FR-004*: System MUST display upload progress percentage during file upload
- *FR-005*: System MUST show image previews immediately after successful upload
- *FR-006*: System MUST allow users to remove uploaded images before submitting the form
- *FR-007*: System MUST support uploading multiple images (up to 4)
- *FR-008*: System MUST accept only JPG, PNG, GIF, and WebP formats
- *FR-009*: System MUST enforce a maximum file size of 5MB per image
- *FR-010*: System MUST display clear error messages for failed uploads
- *FR-011*: System MUST preserve the existing product creation flow (images array stored as URLs)
- *FR-012*: System MUST work in both Create Product and Edit Product forms
- *FR-013*: System MUST provide an admin interface to view orphaned images
- *FR-014*: System MUST allow admins to delete orphaned images from the server
- *FR-015*: System MUST support bulk deletion of multiple orphaned images at once
- *FR-016*: System MUST show message when no orphaned images exist

### Key Entities

- *ProductForm*: No changes to data structure - still accepts array of image URL strings
- *UploadedImage*: Temporary UI state holding File object, upload progress, preview URL, and final backend URL
- *ImageUploadResponse*: Response from backend containing { url: string, filename: string, size: number }

### Non-Functional Requirements

- *NFR-001*: Image uploads should complete in under 10 seconds on average connection
- *NFR-002*: UI should remain responsive during image uploads
- *NFR-003*: Image previews should be generated client-side for instant feedback

## Success Criteria (mandatory)

### Measurable Outcomes

- *SC-001*: Admin users can upload product images without needing to host them externally first
- *SC-002*: Image upload completes successfully 99% of the time for valid files
- *SC-003*: Users receive feedback (progress/error) within 1 second of any upload action
- *SC-004*: Zero breaking changes to existing product creation API or data model
- *SC-005*: Upload UI works on both Create Product and Edit Product forms

## Technical Context (for implementation reference only)

### Existing Infrastructure

**Backend:**
- ✅ Upload endpoint exists: `POST /api/admin/upload`
- ✅ Accepts `multipart/form-data` with `file` field
- ✅ Returns: `{ url: string, filename: string, size: number }`
- ✅ Max size: 5MB
- ✅ Allowed types: JPG, PNG, GIF, WebP
- ✅ Uploaded files stored in `/uploads` directory

**Frontend:**
- ✅ Upload helper exists: `uploadImage(file, onProgress)` in `api/uploads.js`
- ✅ Validation exists: `validateImageFile(file)` in `api/uploads.js`
- ✅ Product creation endpoint: `productsService.create(productData)`
- ✅ Product edit endpoint: `productsService.update(id, productData)`

### Files That Will Change

**Frontend:**
- `src/components/admin/ProductForm.tsx` - Replace URL inputs with file upload UI
- `src/components/admin/ProductForm.module.css` - Styles for upload component
- `src/pages/AdminOrphanedImages.tsx` - NEW: Page for cleaning orphaned images
- `src/components/admin/OrphanedImagesList.tsx` - NEW: Component for orphaned images grid
- `src/components/admin/ImageUploadField.tsx` - NEW: Reusable file upload component

**Backend:**
- `GET /api/admin/images/orphaned` - NEW: List only orphaned images (filename, size, uploaded date)
- `DELETE /api/admin/images/{filename}` - NEW: Delete an image file from uploads directory
- ❌ Upload endpoint `/api/admin/upload` - No changes needed (already works)

### Current Flow (URL Input)

```
Admin enters URL → ProductForm stores URL → Submit → Create product with URL
```

### New Flow (File Upload)

```
Admin selects file → Validate client-side → Upload to /api/admin/upload → 
Get URL from response → Store URL in form state → Submit → Create product with URL
```

The product creation payload remains identical - just URLs, but now they come from uploads instead of manual input.

## Out of Scope

- Drag-and-drop file upload (can be added later as enhancement)
- Image cropping/editing (uses uploaded images as-is)
- Bulk upload of multiple products at once
- Image optimization/compression (backend handles this if needed)
- Direct upload to CDN/cloud storage (uses local backend uploads)
- Automatic deletion of orphaned images (manual deletion via admin UI)
- Image usage analytics or statistics
