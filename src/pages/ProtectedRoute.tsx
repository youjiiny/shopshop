import { useAuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
};

const ProtectedRoute = ({ children, requireAdmin, requireUser }: Props) => {
  const user = useAuthContext();
  if (
    (requireUser && !user) ||
    (requireAdmin && !user?.isAdmin) ||
    (!requireUser && user)
  ) {
    return <Navigate to='/' replace />;
  }
  return children;
};

export default ProtectedRoute;
