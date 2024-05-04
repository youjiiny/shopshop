import './App.css';
import Navbar from 'components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductCountProvider } from 'context/ProductCountContext';

function App() {
  const location = useLocation();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {location.pathname !== '/signin' && location.pathname !== '/signup' && (
          <Navbar />
        )}
        <ProductCountProvider>
          <Outlet />
          <ToastContainer />
        </ProductCountProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
