import React, { useState } from 'react';

const Button = ({ button_text, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className="border border-white"
            style={{
                backgroundColor: isHovered ? '#FFFFFF' : 'transparent',
                color: isHovered ? '#000000' : '#FFFFFF',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: isHovered ? 700 : 400,
                lineHeight: 'normal',
                letterSpacing: '1.6px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#FFFFFF',
                padding: '8px 16px', // Adjust padding as needed
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textShadow: isHovered ? 'none' : '0px 3.485px 3.485px rgba(255, 255, 255, 0.25)',
                whiteSpace: 'nowrap',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {button_text}
        </button>
    );
};

export default Button;