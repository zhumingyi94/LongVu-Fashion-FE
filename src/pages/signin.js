// pages/signin.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import WhiteFooter from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-in logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 bg-black text-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold">
            Long Vu
          </Link>
          <input
            type="text"
            placeholder="Find your favorite clothes"
            className="w-1/2 p-2 rounded-full text-black"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2">
        {/* Left column - Login form */}
        <div className="bg-black text-white p-8 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-8">Log In</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2">Username/ Email</label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your username or email"
                className="w-full p-2 bg-transparent border-b border-white"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 bg-transparent border-b border-white"
              />
            </div>
            <button type="submit" className="w-full bg-white text-black py-2 font-bold">
              Log in
            </button>
          </form>
          <div className="mt-4 text-center">
            <p>OR</p>
            <button className="w-full border border-white py-2 mt-2">
              Continue with Google
            </button>
            <button className="w-full border border-white py-2 mt-2">
              Continue with Facebook
            </button>
          </div>
          <Link href="/forgot-password" className="text-center mt-4">
            Forget Password?
          </Link>
        </div>

        {/* Right column - Image with text overlay */}
        <div className="relative hidden md:block">
          <Image
            src="/path-to-your-image.jpg"
            alt="Fashion"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <h2 className="text-white text-4xl font-bold text-center">
              The only fashion site you
              <br />
              <span className="tracking-widest">N E E D</span>
            </h2>
          </div>
        </div>
      </main>

      {/* Footer */}
      <WhiteFooter />
    </div>
  );
};

export default SignIn;