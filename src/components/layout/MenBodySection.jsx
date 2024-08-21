import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BuyNowButton from '../ui/BuyNowButton';
import ShopButton from './ShopButton';
import VideoHeaderLarge from '../ui/VideoHeaderLarge';

const MenBodySection = () => { 
    return (
        <div className="relative w-full h-[850px]">
            <Image 
                src="/LongSuy.png" 
                alt="Long Vu Fashion" 
                layout="fill"
                objectFit="cover"
                quality={100}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center w-[505px] mt-[134px] ml-[184px]">
                <h2 className="text-white font-montserrat text-[46.859px] font-bold leading-normal tracking-[14.058px] mb-4">
                    MEN
                </h2>
                <p className="text-white text-center font-montserrat text-[29.193px] font-light leading-[132.688%] tracking-[2.919px] mb-10">
                    Long Vu: Pioneering Vietnamese men's fashion with maximum elegance. 
                    Blending tradition and innovation, he crafts impeccable designs that 
                    elevate cultural pride and sustainable luxury on the global stage through 
                    innovative techniques.
                </p>
                <div>
                    <ShopButton button_text="MEN'S SHOP" />
                </div>
            </div>
        </div>
    );
};

export default MenBodySection;