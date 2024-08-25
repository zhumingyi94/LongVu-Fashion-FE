import React from 'react';

const VideoHeaderProduct = ({video_text_normal, video_text_bold}) => {
  return (
    <div className="relative w-full h-[200px] overflow-hidden mx-auto md:max-w-[1920px]">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/WeCare.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between p-8">
        <h1 className="text-white font-montserrat w-full flex flex-col gap-4 text-left">
          <span className="font-light text-[75.546px] tracking-[22.664px] leading-normal">{video_text_normal}</span>
          <span className="font-bold text-[75.546px] tracking-[22.664px] leading-normal">{video_text_bold}</span>
        </h1>
        <h2 className="text-white font-montserrat text-[75.546px] font-thin tracking-[22.664px] leading-normal self-center">
          YOU MIGHT ALSO 
          <span className="font-bold ml-6 bg-gradient-to-r from-[#05FFF0] to-[#064CFF] bg-clip-text text-transparent">
            LIKE
          </span>
        </h2>
      </div>
    </div>
  );
};

export default VideoHeaderProduct;