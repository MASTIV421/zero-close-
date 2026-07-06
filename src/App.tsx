import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/login/page'
import AdminLayout from './components/admin/AdminLayout'
import ProtectedRoute from './components/admin/ProtectedRoute'
import Dashboard from './pages/admin/dashboard/page'
import Products from './pages/admin/products/page'
import CreateProduct from './pages/admin/products/create/page'
import EditProduct from './pages/admin/products/[id]/page'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/login', element: <Login /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <Products /> },
      { path: 'products/create', element: <CreateProduct /> },
      { path: 'products/:id', element: <EditProduct /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
