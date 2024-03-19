import React from 'react';
import './App.css';
import Navbar from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthContext, AuthProvider } from 'context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
