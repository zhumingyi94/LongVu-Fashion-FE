import React, { useState } from 'react';
import WhiteFooter from '@/components/layout/Footer';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';
import Link from 'next/link';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    roles: ['USER'], // Assuming default role as 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User registered successfully');
        // Optionally, redirect to another page or show a success message
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Left side remains unchanged */}
        <div className="w-1/2 h-[1200px] relative">
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
            {/* Add more content for the left side here */}
            <div className="flex-grow flex flex-col justify-center items-center max-w-md w-full mt-[72px] ml-[300px]">
              <h1 className="font-kaushan text-white text-7xl mb-8 text-center mb-12 mt-[-20px]">
                Register
              </h1>
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className="w-full pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                    style={{ lineHeight: 'normal' }}
                  />
                </div>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                    style={{ lineHeight: 'normal' }}
                  />
                </div>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Phone number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                    style={{ lineHeight: 'normal' }}
                  />
                </div>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                    style={{ lineHeight: 'normal' }}
                  />
                </div>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Re-enter your password</label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    placeholder="Re-enter your password"
                    className="w-full pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                    style={{ lineHeight: 'normal' }}
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full bg-white text-black font-montserrat py-3 px-4 font-bold text-[20px] border border-white transition-all duration-300 ease-in-out hover:bg-transparent !mt-[40px]"
                >
                  <span className="group-hover:text-white transition-colors duration-300 ease-in-out">Register</span>
                </button>
                <div className="flex items-center justify-center my-6">
                  <div className="flex-grow h-px bg-white"></div>
                  <span
                    className="px-4 text-white font-montserrat text-[23.131px] font-normal tracking-[2.313px]"
                    style={{ lineHeight: 'normal' }}
                  >
                    OR
                  </span>
                  <div className="flex-grow h-px bg-white"></div>
                </div>
                {/* Continue with Google and Facebook buttons */}
                <div className="flex justify-center items-center">
                  <span className="text-white font-montserrat text-[20px]">Already have an account?</span>
                  <Link
                    href="/sign_in"
                    className="group text-transparent font-montserrat font-light text-[20px] ml-2 bg-clip-text bg-gradient-to-r from-[#05FFF0] to-[#064CFF] transition-all duration-300 ease-in-out hover:text-white"
                  >
                    <u className="transition-all duration-300 ease-in-out decoration-[#05FFF0] group-hover:decoration-white">
                      Log in
                    </u>
                  </Link>
                </div>
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
            <h1
              className="text-white text-center text-[70.701px] leading-normal ml-[30px] mt-[-70px]"
              style={{ fontFamily: '"Kaushan Script", cursive' }}
            >
              The only fashion site you
            </h1>
            <h2 className="text-white font-montserrat text-[70.701px] font-bold leading-[140.715%] tracking-[33.937px] ml-[30px]">
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

export default Register;
