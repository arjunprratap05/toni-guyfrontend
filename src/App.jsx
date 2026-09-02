import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/layout/Footer';

// Client Pages
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Booking from './pages/Booking';

// Admin Pages (inside your Admin folder)
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';

// Client Layout: Wraps regular pages with the customer Navbar and Footer
function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-brand-black">
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. PUBLIC CLIENT ROUTES (With Navbar & Footer) */}
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
        </Route>

        {/* 2. ADMIN PORTAL ROUTES (Clean, Fullscreen View) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Redirect "/admin" directly to "/admin/login" */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;