import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { TrustBar } from '../components/TrustBar'
import { Navbar } from '../components/Navbar'
import GlobalErrorBanner from '../components/GlobalErrorBanner'
import Footer from '../components/Footer'
import WhatsAppWidget from '../components/WhatsAppWidget'
import ScrollToTop from '../components/ScrollToTop'

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <TrustBar />
      <Navbar />
      <GlobalErrorBanner />
      <Toaster position="top-right" />
      <main className="pb-[76px] lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppWidget />
    </div>
  )
}

