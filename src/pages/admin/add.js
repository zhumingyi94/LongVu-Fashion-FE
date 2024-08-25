import React, { useState } from 'react';
import Image from 'next/image';
import WhiteFooter from '@/components/layout/Footer';
import NavbarAuth from '@/components/layout/Navbar';

const AddProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-montserrat">
      <NavbarAuth />
      <div className="flex-grow container mx-auto py-8">
        <nav className="mb-4 mt-4 ml-[-100px]">
          <a href="/" className="inline-flex items-center gap-[6.364px] text-[25.455px] font-normal" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
            Home
            <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mr-[8px]" />
          </a>
          <a href="/admin" className="inline-flex items-center gap-[6.364px] text-[25.455px] font-normal" style={{ color: 'rgba(255, 255, 255, 0.60)' }}>
            Admin
            <Image src="/arrow.png" alt="Arrow" width={25} height={25} className="inline-block mr-[8px]" />
          </a>
          <span className="text-white text-[25.455px]">Add Product</span>
        </nav>

        <h1 className="font-kaushan text-[71px] mb-8 ml-[-100px]">Add Your Product</h1>

        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <div className="bg-gray-700 w-full aspect-square relative overflow-hidden">
              {image ? (
                <Image src={image} alt="Product" layout="fill" objectFit="cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <label htmlFor="image-upload" className="cursor-pointer text-[20px] bg-white font-bold text-black py-2 px-4"
                  style={{
                    background: 'transparent',
                    border: '2px solid transparent',
                    borderImage: 'linear-gradient(90deg, #05FFF0, #064CFF) 1',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundImage: 'linear-gradient(90deg, #05FFF0, #064CFF)',
                  }}>
                    Upload Image
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 px-4">
            <form className="w-full space-y-6">
              <div>
                <label className="text-white font-montserrat mb-2 text-[20px]">Name</label>
                <input
                  type="text"
                  placeholder="Enter your product name"
                  className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                  style={{ lineHeight: 'normal' }}
                />
              </div>

              <div>
                <label className="text-white font-montserrat mb-2 text-[20px]">Descriptions</label>
                <input
                  type="text"
                  placeholder="Enter your product descriptions"
                  className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                  style={{ lineHeight: 'normal' }}
                />
              </div>

              <div>
                <label className="text-white font-montserrat mb-2 text-[20px]">Price</label>
                <input
                  type="text"
                  placeholder="Enter your product prices"
                  className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                  style={{ lineHeight: 'normal' }}
                />
              </div>

              <div>
                <label className="text-white font-montserrat mb-2 text-[20px]">Category</label>
                <input
                  type="text"
                  placeholder="Enter your product category"
                  className="w-full mb-3 pb-1 bg-transparent border-b border-white text-[#777] font-montserrat text-[29.802px] font-extralight placeholder-[#777]"
                  style={{ lineHeight: 'normal' }}
                />
              </div>

              <div className="flex items-center mb-8">
                <label className="text-white font-montserrat mr-4 text-[20px]">Quantity</label>
                <button type="button" onClick={decrementQuantity} className="bg-white text-black px-3 py-1 text-xl">-</button>
                <span className="mx-4 text-xl">{quantity}</span>
                <button type="button" onClick={incrementQuantity} className="bg-white text-black px-3 py-1 text-xl">+</button>
              </div>

              <button
                type="submit"
                className="group w-full bg-white text-black font-montserrat py-3 px-4 font-bold text-[20px] border border-white transition-all duration-300 ease-in-out hover:bg-transparent !mt-[40px]"
              >
                <span className="group-hover:text-white transition-colors duration-300 ease-in-out">Add Product</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <WhiteFooter />
    </div>
  );
};

export default AddProduct;