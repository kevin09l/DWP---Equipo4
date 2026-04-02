import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserRoutes from "./UserRoutes";
import AdminRoutes from "./AdminRoutes";
import NotFound from "../pages/errors/NotFound";
import ServerError from "../pages/errors/ServerError";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import ProtectedRoute from "./ProtectedRoute";
import Loader from "../components/Loader";

export default function AppRoutes() {
 const {user, loading} = useAuth();

  if (loading) return <Loader/>; 

  const role = user?.role;

  return (
    <Routes>
      {/* RUTA RAÍZ: Maneja la lógica de redirección inicial */}
      <Route 
        path="/" 
        element={
          user ? (
            role === 'admin' ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/home" replace />
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
          <ProtectedRoute allowRoles={["user","admin"]}>
            <UserRoutes />
          </ProtectedRoute>
        } 
      />

      {/* SOLO el admin puede ver rutas de admin */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute allowRoles={["admin"]}>
            <AdminRoutes />
          </ProtectedRoute>
        } 
      />

      <Route path="/500" element={<ServerError/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}