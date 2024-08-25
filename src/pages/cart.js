import React, { useState } from 'react';
import WhiteFooter from '@/components/layout/Footer'
import NavbarAuth from '@/components/layout/Navbar'
import { useRouter } from 'next/router'
import { Star, Check, Minus, Plus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import CartCard from '@/components/ui/CartCard';

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

export default function Cart() {
  const [cartItems, setCartItems] = useState(products);
  const [address, setAddress] = useState('');

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateDiscount = () => {
    return calculateSubtotal() * 0.2;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + 15; // 15 is the delivery fee
  };

  const handleRemoveItem = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

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
        <div className="flex justify-between px-[30px] py-[20px]">
          <div className="w-[860px] space-y-4">
            {cartItems.map((item, index) => (
              <CartCard
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
          <div className="w-[400px] bg-black text-white mr-[150px] mt-4 rounded-[10px]">
            <h2 className="text-[40px] font-kaushan mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 font-montserrat">
              <div className="flex justify-between text-[20px]">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-[20px] font-bold font-montserrat">
                <span className="bg-gradient-to-r from-[#05FFF0] to-[#064CFF] bg-clip-text text-transparent">
                  Discount (-20%)
                </span>
                <span className="bg-gradient-to-r from-[#05FFF0] to-[#064CFF] bg-clip-text text-transparent">
                  -${calculateDiscount()}
                </span>
              </div>
              <div className="flex justify-between text-[20px] font-montserrat">
                <span>Delivery Fee</span>
                <span>$15</span>
              </div>
              <div className="flex justify-between text-[24px] font-bold mt-4 font-montserrat">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            <button className="w-full font-montserrat bg-white text-black py-4 text-[18px] font-semibold flex items-center justify-center mb-6 transition-all duration-300 ease-in-out hover:bg-transparent hover:text-white hover:border hover:border-white">
              Go to Checkout
              <ArrowRight className="ml-2" />
            </button>
            <div>
              <label className="block text-[18px] mb-2 font-montserrat">Enter your address</label>
              <input 
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address here"
                className="w-full bg-black border-b border-white pb-2 text-white placeholder-gray-500 focus:outline-none font-montserrat"
              />
            </div>
          </div>
        </div>
      </div>
      <WhiteFooter />
    </div>
  )
}