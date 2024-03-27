import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AllProducts from 'pages/AllProducts';
import ProductDetail from 'pages/ProductDetail';
import NewProduct from 'pages/NewProduct';
import MyCart from 'pages/MyCart';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import SignIn from 'pages/SignIn';
import SignUp from 'pages/SignUp';
import ProtectedRoute from 'pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      {
        path: '/products',
        element: <AllProducts />,
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '/products/new',
        element: (
          <ProtectedRoute requireUser requireAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: '/carts',
        element: (
          <ProtectedRoute requireUser>
            <MyCart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/signin',
        element: (
          <ProtectedRoute requireUser={false}>
            <SignIn />
          </ProtectedRoute>
        ),
      },
      {
        path: '/signup',
        element: (
          <ProtectedRoute requireUser={false}>
            <SignUp />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

reportWebVitals();
