import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';


const FashionLoadingAnimation = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [imagesRevealed, setImagesRevealed] = useState(0);

  const images = Array.from({length: 9}, (_, i) => `/An${i + 1}.png`);

  const completeLoading = useCallback(() => {
    onLoadingComplete();
  }, [onLoadingComplete]);

  useEffect(() => {
    const totalDuration = 3000; // 3 seconds total duration
    const revealInterval = totalDuration / 9; // Time to reveal each image
    const progressInterval = 16; // Update progress every 16ms for smooth animation

    const progressTimer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + (100 / (totalDuration / progressInterval)), 100);
        return newProgress;
      });
    }, progressInterval);

    const imageTimer = setInterval(() => {
      setImagesRevealed((prev) => {
        const next = prev + 1;
        if (next >= 9) {
          clearInterval(imageTimer);
          clearInterval(progressTimer);
          setTimeout(completeLoading, 500); // Delay completion to ensure full visibility
        }
        return next;
      });
    }, revealInterval);

    return () => {
      clearInterval(progressTimer);
      clearInterval(imageTimer);
    };
  }, [completeLoading]);

  return (
    <div className="h-screen bg-black flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-7xl px-4">
        <div className="flex justify-between items-center">
          {images.map((src, index) => (
            <div
              key={index}
              className="w-[190px] overflow-hidden mx-1 transition-all duration-300 ease-out"
              style={{
                height: index % 2 === 0 ? '795px' : '695px',
                transform: `translateY(${index < imagesRevealed ? '0' : '100%'})`,
                opacity: index < imagesRevealed ? 1 : 0,
                borderRadius: '26.14px',
              }}
            >
              <img 
                src={src} 
                alt={`Fashion ${index + 1}`} 
                className="w-full h-full object-cover"
                style={{
                  objectPosition: index % 2 === 0 ? 'center top' : 'center bottom',
                  borderRadius: '26.14px',
                }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-6xl font-sans tracking-widest">
            <Image src="/Logo.png" width={454} height={270}/>
          </div>
        </div>
      </div>
      <div className="mt-8 w-full max-w-7xl bg-gray-800 h-1 px-4">
        <div
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FashionLoadingAnimation;