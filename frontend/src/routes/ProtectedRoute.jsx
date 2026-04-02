import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowRoles = [], redirectTo = "/" }) => {
  const { user, loading } = useAuth();

  if (loading) return null; 
  
  if (!user) {
    // Si no tienes permiso, esta línea es la que te manda al inicio
    // NO AUTENTICADO
    return <Navigate to={redirectTo} replace />;
  }
    // SIN PERMISOS
  if(allowRoles.length && !allowRoles.includes(user.role)){
    return <Navigate to="/user/home" replace />;
  }
  // Si tienes permiso, Outlet permite ver las rutas hijas (AdminRoutes/UserRoutes)
  return children
};

export default ProtectedRoute;