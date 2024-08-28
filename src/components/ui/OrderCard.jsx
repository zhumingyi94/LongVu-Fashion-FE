import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

const OrderCard = ({ imageUrl, name, size, color, price, onDelete, quantity }) => {

  return (
    <div className="flex bg-black text-white w-[800px] h-[239px] items-center">
      <div className="relative w-[154.303px] h-[238.921px] flex-shrink-0 rounded-[10.774px] bg-[#F0EEED] overflow-hidden">
        <Image 
          src={imageUrl || "/api/placeholder/154/239"} 
          alt={name} 
          layout="fill" 
          objectFit="cover"
        />
        <div className="absolute bottom-[5px] right-[10px] w-[50px] h-[30px]">
          <Image 
            src="/SmallLogo.png"
            alt="Logo" 
            layout="fill" 
            objectFit="contain"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between ml-4 flex-grow h-full">
        <div>
          <h2 className="text-[40px] font-kaushan">{name}</h2>
          <p className="text-[24px] font-montserrat text-gray-400"><span className="text-white">Size:</span> {size}</p>
          <p className="text-[24px] font-montserrat text-gray-400"><span className="text-white">Color:</span> {color}</p>
          <p className="text-[24px] font-montserrat text-gray-400"><span className="text-white">Quantity:</span> {quantity}</p>
        </div>
        {/* text-gray-400 */}
        <div className="flex justify-between items-center">
          <span className="text-[40px] font-bold font-montserrat">${price.toFixed(2)}</span>
        </div>
      </div>
      
    </div>
  );
};

export default OrderCard;