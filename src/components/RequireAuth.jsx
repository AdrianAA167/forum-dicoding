import { Navigate } from 'react-router-dom';
import { useAuthUser } from '../hooks/useAuthUser';

function RequireAuth({ children }) {
  const authUser = useAuthUser();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default RequireAuth;
