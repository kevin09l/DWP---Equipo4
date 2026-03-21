import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ isAllowed, redirectTo = "/" }) => {
  const { loading } = useAuth();

  if (loading) return null; 
  
  if (!isAllowed) {
    // Si no tienes permiso, esta línea es la que te manda al inicio
    return <Navigate to={redirectTo} replace />;
  }
  // Si tienes permiso, Outlet permite ver las rutas hijas (AdminRoutes/UserRoutes)
  return <Outlet />;
};

export default ProtectedRoute;