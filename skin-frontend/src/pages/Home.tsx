import Hero from '../components/Home/Hero'
import BrandsSection from '../components/Home/brand'
import BestSellers from '../components/Home/BestSellers'
import SkinTypes from '../components/Home/SkinTypes'
import WhyChooseUs from '../components/Home/WhyChooseUs'
import Testimonials from '../components/Home/Testimonials'
import HowItWorks from '../components/Home/HowItWorks'
import CTA from '../components/Home/CTA'
import Seo from '../components/Seo'

export default function Home() {
  return (
    <div>
      <Seo
        title="Home"
        description="Shop authentic imported skincare from North America — CeraVe, Cetaphil, and The Ordinary in Pakistan."
      />
      <Hero />
      <BrandsSection />
      <BestSellers />
      <SkinTypes />
      <WhyChooseUs />
      <Testimonials />
      <HowItWorks />
      <CTA />
    </div>
  )
}
