import React, { useState } from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import { useRouter } from 'next/router'
import { Star, Check, Minus, Plus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import CartCard from '@/components/ui/CartCard';
import OrderCard from '@/components/ui/OrderCard';

const products = [
  {
    imageUrl: '/DressTestpng.png',
    name: 'One Piece Medium',
    brand: 'LONG VU',
    price: 180,
    size: 'Medium',
    color: 'Red',
  },
  // ... other products
];

export default function Order() {
  const [cartItems, setCartItems] = useState(products);
  const [address, setAddress] = useState('');

  return (
    <div>
      <NavbarAuth />
      <div className="bg-black min-h-screen">
        <nav className="flex items-center pt-[43px] pl-[30px] mb-[10px] text-[25.455px] font-montserrat" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
          <a href="/your" className="inline-flex items-center">
            Product
            <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mx-[8px]" />
          </a>
          <span className="text-white">Cart</span>
        </nav>
        <h1 className='text-white font-kaushan text-center text-[60px]'>Order History</h1>

        <div className="flex justify-between px-[30px] py-[20px]">
          <div className="w-[860px] space-y-4">
          <h2 className='text-white font-montserrat font-bold text-[40px]'>Nth order</h2>
            {cartItems.map((item, index) => (
              <OrderCard
                key={index}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                size={item.size}
                color={item.color}
                onDelete={() => handleRemoveItem(index)}
              />
            ))}
          </div>
          
        </div>
      </div>
      <WhiteFooter />
    </div>
  )
}