// components/card/Counter.tsx

'use client';

import React from 'react';
import Image from 'next/image';

interface CounterProps {
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({ count, onIncrement, onDecrement }) => {
  return (
    <div className="flex items-center justify-between bg-light-gray p-2 rounded-lg w-36">
      {/* Decrement Button */}
      <button
        onClick={onDecrement}
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
        onClick={onIncrement}
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
