import './App.css';
import Navbar from 'components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      {location.pathname !== '/signin' && location.pathname !== '/signup' && (
        <Navbar />
      )}
      <Outlet />
    </AuthProvider>
  );
}

export default App;
