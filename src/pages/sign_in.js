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
            className="absolute inset-0 bg-cover bg-center z-0 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60" 
            style={{ backgroundImage: "url('/BGAuthen.png')" }} 
          />
          <div className="relative z-10 ml-[-50px] mt-[10px]">
          <nav className='grid grid-cols-4 p-4 items-center'>
          <div className="col-span-1 grid place-items-center">
            <Image src="/Logo.png" alt="Logo" width={98} height={58}/>
          </div>
            <div className="col-span-3 mr-[40px]">
              <SearchBar className="w-full"/>
            </div>
          </nav>
            {/* Add more content for the left side here */}
            <div className="flex-grow flex flex-col justify-center items-center max-w-md w-full mt-[72px] ml-[300px]">
              <h1 className="font-kaushan text-white text-7xl mb-10 text-center mb-12">Log In</h1>
              <form className="w-full space-y-6">
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Username/ Email</label>
                  <input type="text" placeholder="Enter your username or email" className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
  style={{ lineHeight: 'normal' }}/>
                </div>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Password</label>
                  <input 
  type="password" 
  placeholder="Enter your password" 
  className="w-full pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
  style={{ lineHeight: 'normal' }}
/>                </div>
                <button className="!mt-[40px] w-full bg-white text-black font-montserrat py-3 px-4 font-bold text-[20px]">Log in</button>
                <div className="flex items-center justify-center my-6">
  <div className="flex-grow h-px bg-white"></div>
  <span className="px-4 text-white font-montserrat text-[23.131px] font-normal tracking-[2.313px]" style={{ lineHeight: 'normal' }}>
    OR
  </span>
  <div className="flex-grow h-px bg-white"></div>
</div>
<button className="w-full border border-white text-white font-montserrat text-[22px] font-light flex items-center px-20 py-3 mb-4">
  <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="white">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
  Continue with Google
</button>
<button className="w-full border border-white text-white font-montserrat text-[22px] font-light flex items-center px-20 py-3">
  <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
  Continue with Facebook
</button>
                <a href="#" className="text-white font-montserrat font-light text-sm block text-center text-[22px]"><u>Forget Password?</u></a>
              </form>
            </div>

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