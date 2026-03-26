import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/errors/NotFound";
import ServerError from "../pages/errors/ServerError";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
// Componente Protector
const ProtectedRoute = ({ isAllowed, children }) => {
  if (!isAllowed) {
    // Si no tiene permiso, lo mandamos a la raíz (Login)
    return <Navigate to="/" replace />;
  }
  return children;
};

export default function AppRoutes() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Función para leer el usuario de forma segura
  const getStoredUser = () => {
    try {
      const stored = localStorage.getItem("user");
      if (stored && stored.startsWith('{')) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error en storage", error);
    }
    return null;
  };

  // Cada vez que la ruta cambie, verificamos el usuario
  // Esto soluciona el problema de "no me deja entrar" tras el login
  useEffect(() => {
    const currentUser = getStoredUser();
    setUser(currentUser);
    setLoading(false);
  }, [location]);

  if (loading) return null; // O un Loader para la Tarea 4

  const userRole = user?.rol;

  return (
    <Routes>
      {/* RUTA RAÍZ: Maneja la lógica de redirección inicial */}
      <Route 
        path="/" 
        element={
          user ? (
            userRole === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/home" replace />
          ) : (
            <Login />
          )
        } 
      />

      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
      <Route path="/resetpassword" element={<ResetPassword/>} />
      {/* Tarea 2: Seguridad - Rutas Protegidas */}
      {/* El usuario común o admin pueden ver rutas de user */}
      <Route 
        path="/user/*" 
        element={
          <ProtectedRoute isAllowed={!!user && (userRole === 'user' || userRole === 'admin')}>
            <UserRoutes />
          </ProtectedRoute>
        } 
      />

      {/* SOLO el admin puede ver rutas de admin */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute isAllowed={!!user && userRole === 'admin'}>
            <AdminRoutes />
          </ProtectedRoute>
        } 
      />

      <Route path="/500" element={<ServerError/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}