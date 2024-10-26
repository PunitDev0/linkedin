// Spinner.jsx
import React from 'react';

export default function Spinner() {
  const divStyles = (delay, rotation) => ({
    '--delay': `${delay}s`,
    '--rotation': `${rotation}deg`,
    '--translation': '150%',
    animationDelay: `${delay}s`,
    transform: `rotate(${rotation}deg) translateY(150%)`,
  });

  return (
    <div className="relative w-full h-full">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1/2 h-[150%] bg-black animate-spinner"
          style={divStyles((i + 1) * 0.1, (i + 1) * 36)}
        />
      ))}
    </div>
  );
}
