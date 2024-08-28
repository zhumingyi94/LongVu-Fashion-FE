import React, { useState } from 'react';
import { useRouter } from 'next/router';
import WhiteFooter from '@/components/layout/Footer';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';
import Link from 'next/link';
import CryptoJS from 'crypto-js';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const router = useRouter();

  const hashData = (data) => {
    return CryptoJS.SHA256(data).toString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hashedUsername = hashData(username);
      const hashedPassword = hashData(password);

      const loginResponse = await fetch('/api/auth/token', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: hashedUsername, password: hashedPassword }),
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
                {/* Rest of the component remains the same */}
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