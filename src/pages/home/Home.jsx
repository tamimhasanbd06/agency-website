import React from 'react'
import HeroSection from './HeroSection'
import ToolsSection from './ToolsSection'
import Companylogos from './Companylogos'
import Services from './Services'
import Testimonials from './Testimonials'
import BLogks from './blogs/Blogs'
import TeamSection from './TeamSection'
import Pricing from './Pricing'
import FAQs from './FAQs'
import Newsletter from './Newsletter'


const Home = () => {
  return (
    <>
      <HeroSection />
      <ToolsSection />
      <Companylogos />
      <Services />
      <Testimonials />
      <BLogks />
      <TeamSection/>
      <Pricing/>
      <FAQs/>
      <Newsletter/>
    </>
  )
}

export default Home
