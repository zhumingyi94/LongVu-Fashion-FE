import React, { useState } from 'react';

const Button = ({ button_text, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <button
            className="border border-white"
            style={{
                backgroundColor: isHovered ? '#FFFFFF' : '#000000',
                width: '98.448px',
                height: '32.319px',
                color: isHovered ? '#000000' : '#FFFFFF',
                textShadow: '0px 3.485px 3.485px rgba(255, 255, 255, 0.25)',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '16.661px',
                fontStyle: 'normal',
                fontWeight: isHovered ? 700 : 400,
                lineHeight: 'normal',
                letterSpacing: '1.666px',
                borderWidth: '0.994px',
                padding: 0,
                cursor: 'pointer', // Add this to indicate it's clickable
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}  // Add this line to handle click events
        >
            {button_text}
        </button>
    );
};

export default Button;