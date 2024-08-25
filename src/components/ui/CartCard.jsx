import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import Image from 'next/image';

const CartCard = ({ imageUrl, name, size, color, price, onDelete }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

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
        </div>
        {/* text-gray-400 */}
        <div className="flex justify-between items-center">
          <span className="text-[40px] font-bold font-montserrat">${price}</span>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between h-full ml-4">
        <button 
          onClick={onDelete} 
          className="mt-14 rounded-full transition-all duration-300 ease-in-out hover:bg-white/20"
        >
          <Image
            src="/Bin.png"
            alt="Delete"
            width={24}
            height={24}
            className="transition-all duration-300 ease-in-out group-hover:opacity-80"
          />
        </button>
        <div className="flex items-center justify-between w-32 bg-white text-black h-[52px]">
          <button 
            onClick={decrementQuantity} 
            className="px-3 py-2 hover:bg-gray-200 rounded-l-md"
          >
            <Minus size={16} />
          </button>
          <span className="mx-2 font-semibold">{quantity}</span>
          <button 
            onClick={incrementQuantity} 
            className="px-3 py-2 hover:bg-gray-200 rounded-r-md"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;