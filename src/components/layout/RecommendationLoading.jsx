import React from 'react';

export default function RecommendationLoading() {
  return (
    <div className="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        className="w-120 h-60" // Làm SVG bé hơn bằng cách điều chỉnh width và height
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#05FFF0">
              <animate
                attributeName="stop-color"
                values="#05FFF0; #064CFF; #05FFF0"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="#064CFF">
              <animate
                attributeName="stop-color"
                values="#064CFF; #05FFF0; #064CFF"
                dur="2s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>
        </defs>

        <rect
          x="25"
          y="45"
          width="150"
          height="10"
          rx="5"
          ry="5"
          fill="url(#gradient)"
        >
          <animate
            attributeName="width"
            values="0; 150; 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>

        <circle
          cx="100"
          cy="50"
          r="30"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="5"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 188.5"
            to="188.5 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
      <div
        className="text-[50px] font-montserrat text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-600 animate-bounce"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradientMove 2s infinite',
        }}
      >
        LOADING
      </div>

      <style jsx>{`
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
