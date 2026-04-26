import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { TrustBar } from '../components/TrustBar'
import { Navbar } from '../components/Navbar'
import GlobalErrorBanner from '../components/GlobalErrorBanner'
import Footer from '../components/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <TrustBar />
      <Navbar />
      <GlobalErrorBanner />
      <Toaster position="top-right" />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

