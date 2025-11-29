import React, { useState } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { FaRegCirclePlay } from "react-icons/fa6";
import bannerImg from "../../assets/banner.png";

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className='bg-[#F2F3F8]'>
      <div className='max-w-screen-2xl container mx-auto py-20 px-5 
        flex flex-col lg:flex-row justify-between items-center'>

        {/* বাম দিক */}
        <div className='lg:w-1/2 text-center lg:text-left'>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>
            Creative Web Design For Businesses
          </h1>
          <p className='text-lg text-gray-600 mb-6'>
            Join thousands of businesses already growing with our solutions.
            Let's help you take your business to the next level!
          </p>
          <div className='flex flex-col md:flex-row justify-center gap-4 lg:justify-start'>
            <button className='bg-blue-600 text-white px-6 py-3 rounded-md
              flex items-center justify-center space-x-2 hover:bg-blue-700 transition'>
              <span>Get Started</span>
              <FiArrowRight className='text-xl' />
            </button>

            <button className='border border-blue-600 text-blue-600 px-6 py-3 rounded-md
              hover:bg-blue-700 hover:text-white transition'>
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        {/* ডান দিক */}
        <div className='lg:w-1/2 mt-10 lg:mt-0 flex justify-end relative '>
          <div className='relative group rounded'>
            <img src={bannerImg} alt="banner" className='rounded-lg shadow-lg ' />
            <button
              onClick={openModal}
              className='absolute inset-0 flex items-center justify-center
              rounded-lg group-hover:opacity-75 transition z-0'>
              <FaRegCirclePlay className='text-white text-5xl hover:text-red-600' />
            </button>
          </div>
        </div>

        {/* Model */}
        {
          showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

              <div className='bg-white p-5 rounded-lg shadow-lg relative max-w-xl w-full'>
                <button onClick={closeModal} className='absolute top-3 right-3 text-white
                text-lg hover:text-white bg-black px-2 rounded-full'>&times;</button>
                <iframe
                  className='w-full aspect-video'
                  width="560" height="315"
                  src="https://www.youtube.com/embed/aCpT67DFe84?si=CUhQSay2nDaX0RLk"
                  title="YouTube video player" frameborder="0" allow="accelerometer;
                  autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;
                   web-share" referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>
              </div>
            </div>
          )
        }





      </div>
    </div>
  );
};

export default HeroSection;
