import React, { useState } from 'react';

const ShopButton = ({ button_text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`
        border border-white
        inline-flex items-center justify-center
        px-4 py-2
        transition-colors duration-200 ease-in-out
        ${isHovered ? 'bg-white text-black' : 'bg-transparent text-white'}
        font-montserrat text-2xl font-semibold tracking-wider
        whitespace-nowrap overflow-hidden
        min-w-[210px] h-[54px]
      `}
      style={{
        textShadow: isHovered ? 'none' : '-2.515px 3.353px 3.353px rgba(0, 0, 0, 0.30)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {button_text}
    </button>
  );
};

export default ShopButton;