import React, { useState } from 'react';
import Image from 'next/image';

const WhiteFooter = () => {  
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <div className="w-full gap-[40px] max-w-[1920px] h-[579px] px-4 flex-shrink-0 bg-white flex flex-col items-center justify-center mx-auto">
      <Image src="/LogoFooter.png" alt="Long Vu Fashion" width={407} height={564} />
      <div className="flex flex-row gap-[60px] mt-4">
        <div
          onMouseEnter={() => setHoveredIcon('linkedin')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Image
            src={hoveredIcon === 'linkedin' ? "/linkedin.png" : "/linkedin_black.png"}
            alt="LinkedIn"
            width={56}
            height={51}
          />
        </div>
        <div
          onMouseEnter={() => setHoveredIcon('instagram')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Image
            src={hoveredIcon === 'instagram' ? "/Instagram_grad.png" : "/Instagram.png"}
            alt="Instagram"
            width={56}
            height={51}
          />
        </div>
        <div
          onMouseEnter={() => setHoveredIcon('facebook')}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <Image
            src={hoveredIcon === 'facebook' ? "/Facebook_grad.png" : "/Facebook.png"}
            alt="Facebook"
            width={56}
            height={51}
          />
        </div>
      </div>
      <div className="text-center text-[#979797] font-montserrat text-[23.466px] font-light w-[601px]">
        ©2024 Do Minh Nhat - Vu Van Long - Nguyen Quy Dang. All rights reserved.
      </div>
    </div>
  );
};

export default WhiteFooter;
