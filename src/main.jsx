import { StrictMode } from 'react';
import 'sweetalert2/dist/sweetalert2.js'
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

// Components
import App from './App.jsx';
import './index.css';

// Pages
import Home from './pages/home/Home.jsx';
import Errorpage from './components/Errorpage.jsx';
import Pricing from './pages/home/Pricing.jsx';
import Services from './pages/home/Services.jsx';
import Blogs from './pages/home/blogs/Blogs.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

// Auth / Private Route
import AuthProvider from './context/AuthContext.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';

// Dashboard (Import this!)
import Dashboard from './pages/dashboard/Dashboard.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Main Layout */}
          <Route path="/" element={<App />}>

            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="services" element={<Services />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="*" element={<Errorpage />} />

          </Route>

          {/* Auth Pages */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Dashboard (Protected Route) */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
