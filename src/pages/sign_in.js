// pages/signin.js
import React from 'react';
import WhiteFooter from '@/components/layout/Footer';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';

const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Left side remains unchanged */}
        <div className='w-1/2 h-[1040px] relative'>
          <div 
            className="absolute inset-0 bg-cover bg-center z-0 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-40" 
            style={{ backgroundImage: "url('/BGAuthen.png')" }} 
          />
          <div className="relative z-10">
            <nav className='flex flex-row p-4'>
              <Image src="/Logo.png" alt="Logo" width={98} height={58}/>
              <SearchBar />
            </nav>
            {/* Add more content for the left side here */}
          </div>
        </div>

        {/* Right side with updated text styling */}
        <div className="w-1/2 relative overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/BGVideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-30">
            <h1 className="text-white text-center text-[70.701px] leading-normal ml-[30px] mt-[-70px]" style={{ fontFamily: '"Kaushan Script", cursive' }}>
              The only fashion site you
            </h1>
            <h2 className="text-white font-montserrat text-[70.701px] font-bold leading-[140.715%] tracking-[33.937px]  ml-[30px]">
              NEED
            </h2>
          </div>
        </div>
      </div>

      {/* Footer */}
      <WhiteFooter />
    </div>
  );
};

export default SignIn;