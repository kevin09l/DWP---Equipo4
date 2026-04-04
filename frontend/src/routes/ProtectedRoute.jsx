import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowRoles = [], redirectTo = "/login" }) => {
  const { user, loading } = useAuth();

  // Mientras el hook de Auth verifica la sesión, mostramos nada o un spinner
  if (loading) return null; 
  
  // Si no hay usuario en el estado global, mandamos al Login
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Si el usuario existe pero su rol no está permitido para esta ruta
  if (allowRoles.length && !allowRoles.includes(user.role)) {
    // Ejemplo: Un 'user' intentando entrar a '/admin' -> lo mandamos a su home
    return <Navigate to="/user/home" replace />;
  }

  // Si pasó todas las validaciones, renderizamos las rutas hijas
  return children;
};

export default ProtectedRoute;