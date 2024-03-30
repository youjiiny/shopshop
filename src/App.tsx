import './App.css';
import Navbar from 'components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      {location.pathname !== '/signin' && location.pathname !== '/signup' && (
        <Navbar />
      )}
      <Outlet />
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
