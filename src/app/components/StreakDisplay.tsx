'use client';

import React from 'react';
import Image from 'next/image'; 

interface StreakDisplayProps {
  topText: string;
  bottomText: string;
  iconSrc: string; 
  altText: string;

}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ topText, bottomText, iconSrc, altText }) => {
  return (
    <div className="flex items-center space-x-4 bg-dark-gray p-4 rounded-lg">
      <div className="flex flex-col">
        {/* Top Text */}
        <span className="text-secondary-text text-h5">{topText}</span> {/* Using secondary-text color and h5 font size */}

        {/* Bottom Text */}
        <span className="text-primary-text text-h1 font-bold">{bottomText}</span> {/* Using primary-text color and h1 font size */}
      </div>

      {/* Icon */}
      <div className="text-rich-purple text-6xl">
      <Image src={iconSrc} alt={altText} width={48} height={48} />
      </div>
    </div>
  );
};

export default StreakDisplay;
