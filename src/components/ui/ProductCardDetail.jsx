import React from 'react';
import Image from 'next/image';

const ProductCardDetail = ({ imageUrl, name, brand, price }) => {
  return (
    <div className="relative w-[639px] h-[723px] flex-shrink-0 overflow-hidden shadow-[0px_0px_100px_0px_rgba(255,255,255,0.50)]">
      <div className="relative aspect-[3/4]">
        <Image 
          src={imageUrl} 
          alt={name} 
          layout="fill" 
          objectFit="cover"
        />
        <div className="absolute top-[20px] left-[25px] w-[113px] h-[66px]">
          <Image 
            src="/SmallLogoDark.png"
            alt="Logo" 
            layout="fill" 
            objectFit="contain"
          />
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
      </div>
    </div>
  );
};

export default ProductCardDetail;