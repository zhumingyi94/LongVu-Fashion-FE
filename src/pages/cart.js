import React, { useState } from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import VideoHeaderProduct from '@/components/ui/VideoHeaderProduct'
import { useRouter } from 'next/router'
import ProductGallery from '@/components/layout/ProductGallery'
import { Star, Check, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';

const products = [
  {
    imageUrl: '/DressTestpng.png',
    name: 'One Piece Medium',
    brand: 'LONG VU',
    price: 3.725,
    rating: 4.5,
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['#4F4631', '#314F4A', '#31344F'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    imageUrl: '/DressTestpng.png',
    name: 'One Piece Medium',
    brand: 'LONG VU',
    price: 3.725,
    rating: 4.5,
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['black', 'green', 'blue'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    imageUrl: '/DressTestpng.png',
    name: 'One Piece Medium',
    brand: 'LONG VU',
    price: 3.725,
    rating: 4.5,
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['black', 'green', 'blue'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    imageUrl: '/DressTestpng.png',
    name: 'One Piece Medium',
    brand: 'LONG VU',
    price: 3.725,
    rating: 4.5,
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['black', 'green', 'blue'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
  {
    imageUrl: '/DressTestpng.png',
    name: 'One Piece Medium',
    brand: 'LONG VU',
    price: 3.725,
    rating: 4.5,
    description: 'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style. This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.',
    colors: ['black', 'green', 'blue'],
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
  },
];

export default function Cart() {
  
  return (
    <div>
      <NavbarAuth />
      <div className="bg-black pb-40">
        {/* Add breadcrumb navigation */}
        <nav className="flex items-center pt-[43px] pl-[30px] mb-[10px] text-[25.455px] font-montserrat" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
          <a href="/your" className="inline-flex items-center">
            Product
            <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mx-[8px]" />
          </a>
          <span className="text-white">Cart</span>
        </nav>

       </div>
      <WhiteFooter />
    </div>
  )
}