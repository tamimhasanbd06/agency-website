import React from 'react'
import HeadingSection from '../../components/HeadingSection'
import { FaApple, FaGoogle, FaAmazon, FaMicrosoft, FaFacebook } from "react-icons/fa";

const Companylogos = () => {

  const logos = [
    { icon: FaApple, name: "Apple" },
    { icon: FaGoogle, name: "Google" },
    { icon: FaAmazon, name: "Amazon" },
    { icon: FaMicrosoft, name: "Microsoft" },
    { icon: FaFacebook, name: "Facebook" }
  ];

  return (
    <div className='bg-[#F2F3F8]'>
      <div className='max-w-screen-2xl container mx-auto py-20 px-5'>
        <HeadingSection
          heading="Companies we've worked with"
          subheading="Our Trusted Partners"
          description="We've partnered with some of the most innovative and leading companies to bring the best solutions to you."
        />

        {/* logo container */}
      <div className='overflow-hidden  p-8'>



          <div className='flex items-center justify-around md:space-x-14 space-x-8
         animate-scroll'>
            {logos.map((logo, index) => (
              <div key={index} className='flex justify-center items-center bg-white
            rounded-full p-6 w-28 h-28 hover:scale-110 transition transform'>
                <logo.icon className='text-blue-600 text-4xl' title={logo.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Companylogos
