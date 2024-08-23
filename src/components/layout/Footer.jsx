import React, { useState } from 'react';
import Image from 'next/image';

const WhiteFooter = () => {  
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <div className="pt-[80px] w-full gap-[40px] max-w-[1920px] h-[579px] px-4 flex-shrink-0 bg-white flex flex-col items-center justify-center mx-auto">
      <Image src="/LogoFooter.png" alt="Long Vu Fashion" width={300} height={350} />
      <div className="flex flex-row gap-[50px] ">
        <div
          onMouseEnter={() => setHoveredIcon('linkedin')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Image
            src={hoveredIcon === 'linkedin' ? "/linkedin.png" : "/linkedin_black.png"}
            alt="LinkedIn"
            width={45}
            height={45}
          />
        </div>
        <div
          onMouseEnter={() => setHoveredIcon('instagram')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Image
            src={hoveredIcon === 'instagram' ? "/Instagram_grad.png" : "/Instagram.png"}
            alt="Instagram"
            width={45}
            height={45}
          />
        </div>
        <div
          onMouseEnter={() => setHoveredIcon('facebook')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Image
            src={hoveredIcon === 'facebook' ? "/Facebook_grad.png" : "/Facebook.png"}
            alt="Facebook"
            width={45}
            height={45}
          />
        </div>
      </div>
      <div className="text-center text-[#979797] font-montserrat text-[18px] font-light w-[520px]">
        ©2024 Do Minh Nhat - Vu Van Long - Nguyen Quy Dang. All rights reserved.
      </div>
    </div>
  );
};

export default WhiteFooter;
