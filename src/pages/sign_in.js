import React, { useState } from 'react';
import { useRouter } from 'next/router';
import WhiteFooter from '@/components/layout/Footer';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';
import Link from 'next/link';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.code === 1000 && data.result.success) {
        localStorage.setItem('token', data.result.token);
        router.push('/products');
      } else {
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Left side remains unchanged */}
        <div className="w-1/2 h-[1040px] relative">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 before:content-[''] before:absolute before:inset-0 before:bg-black before:opacity-60"
            style={{ backgroundImage: "url('/BGAuthen.png')" }}
          />
          <div className="relative z-10 ml-[-50px] mt-[10px]">
            <nav className="grid grid-cols-4 p-4 items-center">
              <div className="col-span-1 grid place-items-center">
                <Image src="/Logo.png" alt="Logo" width={98} height={58} />
              </div>
              <div className="col-span-3 mr-[40px]">
                <SearchBar className="w-full" />
              </div>
            </nav>
            <div className="flex-grow flex flex-col justify-center items-center max-w-md w-full mt-[72px] ml-[300px]">
              <h1 className="font-kaushan text-white text-7xl mb-10 text-center mb-12">Log In</h1>
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Username/ Email</label>
                  <input
                    type="text"
                    placeholder="Enter your username or email"
                    className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                    style={{ lineHeight: 'normal' }}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                    style={{ lineHeight: 'normal' }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button
                  type="submit"
                  className="group w-full bg-white text-black font-montserrat py-3 px-4 font-bold text-[20px] border border-white transition-all duration-300 ease-in-out hover:bg-transparent !mt-[40px]"
                >
                  <span className="group-hover:text-white transition-colors duration-300 ease-in-out">Log in</span>
                </button>
                <div className="flex items-center justify-center my-6">
                  <div className="flex-grow h-px bg-white"></div>
                  <span className="px-4 text-white font-montserrat text-[23.131px] font-normal tracking-[2.313px]" style={{ lineHeight: 'normal' }}>
                    OR
                  </span>
                  <div className="flex-grow h-px bg-white"></div>
                </div>
                <button className="group w-full border border-white text-white font-montserrat text-[22px] font-light flex items-center px-16 py-3 mb-4 transition-all duration-300 ease-in-out hover:bg-white">
                  {/* Google sign-in button content */}
                </button>
                <button className="!mb-10 group w-full border border-white text-white font-montserrat text-[22px] font-light flex items-center px-16 py-3 transition-all duration-300 ease-in-out hover:bg-white">
                  {/* Facebook sign-in button content */}
                </button>
                <Link
                  href="/register"
                  className="group text-white font-montserrat font-light text-[20px] block text-center transition-all duration-300 ease-in-out"
                >
                  <u className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white group-hover:from-[#05FFF0] group-hover:to-[#064CFF] transition-all duration-300 ease-in-out decoration-white group-hover:decoration-[#05FFF0]">
                    Create an account
                  </u>
                </Link>
              </form>
            </div>
          </div>
        </div>

        {/* Right side remains unchanged */}
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
