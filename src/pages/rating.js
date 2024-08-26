import React from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import Image from 'next/image';
import RatingCard from '@/components/ui/RatingCard';

const ratingItems = [
  { imageUrl: '/DressTestpng.png', name: 'One Piece Medium', size: 'Medium', color: 'Red' },
  { imageUrl: '/DressTestpng.png', name: 'One Piece Medium', size: 'Medium', color: 'Red' },
  { imageUrl: '/DressTestpng.png', name: 'One Piece Medium', size: 'Medium', color: 'Red' },
  { imageUrl: '/DressTestpng.png', name: 'One Piece Medium', size: 'Medium', color: 'Red' },
  { imageUrl: '/DressTestpng.png', name: 'One Piece Medium', size: 'Medium', color: 'Red' },
  { imageUrl: '/DressTestpng.png', name: 'One Piece Medium', size: 'Medium', color: 'Red' },
];

export default function Rating() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarAuth />
      <div className="flex-grow bg-black pb-10">
        <nav className="flex items-center pt-8 pl-8 mb-4 text-2xl font-montserrat text-white/60">
          <a href="/home" className="hover:text-white">Home</a>
          <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mx-2" />
          <span className="text-white">Rating</span>
        </nav>
        <h1 className="font-kaushan text-white text-center text-7xl mb-10">Rating Your Order</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-8">
          {ratingItems.map((item, index) => (
            <RatingCard key={index} {...item} />
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button className="border border-white font-montserrat text-white py-2 px-8 hover:bg-white hover:text-black transition duration-300">
            Submit rating
          </button>
        </div>
      </div>
      <WhiteFooter />
    </div>
  )
}