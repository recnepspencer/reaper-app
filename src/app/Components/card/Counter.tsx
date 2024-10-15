'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0); // Set initial count value

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count > 0 ? count - 1 : 0); // Ensure the count doesn't go below 0
  };

  return (
    <div className="flex items-center justify-between bg-light-gray p-2 rounded-lg w-36">
      {/* Decrement Button */}
      <button
        onClick={decrement}
        className="p-2 rounded-full hover:bg-gray-300 focus:outline-none"
      >
        <Image
          src="/images/decrement.svg"
          alt="Decrement"
          width={24}
          height={24}
        />
      </button>

      {/* Counter Display */}
      <span className="text-lg font-bold">{count}</span>

      {/* Increment Button */}
      <button
        onClick={increment}
        className="p-2 rounded-full hover:bg-gray-300 focus:outline-none"
      >
        <Image
          src="/images/increment.svg"
          alt="Increment"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default Counter;
