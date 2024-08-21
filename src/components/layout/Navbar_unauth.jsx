import React, {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';

const linkStyle = {
    color: '#FFF',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1rem ',
    fontStyle: 'normal',    
    fontWeight: 400,
    lineHeight: 'normal',
    letterSpacing: '0.1rem',
    whiteSpace: 'nowrap',
};

const NavbarUnauth = () => {
    const [imgSrc, setImgSrc] = useState('/Bell_light.png');
  return (
    <nav 
      className="py-4 w-full grid grid-cols-12 gap-10 px-10">
    <div>
      <Link href="/">
        <Image src="/Logo.png" alt="Long Vu Fashion" width={100} height={40} />
      </Link>
    </div>
    <div className='col-span-7 my-auto'>
    <SearchBar />
    </div>

    <div className="col-span-4 flex flex-row justify-center gap-16 items-center">
      <Link href="/">
      <Image 
        src={imgSrc} 
        alt="Notifications" 
        width={30} 
        height={30} 
        onMouseEnter={() => setImgSrc('/Bell_light_grad.png')}
        onMouseLeave={() => setImgSrc('/Bell_light.png')}
      />
    </Link>
    <div>
      <a href="/about" className="hover-gradient-link uppercase" style={linkStyle}>
        ABOUT US
      </a>
    </div>
    <div>
      <a href="/contact" className="hover-gradient-link uppercase" style={linkStyle}>
        CONTACT
      </a> 
    </div>
    <div>
      <Button button_text="SIGN IN" />
    </div>

    </div>
    


    
      <style jsx>{`
        .hover-gradient-link {
          transition: all 0.3s ease;
        }
        .hover-gradient-link:hover {
          background: linear-gradient(90deg, #05FFF0 45.37%, #064CFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
      `}</style>
    </nav>
  );
};

export default NavbarUnauth;