import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/shop', element: <Shop /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
