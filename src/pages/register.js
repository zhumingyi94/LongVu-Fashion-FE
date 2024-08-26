import React, { useState } from 'react';
import WhiteFooter from '@/components/layout/Footer';
import Image from 'next/image';
import SearchBar from '@/components/ui/SearchBar';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CustomAlert = ({ message, type }) => (
  <div className={`p-4 mb-4 rounded-md ${type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
    {message}
  </div>
);

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    roles: ['USER'],
  });

  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (formData.username.length < 4) {
      newErrors.username = 'Username must have at least 4 characters';
      isValid = false;
    }

    if (!/^[^\s@]+@gmail\.com$/.test(formData.email)) {
      newErrors.email = 'Email must be a valid Gmail address';
      isValid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must have at least 8 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the error for this field as the user types
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setAlertMessage('User registered successfully! Redirecting to sign in...');
          setAlertType('success');
          setTimeout(() => {
            router.push('/sign_in');
          }, 2000);
        } else {
          const errorData = await response.json();
          setAlertMessage(errorData.message || 'Registration failed. Please try again.');
          setAlertType('error');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        setAlertMessage('An unexpected error occurred. Please try again later.');
        setAlertType('error');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Left side */}
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
            <div className="flex-grow flex flex-col justify-center items-center max-w-md w-full mt-[72px] ml-[300px]">
              <h1 className="font-kaushan text-white text-7xl mb-8 text-center mb-12 mt-[-20px]">
                Register
              </h1>
              {alertMessage && <CustomAlert message={alertMessage} type={alertType} />}
              <form className="w-full space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className={`w-full pb-1 bg-transparent border-b ${errors.username ? 'border-red-500' : 'border-white'} text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]`}
                    style={{ lineHeight: 'normal' }}
                  />
                  {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>
                <div>
                  <label className="text-white font-montserrat mb-2 text-[20px]">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full pb-1 bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-white'} text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]`}
                    style={{ lineHeight: 'normal' }}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    className={`w-full pb-1 bg-transparent border-b ${errors.password ? 'border-red-500' : 'border-white'} text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]`}
                    style={{ lineHeight: 'normal' }}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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