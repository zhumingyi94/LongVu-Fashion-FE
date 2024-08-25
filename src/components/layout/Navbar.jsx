import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '../ui/SearchBar';

const NavbarAuth = () => {
  const [activeSection, setActiveSection] = useState('WOMEN');
  const [bellSrc, setBellSrc] = useState('/Bell_light.png');
  const [cartSrc, setCartSrc] = useState('/Cart.png');

  const ICON_SIZE = 29.62;

  const linkClass = "font-light font-montserrat relative text-white text-[20.83px] tracking-[2.083px]";
  const hoverClass = "hover:bg-gradient-to-r hover:from-[#05FFF0] hover:to-[#064CFF] hover:bg-clip-text hover:text-transparent";
  const activeClass = "font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white";
  const hoverUnderlineClass = "hover:after:bg-gradient-to-r hover:after:from-[#05FFF0] hover:after:to-[#064CFF]";
  const iconClass = "relative";

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <nav className="relative h-[113px] w-full overflow-hidden bg-[#474747]">
      <video 
        autoPlay 
        loop 
        muted 
        className='absolute top-0 left-0 w-full h-full object-cover opacity-50'
      >
        <source src="/BGVideo.mp4" type='video/mp4'/>
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between px-[44px] z-10">
        <div className="flex items-center shrink-0">
          <Image 
            src="/Logo.png" 
            width={98} 
            height={58} 
            alt="Long Vu Fashion"
            className="object-contain mr-[63px]"
          />
          <Link 
            href="/women" 
            className={`${linkClass} ${hoverClass} ${hoverUnderlineClass} ${activeSection === 'WOMEN' ? activeClass : ''} mr-[55px]`}
            onClick={() => handleSectionClick('WOMEN')}
          >
            <span className={activeSection === 'WOMEN' ? 'font-bold' : ''}>WOMEN</span>
          </Link>
          <Link 
            href="/men" 
            className={`${linkClass} ${hoverClass} ${hoverUnderlineClass} ${activeSection === 'MEN' ? activeClass : ''}`}
            onClick={() => handleSectionClick('MEN')}
          >
            <span className={activeSection === 'MEN' ? 'font-bold' : ''}>MEN</span>
          </Link>
        </div>
        <div className="flex-1 max-w-[900px] min-w-[200px] mx-4 text-black">
          <SearchBar placeholder="Find your favorite clothes" />
        </div>
        <div className="flex items-center shrink-0">
          <Link href="/contact" className={`${linkClass} ${hoverClass} mr-[56px]`}>CONTACT</Link>
          <Link href="/notifications" className={`${iconClass} mr-[56px]`}>
            <Image 
              src={bellSrc} 
              alt="Notifications" 
              width={ICON_SIZE} 
              height={ICON_SIZE} 
              onMouseEnter={() => setBellSrc('/Bell_light_grad.png')}
              onMouseLeave={() => setBellSrc('/Bell_light.png')}
              layout="fixed"
            />
          </Link>
          <Link href="/cart" className={`${iconClass} mr-[55px]`}>
            <Image 
              src={cartSrc} 
              alt="Cart" 
              width={32} 
              height={32} 
              onMouseEnter={() => setCartSrc('/Cart_gradient.png')}
              onMouseLeave={() => setCartSrc('/Cart.png')}
              layout="fixed"
            />
          </Link>
          <Link href="/profile" className={iconClass}>
            <Image 
              src="/Longcircle.png"
              alt="Profile" 
              width={42}
              height={42} 
              layout="fixed"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavbarAuth;