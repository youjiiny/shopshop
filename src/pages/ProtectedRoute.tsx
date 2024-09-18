import { useAuthContext } from 'context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContextType } from 'types/auth';

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
  requireUser?: boolean;
};

const ProtectedRoute = ({ children, requireAdmin, requireUser }: Props) => {
  const { loading, user } = useAuthContext() as AuthContextType;
  const { pathname } = useLocation();
  if (loading) return null;
  const isRedirectAdminPage =
    user && !requireAdmin && user?.isAdmin && pathname !== '/mypage/edit/info';
  if (isRedirectAdminPage) {
    return <Navigate to='/admin/product' replace />;
  }
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
