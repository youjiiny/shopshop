import { Link, useLocation } from 'react-router-dom';
import { FaPencilAlt, FaSlackHash, FaUser } from 'react-icons/fa';
import { useAuthContext } from 'context/AuthContext';
import { logout } from 'api/auth';
import CartStatus from './CartStatus';
import { AuthContextType } from 'types/auth';

const Navbar = () => {
  const { user } = useAuthContext() as AuthContextType;
  const { pathname } = useLocation();
  if (pathname === '/signin' || pathname === '/signup') {
    return null;
  }

  return (
    <header className='flex justify-between p-2'>
      <Link to='/' className='flex text-base sm:text-3xl text-primary'>
        <FaSlackHash />
        <h1>Shopshop</h1>
      </Link>
      <nav className='flex items-center gap-4'>
        <Link to='/products'>Products</Link>
        {!user?.isAdmin && (
          <Link to='/carts' aria-label='Go to shopping cart'>
            <CartStatus />
          </Link>
        )}
        {user?.isAdmin && (
          <Link to='products/new'>
            <FaPencilAlt />
          </Link>
        )}
        {!user && <Link to='/signin'>Login</Link>}
        {user && (
          <Link to={user?.isAdmin ? '/admin/product' : '/mypage'}>
            <FaUser />
          </Link>
        )}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Navbar;
