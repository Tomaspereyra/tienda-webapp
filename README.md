# Tienda de Remeras - E-commerce Platform

Modern e-commerce platform for custom t-shirt design and sales.

## Features

### 🎨 Custom T-Shirt Designer

Interactive designer that allows customers to create personalized t-shirt designs:

- **Template Selection**: Choose from 5 professional religious-themed designs
  - Virgen María Moderna
  - Cruz Radiante
  - Sagrado Corazón
  - San Miguel Arcángel
  - Virgen de Guadalupe

- **Text Customization**:
  - Add up to 5 custom text elements
  - Drag and position text anywhere on the design
  - Choose from 4 professional fonts (Roboto, Montserrat, Playfair Display, Dancing Script)
  - Adjust font size (20px - 120px)
  - Select from 8 preset colors or use custom color picker for unlimited options
  - Real-time preview on canvas

- **T-Shirt Options**:
  - 6 color options: White, Black, Navy, Gray, Green, Red
  - Live mockup preview

- **Save & Export**:
  - Auto-save with 2-second debounce
  - Manual save with "Guardar Borrador" button
  - Restore saved designs on page load
  - Export design details via WhatsApp for ordering

### 🛍️ Public Catalog

- Browse t-shirt products with filtering and pagination
- Product detail pages with WhatsApp inquiry button
- Responsive design for all devices

### 🔐 Admin Panel

- JWT-based authentication
- CRUD operations for products
- Secure admin-only routes

## Tech Stack

### Frontend
- **React 18** with **TypeScript**
- **Vite** for blazing-fast development
- **React Router v6** for routing
- **fabric.js** for canvas manipulation in designer
- **CSS Modules** for styling

### Backend
- **Node.js** with **Express**
- **PostgreSQL** database
- **JWT** authentication
- **Multer** for image uploads

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 14+

### Installation

```bash
# Clone repository
git clone <repository-url>
cd webapp-tienda

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### Environment Setup

Create `.env` files in both frontend and backend directories:

**Frontend `.env`:**
```
VITE_API_URL=http://localhost:3000
```

**Backend`.env`:**
```
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/tienda_db
JWT_SECRET=your-secret-key
```

### Run Development Servers

```bash
# Frontend (from /frontend)
npm run dev

# Backend (from /backend)
npm run dev
```

Frontend: http://localhost:5173  
Backend API: http://localhost:3000

## Project Structure

```
webapp-tienda/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── designer/          # Designer components
│   │   │   │   ├── CanvasEditor.tsx
│   │   │   │   ├── TextControls.tsx
│   │   │   │   ├── ColorPicker.tsx
│   │   │   │   ├── TemplateGallery.tsx
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── DesignCustomizer.tsx  # Main designer page
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── DesignContext.tsx     # Designer state management
│   │   ├── data/
│   │   │   ├── designTemplates.ts
│   │   │   ├── tshirtColors.ts
│   │   │   └── fonts.ts
│   │   └── utils/
│   │       ├── canvasHelpers.ts
│   │       ├── localStorage.ts
│   │       └── ...
│   └── public/
│       └── templates/                 # Design template images
└── backend/
    ├── src/
    │   ├── routes/
    │   ├── controllers/
    │   ├── models/
    │   └── middleware/
    └── ...
```

## Key Features Documentation

### Custom Designer Workflow

1. **Select Template**: Browse and choose from pre-designed templates
2. **Customize**: Add and edit text with full formatting control
3. **Position**: Drag text elements to desired locations
4. **Preview**: See real-time updates on t-shirt mockup
5. **Choose Color**: Select t-shirt color from 6 options
6. **Save**: Auto-save or manual save draft for later
7. **Order**: Export design via WhatsApp to complete purchase

### Designer Keyboard Interactions

- Double-click text on canvas to edit
- Drag text to reposition
- Click outside to deselect

### LocalStorage Persistence

Designs are automatically saved to browser localStorage:
- Auto-save every 2 seconds during editing
- Restore modal on page reload
- Draft cleared after WhatsApp export

## Development

### Running Tests

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

### Building for Production

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## Specifications

Detailed specifications available in `/specs/`:
- [Custom T-Shirt Designer Spec](specs/custom-tshirt-designer/spec.md)
- [Implementation Plan](specs/custom-tshirt-designer/plan.md)

## License

This project is proprietary software.

## Contact

For design inquiries via WhatsApp, use the designer's export feature.
