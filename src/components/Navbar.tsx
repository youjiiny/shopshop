import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaSlackHash } from 'react-icons/fa';

const Navbar = () => {
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
        <button>Login</button>
      </nav>
    </header>
  );
};

export default Navbar;
