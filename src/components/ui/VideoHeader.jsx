import React from 'react';

const VideoHeader = ({video_text_normal, video_text_bold}) => {
  return (
    <div className="relative w-full h-[134px] overflow-hidden mx-auto md:max-w-[1920px] mt-[252px]">
      <video 
        autoPlay 
        loop 
        muted 
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/BGVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
        <h1 className="text-white font-montserrat text-[46.859px] leading-normal tracking-[14.058px]">
          <span className="font-light">{video_text_normal}</span>{' '}
          <span className="font-bold">{video_text_bold}</span>
        </h1>
      </div>
    </div>
  );
};

export default VideoHeader;