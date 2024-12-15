'use client';

import React from 'react';
import Image from 'next/image';

interface StreakDisplayProps {
  type: 'Counter' | 'Timer' | 'YesNo';
  bottomText?: string; // Only needed for Counter and YesNo
  timeSpentInHours?: number; // Only needed for Timer
}

const StreakDisplay: React.FC<StreakDisplayProps> = ({ type, bottomText = '', timeSpentInHours = 0 }) => {
  // Logic to determine the icon, top text, and bottom text based on the type
  let iconSrc = '';
  let altText = '';
  let topText = '';

  switch (type) {
    case 'Counter':
      iconSrc = '/images/fire.svg';
      altText = 'Streak';
      topText = 'Current Streak';
      break;
    case 'YesNo':
      iconSrc = '/images/like.svg';
      altText = 'Yes/No';
      topText = 'Times Completed';
      break;
    case 'Timer':
      iconSrc = '/images/clock.svg';
      altText = 'Timer';
      topText = 'Total Time Spent';
      break;
  }

  // Function to format the time spent for the Timer type
  const formatTime = (timeInHours: number): string => {
    if (timeInHours < 24) {
      // Return time in hours with one decimal place
      return `${timeInHours.toFixed(1)} Hours`;
    } else {
      // Return time in days with two decimal places
      const timeInDays = timeInHours / 24;
      return `${timeInDays.toFixed(2)} Days`;
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-dark-gray rounded-lg">
      <div className="flex flex-col">
        {/* Top Text (always the same for each type) */}
        <span className="text-secondary-text text-mini-text">{topText}</span>
  
        {/* Bottom Text or Timer Display */}
        {type === 'Timer' ? (
          <span className="text-primary-text text-h6 font-bold">{formatTime(timeSpentInHours)}</span>
        ) : (
          <span className="text-primary-text text-h6 font-bold">{bottomText}</span>
        )}
      </div>
  
      {/* Icon */}
      <div className="text-rich-purple text-6xl">
        <Image src={iconSrc} alt={altText} width={32} height={32} />
      </div>
    </div>
  );  
};

export default StreakDisplay;
