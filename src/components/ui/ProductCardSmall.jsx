import React from 'react';
import Image from 'next/image';

const ProductCardSmall = ({ imageUrl, selected, onClick }) => {
  return (
    <div
      className={`relative w-[166px] h-[206px] flex-shrink-0 overflow-hidden cursor-pointer transition-all duration-300 ${
        selected
          ? 'filter drop-shadow-[0px_0px_27.1px_rgba(255,255,255,0.50)]'
          : 'filter grayscale brightness-50'
      }`}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt="Product Image"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute bottom-[4px] right-[10px] w-[58px] h-[34px]">
          <Image
            src="/SmallLogo.png"
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSmall;
