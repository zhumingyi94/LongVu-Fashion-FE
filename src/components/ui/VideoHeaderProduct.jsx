import React from 'react';

const VideoHeaderLarge = ({video_text_normal, video_text_bold}) => {
  return (
    <div className="relative w-full h-[361px] overflow-hidden mx-auto md:max-w-[1920px]">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/WeCare.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full mt-[80px] ml-[172px]">
        <h1 className="text-white font-montserrat w-[921px] h-[201px] flex flex-col gap-[30px] text-left">
          <span className="font-light text-[83.031px] tracking-[24.909px] leading-[1]">{video_text_normal}</span>
          <span className="font-bold text-[83.031px] tracking-[24.909px] leading-[1] mt-[-10px]">{video_text_bold}</span>
        </h1>
      </div>
    </div>
  );
};

export default VideoHeaderLarge;