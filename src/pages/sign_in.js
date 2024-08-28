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
      const loginResponse = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const loginData = await loginResponse.json();
  
      if (loginData.code === 1000 && loginData.result.success) {
        // Save token to localStorage
        localStorage.setItem('toklocalen', loginData.result.token);
  
        // Fetch user info
        const userInfoResponse = await fetch('/api/user/my-info', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${loginData.result.token}`,
          },
        });
  
        const userInfoData = await userInfoResponse.json();
  
        if (userInfoData.code === 1000 && userInfoData.result) {
          // Save userId to localStorage
          localStorage.setItem('userId', userInfoData.result.id);
          
          // Optionally, you can save other user information if needed
          localStorage.setItem('username', userInfoData.result.username);
          localStorage.setItem('email', userInfoData.result.email);
          
          router.push('/products');
        } else {
          setError(userInfoData.message || 'Failed to fetch user information. Please try again.');
        }
      } else {
        setError(loginData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login process:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Left side */}
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
                  <svg className="w-6 h-6 mr-4 transition-colors duration-300 ease-in-out group-hover:fill-black" viewBox="0 0 24 24" fill="white">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span className="transition-colors duration-300 ease-in-out group-hover:text-black">Continue with Google</span>
                </button>

                <button className="!mb-6 group w-full border border-white text-white font-montserrat text-[22px] font-light flex items-center px-16 py-3 transition-all duration-300 ease-in-out hover:bg-white">
                  <svg className="w-6 h-6 mr-4 transition-colors duration-300 ease-in-out group-hover:fill-black" viewBox="0 0 24 24" fill="white">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="transition-colors duration-300 ease-in-out group-hover:text-black">Continue with Facebook</span>
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

        {/* Right side */}
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