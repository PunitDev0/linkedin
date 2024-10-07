'use client'
import React from 'react'

const Loader = () => {
    return (
      <div className="loader relative mx-auto w-[48px] h-[48px]">
        <div className="absolute top-[60px] left-0 w-[48px] h-[5px] rounded-full bg-[#f0808050] animate-shadow"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-[4px] bg-[#f08080] animate-jump"></div>
        <style jsx>{`
          @keyframes jump7456 {
            15% {
              border-bottom-right-radius: 3px;
            }
  
            25% {
              transform: translateY(9px) rotate(22.5deg);
            }
  
            50% {
              transform: translateY(18px) scale(1, 0.9) rotate(45deg);
              border-bottom-right-radius: 40px;
            }
  
            75% {
              transform: translateY(9px) rotate(67.5deg);
            }
  
            100% {
              transform: translateY(0) rotate(90deg);
            }
          }
  
          @keyframes shadow324 {
            0%,
            100% {
              transform: scale(1, 1);
            }
  
            50% {
              transform: scale(1.2, 1);
            }
          }
  
          .animate-jump {
            animation: jump7456 0.5s linear infinite;
          }
  
          .animate-shadow {
            animation: shadow324 0.5s linear infinite;
          }
        `}</style>
      </div>
    );
  };
  
  export default Loader;
  