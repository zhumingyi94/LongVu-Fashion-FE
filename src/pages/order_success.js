import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import { useRouter } from 'next/router';

const OrderSuccess = () => {
    const router = useRouter();

  const handleClick = () => {
    router.push("/products");
  };
  return (
    <div>
      {/* Video Background Section */}
      <div className="relative w-full h-[1038px]">
        <video 
          autoPlay 
          loop 
          muted 
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/BGVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Navbar and Overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
          <NavbarAuth className="absolute top-0 left-0 w-full z-20" />

          {/* Overlay and Text */}
          <div className="flex flex-col justify-center items-center w-full h-full z-10">
            <h1 className="text-white text-center text-[120px] leading-tight font-kaushan mt-[-200px]">
              Order Success
            </h1>
            <p className="text-white font-montserrat text-center text-[22px]">
              The package will delivery to you in about 3-4 days
            </p>
            <button onClick={handleClick} className="group w-[360px] bg-white text-bold text-black font-montserrat py-3 px-4 font-bold text-[24px] border border-white transition-all duration-300 ease-in-out hover:bg-transparent !mt-[40px]">
                <span className="group-hover:text-white transition-colors duration-300 ease-in-out">Back to homepage</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div>
        <WhiteFooter />
      </div>
    </div>
  );    
};

export default OrderSuccess;
