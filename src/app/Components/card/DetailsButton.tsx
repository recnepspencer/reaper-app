'use client';
import React, { useState } from 'react';
import Button from '../Button'; // Assuming Button component is in the same directory
import Image from 'next/image'; // Assuming you are using Next.js for image optimization

const DetailsButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Details Icon Button */}
      <button onClick={toggleDropdown} className="p-2 rounded-lg hover:bg-gray-200 focus:outline-none">
        <Image
          src="/images/details-button.svg" // Assuming the SVG is in the public/images folder
          alt="Details"
          width={16}
          height={16}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-none shadow-lg rounded-md z-10">
          <div className="py-1">
            {/* Edit Button */}
            <Button
              onClick={() => console.log('Edit clicked')}
              variant="secondary"
              className="w-full text-left px-4 py-2"
            >
              Edit
            </Button>
            {/* Delete Button */}
            <Button
              onClick={() => console.log('Delete clicked')}
              variant="danger"
              className="w-full text-left px-4 py-2"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsButton;
