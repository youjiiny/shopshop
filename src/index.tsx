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
import CheckOut from 'pages/CheckOut';
import MyPage from 'pages/MyPage';
import MyPageLayout from 'pages/MyPageLayout';
import MyPageSetting from 'pages/MyPageSetting';
import OrderConfirm from 'pages/OrderConfirm';
import OrderHistory from 'pages/OrderHistory';
import OrderDetail from 'pages/OrderDetail';
import CancelOrderHistory from 'pages/CancelOrderHistory';
import ProductManagement from 'components/ProductManagement';
import EditProduct from 'pages/EditProduct';

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
      {
        path: '/checkout',
        element: (
          <ProtectedRoute requireUser>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: '/mypage',
        element: (
          <ProtectedRoute requireUser>
            <MyPageLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute requireUser>
                <MyPage />
              </ProtectedRoute>
            ),
          },
          {
            path: 'edit/info',
            element: (
              <ProtectedRoute requireUser>
                <MyPageSetting />
              </ProtectedRoute>
            ),
          },
          {
            path: 'orders',
            element: (
              <ProtectedRoute requireUser>
                <OrderHistory />
              </ProtectedRoute>
            ),
          },
          {
            path: 'cancel-orders',
            element: (
              <ProtectedRoute requireUser>
                <CancelOrderHistory />
              </ProtectedRoute>
            ),
          },
          {
            path: 'order/:id',
            element: (
              <ProtectedRoute requireUser>
                <OrderDetail />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/order/:id',
        element: (
          <ProtectedRoute requireUser>
            <OrderConfirm />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/product',
        element: (
          <ProtectedRoute requireUser requireAdmin>
            <ProductManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/product/edit/:id',
        element: (
          <ProtectedRoute requireUser requireAdmin>
            <EditProduct />
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
