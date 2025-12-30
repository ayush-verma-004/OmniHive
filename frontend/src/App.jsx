import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load layouts and pages
const PublicLayout = lazy(() => import('./layouts/PublicLayout'));
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

const Home = lazy(() => import('./pages/Home'));
const Ebooks = lazy(() => import('./pages/Ebooks'));
const Food = lazy(() => import('./pages/Food'));
const Clothes = lazy(() => import('./pages/Clothes'));
const Cart = lazy(() => import('./pages/Cart'));

const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ManageEbooks = lazy(() => import('./pages/admin/ManageEbooks'));
const ManageFood = lazy(() => import('./pages/admin/ManageFood'));
const ManageClothes = lazy(() => import('./pages/admin/ManageClothes'));
const Orders = lazy(() => import('./pages/admin/Orders'));

// Loading component
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-bg relative overflow-hidden">
    {/* Decorative Blobs */}
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-blob"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>

    <div className="relative flex flex-col items-center">
      <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p className="mt-6 text-text-muted font-display font-bold tracking-widest uppercase text-xs animate-pulse">OmniHive</p>
    </div>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/ebooks" element={<Ebooks />} />
          <Route path="/food" element={<Food />} />
          <Route path="/clothes" element={<Clothes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="ebooks" element={<ManageEbooks />} />
          <Route path="food" element={<ManageFood />} />
          <Route path="clothes" element={<ManageClothes />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-24"
          >
            <h1 className="text-6xl font-black text-primary mb-4">404</h1>
            <p className="text-xl text-text-muted font-bold">Lost in the Hive? This page doesn't exist.</p>
            <button onClick={() => window.history.back()} className="btn-primary mt-8">Go Back</button>
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <AnimatedRoutes />
      </Suspense>
      <ToastContainer
        position="bottom-right"
        theme="light"
        toastClassName={() => "relative flex p-4 min-h-10 rounded-2xl justify-between overflow-hidden cursor-pointer bg-white border border-border shadow-premium mb-4"}
        bodyClassName={() => "text-sm font-bold text-text flex items-center p-0"}
        hideProgressBar={true}
        closeButton={false}
      />
    </Router>
  );
}

export default App;
