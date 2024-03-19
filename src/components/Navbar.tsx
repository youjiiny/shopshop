import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaSlackHash } from 'react-icons/fa';
import { socialLogin, socialLogout } from 'api/auth';
import User from './User';
import { User as FirebaseUser } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState<FirebaseUser | null>();
  const handleLogin = async () => {
    const user = await socialLogin();
    //console.log('uuser', await socialLogin());
    setUser(user);
    //socialLogin().then((user) => setUser(user));
  };
  const handleLogout = () => {
    socialLogout();
    setUser(null);
  };
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
        {!user && <button onClick={handleLogin}>Login</button>}
        {user && <User user={user} />}
        {user && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </header>
  );
};

export default Navbar;
