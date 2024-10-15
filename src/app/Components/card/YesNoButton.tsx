'use client';

import React, { useState } from 'react';

const YesNoButton: React.FC = () => {
  const [active, setActive] = useState<'yes' | 'no' | null>(null);

  const baseButtonStyle =
    'w-1/2 px-4 py-2 font-bold text-white-smoke transition duration-200 ease-in-out';
  const activeButtonStyle = 'bg-white text-light-gray'; // White background, light gray text when active
  const inactiveButtonStyle = 'bg-light-gray text-white-smoke'; // Default state for unselected buttons

  return (
    <div className="flex justify-center items-center bg-light-gray rounded-lg">
      {/* Yes Button */}
      <button
        onMouseDown={() => setActive('yes')}
        onMouseUp={() => setActive(null)}
        className={`${baseButtonStyle} ${active === 'yes' ? activeButtonStyle : inactiveButtonStyle} rounded-l-lg border-r-2 border-lighter-gray`}  // Border added to the right side
      >
        Yes
      </button>

      {/* No Button */}
      <button
        onMouseDown={() => setActive('no')}
        onMouseUp={() => setActive(null)}
        className={`${baseButtonStyle} ${active === 'no' ? activeButtonStyle : inactiveButtonStyle} rounded-r-lg`}
      >
        No
      </button>
    </div>
  );
};

export default YesNoButton;
