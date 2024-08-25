import React, { useState } from 'react';
import Image from 'next/image';

const ProductCard = ({ imageUrl, name, brand, price, rating }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full max-w-sm overflow-hidden shadow-lg group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4]">
        <Image 
          src={imageUrl} 
          alt={name} 
          layout="fill" 
          objectFit="cover"
          className={`transition-all duration-300 ${isHovered ? 'brightness-50' : ''}`}
        />
        <div className="absolute bottom-[14px] right-[25px] w-[88px] h-[52px] transition-opacity duration-300">
          <Image 
            src={isHovered ? "/Card_gradient.png" : "/SmallLogo.png"}
            alt="Logo" 
            layout="fill" 
            objectFit="contain"
          />
        </div>
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            className="px-6 py-2 text-[24px] font-montserrat font-medium relative overflow-hidden"
            style={{
              background: 'transparent',
              border: '2px solid transparent',
              borderImage: 'linear-gradient(90deg, #05FFF0, #064CFF) 1',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              backgroundImage: 'linear-gradient(90deg, #05FFF0, #064CFF)',
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
      <div className="text-white mt-[12.45px] p-[4px]">
        <h2 className="text-[40px] font-[Nakula] font-normal leading-normal tracking-[-1.6px]">
          ${price}
        </h2>
        <h3 className="text-[31.614px] font-montserrat font-normal leading-normal tracking-[-1.265px] uppercase">
          {brand}
        </h3>
        <p className="text-[24.468px] font-montserrat font-thin leading-normal tracking-[-0.979px]">
          {name}
        </p>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 mr-1">
              <Image
                src={i < rating ? "/Star.png" : "/Star-black.png"}
                alt={i < rating ? "Rated star" : "Unrated star"}
                width={32}
                height={32}
                layout="responsive"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;