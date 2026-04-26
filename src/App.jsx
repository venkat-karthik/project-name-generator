import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Website Pages
import HomePage from './pages/website/HomePage';
import ServicesPage from './pages/website/ServicesPage';
import PortfolioPage from './pages/website/PortfolioPage';
import PricingPage from './pages/website/PricingPage';
import BlogPage from './pages/website/BlogPage';
import AboutPage from './pages/website/AboutPage';
import ContactPage from './pages/website/ContactPage';

// Admin Pages
import AdminLayout from './components/AdminLayout';
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

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ background: '#0a0a0a', minHeight: '100vh' }} />}>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin System */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
