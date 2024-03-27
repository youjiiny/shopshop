import { Link } from 'react-router-dom';
import { FaPencilAlt, FaSlackHash } from 'react-icons/fa';
import User from './User';
import { useAuthContext } from 'context/AuthContext';
import { logout } from 'api/auth';

const Navbar = () => {
  const user = useAuthContext();
  return (
    <header className='flex justify-between p-2'>
      <Link to='/' className='flex text-3xl text-primary'>
        <FaSlackHash />
        <h1>Shopshop</h1>
      </Link>
      <nav className='flex items-center gap-4'>
        <Link to='/products'>Products</Link>
        <Link to='/carts'>Carts</Link>
        <Link to='products/new'>
          <FaPencilAlt />
        </Link>
        {!user && <Link to='/signin'>Login</Link>}
        {user && <User user={user!} />}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Navbar;
