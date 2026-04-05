import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowRoles = [], redirectTo = "/login" }) => {
  const { user, loading } = useAuth();


  if (loading) return null; 
  

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }


  if (allowRoles.length && !allowRoles.includes(user.role)) {

    return <Navigate to="/user/home" replace />;
  }


  return children;
};

export default ProtectedRoute;