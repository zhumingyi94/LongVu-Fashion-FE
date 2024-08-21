import React, { useState } from 'react';

const BuyNowButton = ({button_text}) => {

    const [isHovered, setIsHovered] = useState(false);
  return (
    <button
      className="border border-white"
      style={{
        marginTop: '30px',
        display: 'inline-flex',
        width: '210px',
        height: '54px',
        padding: '9.238px 12.274px 8.647px 13.856px',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isHovered ? '#FFFFFF' : '',
        color: isHovered ? '#000000' : '#FFFFFF',
        textShadow: '-2.515px 3.353px 3.353px rgba(0, 0, 0, 0.30)',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: '32.661px',
        fontStyle: 'normal',
        fontWeight: isHovered ? 700 : 600,
        lineHeight: 'normal',
        letterSpacing: '1.666px',
        borderWidth: '0.994px',
        padding: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}  
    >
        {button_text}
    </button>

    
  );
};

export default BuyNowButton;
