import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@context/AuthContext';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { ProtectedRoute } from '@components/common/ProtectedRoute';
import { Toast } from '@components/common/Toast';
import { Home } from '@pages/Home';
import { ProductDetail } from '@pages/ProductDetail';
import { DesignCustomizer } from '@pages/DesignCustomizer';
import { Login } from '@pages/Login';
import { AdminDashboard } from '@pages/AdminDashboard';
import { CreateProduct } from '@pages/CreateProduct';
import { EditProduct } from '@pages/EditProduct';
import { AdminOrphanedImages } from '@pages/AdminOrphanedImages';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <Toast />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/designer" element={<DesignCustomizer />} />
            <Route path="/login" element={<Login />} />

            {/* Protected admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/new"
              element={
                <ProtectedRoute>
                  <CreateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/:id/edit"
              element={
                <ProtectedRoute>
                  <EditProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/images/orphaned"
              element={
                <ProtectedRoute>
                  <AdminOrphanedImages />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
