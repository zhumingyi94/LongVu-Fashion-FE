import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BuyNowButton from '../ui/BuyNowButton';
import ShopButton from './ShopButton';
import VideoHeaderLarge from '../ui/VideoHeaderLarge';

const WomenBodySection = () => { 
    return (
        <div className="relative w-full h-[850px]">
            <Image 
                src="/Women.png" 
                alt="Long Vu Fashion" 
                layout="fill"
                objectFit="cover"
                quality={100}
            />
            <div className="absolute right-0 flex flex-col items-center w-[505px] mt-[134px] mr-[186px]">
    <h2 className="text-white font-montserrat text-[46.859px] font-bold leading-normal tracking-[14.058px] mb-4">
        WOMEN
    </h2>
    <p className="text-white text-center font-montserrat text-[29.193px] font-light leading-[132.688%] tracking-[2.919px] mb-10">
        Long Vu: Elevating Vietnamese women's fashion with graceful innovation.
        Blending tradition and modernity, his designs celebrate cultural heritage
        while empowering women with sustainable, elegant luxury on the global stage.
    </p>
    <div>
        <ShopButton button_text="WOMEN'S SHOP" />
    </div>
</div>
        </div>
    );
};

export default WomenBodySection;