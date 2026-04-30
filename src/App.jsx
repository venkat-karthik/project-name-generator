import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AdminAuthProvider } from './context/AdminAuthContext';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';

// Website Pages
import HomePage from './pages/website/HomePage';
import ServicesPage from './pages/website/ServicesPage';
import SolutionsPage from './pages/website/SolutionsPage';
import PricingPage from './pages/website/PricingPage';
import BlogPage from './pages/website/BlogPage';
import BlogDetailPage from './pages/website/BlogDetailPage';
import AboutPage from './pages/website/AboutPage';
import ContactPage from './pages/website/ContactPage';

// Admin Pages
import AdminLayout from './components/AdminLayout';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import CRM from './pages/admin/CRM';
import Projects from './pages/admin/Projects';
import ProjectDetail from './pages/admin/ProjectDetail';
import Team from './pages/admin/Team';
import Earnings from './pages/admin/Earnings';
import Analytics from './pages/admin/Analytics';
import Disputes from './pages/admin/Disputes';
import Members from './pages/admin/Members';
import AuditLog from './pages/admin/AuditLog';
import BlogAdmin from './pages/admin/BlogAdmin';
import Bookings from './pages/admin/Bookings';
import PortfolioProjects from './pages/admin/PortfolioProjects';

function App() {
  return (
    <AdminAuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}>
          <Routes>
            {/* Public Website - No login required */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Admin Login - No protection */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin System - Protected routes */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="portfolio-projects" element={<PortfolioProjects />} />
              <Route path="crm" element={<CRM />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="team" element={<Team />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="disputes" element={<Disputes />} />
              <Route path="members" element={<Members />} />
              <Route path="audit" element={<AuditLog />} />
              <Route path="blog" element={<BlogAdmin />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AdminAuthProvider>
  );
}

export default App;
