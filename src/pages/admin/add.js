import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';
import React from 'react';
import Image from 'next/image';

const UpdateProduct = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAuth></NavbarAuth>
      <div className='h-[1024px] w-full bg-black'>
      <a 
              href="#" 
              className="inline-flex items-center gap-[6.364px] font-montserrat text-[25.455px] font-normal"
              style={{
                color: 'rgba(255, 255, 255, 0.60)',
                leadingTrim: 'both',
                textEdge: 'cap',
              }}
            >
              Admin
              <Image
                src="/arrow.png"    
                alt="Arrow"
                width={25}
                height={25}
                className="inline-block ml-1"
              />
              <span className="text-white">Add Product</span>
            </a>
        <h1 className="text-white text-[71px] font-kaushan">Add Your Product</h1>
      </div>
      <WhiteFooter></WhiteFooter>
    </div>
  );
};

export default UpdateProduct;