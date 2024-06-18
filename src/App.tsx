import './App.css';
import Navbar from 'components/Navbar';
import { Outlet } from 'react-router-dom';
import { AuthProvider } from 'context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductCountProvider } from 'context/ProductCountContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      <AuthProvider>
        <Navbar />
        <ProductCountProvider>
          <Outlet />
          <ToastContainer />
        </ProductCountProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
