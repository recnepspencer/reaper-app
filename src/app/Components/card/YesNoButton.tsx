'use client';

import React from 'react';

interface YesNoButtonProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

const YesNoButton: React.FC<YesNoButtonProps> = ({ onYesClick, onNoClick }) => {
  return (
    <div className="flex justify-center items-center bg-light-gray rounded-lg">
      {/* Yes Button */}
      <button
        onClick={onYesClick}
        className="w-1/2 px-4 py-2 font-bold text-white-smoke transition duration-200 ease-in-out bg-light-gray hover:bg-gray-300 rounded-l-lg border-r-2 border-lighter-gray"
      >
        Yes
      </button>

      {/* No Button */}
      <button
        onClick={onNoClick}
        className="w-1/2 px-4 py-2 font-bold text-white-smoke transition duration-200 ease-in-out bg-light-gray hover:bg-gray-300 rounded-r-lg"
      >
        No
      </button>
    </div>
  );
};

export default YesNoButton;