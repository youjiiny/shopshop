import { useAuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';
import { AuthContextType } from 'types/auth';

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
};

const ProtectedRoute = ({ children, requireAdmin, requireUser }: Props) => {
  const { loading, user } = useAuthContext() as AuthContextType;
  if (loading) return null;

  if (
    (requireUser && !user) ||
    (requireAdmin && !user?.isAdmin) ||
    (!requireUser && user)
  ) {
    return <Navigate to='/' replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
