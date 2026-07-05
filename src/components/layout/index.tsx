import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartDrawer from '../cart/CartDrawer'
import GlassPortalBg from '../ui/GlassPortalBg'
import MouseReflection from '../ui/MouseReflection'
import DarkMouseReflection from '../ui/DarkMouseReflection'
import CustomCursor from '../ui/CustomCursor'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      <style>{`:root { cursor: none !important; }`}</style>
      <GlassPortalBg />
      <MouseReflection />
      <DarkMouseReflection />
      <CustomCursor />
      <Header />
      <CartDrawer />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}