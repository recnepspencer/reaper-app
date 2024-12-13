"use client";

import React, { useState } from "react";
import Button from "../Button";
import Image from "next/image";

interface DetailsButtonProps {
  onOpenModal: () => void;
  onDelete: () => void; // This prop should trigger the delete functionality
}

const DetailsButton: React.FC<DetailsButtonProps> = ({
  onOpenModal,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Details Icon Button */}
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-lg hover:bg-gray-200 focus:outline-none"
      >
        <Image
          src="/images/details-button.svg"
          alt="Details"
          width={16}
          height={16}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 shadow-lg rounded-md z-10">
          <div className="py-1">
            {/* Edit Button */}
            <Button
              onClick={() => {
                onOpenModal();
                setIsOpen(false); // Close the dropdown
              }}
              variant="secondary"
              className="w-full text-left px-4 py-2"
            >
              Edit
            </Button>
            {/* Delete Button */}
            <Button
              onClick={() => {
                onDelete(); // Call the onDelete prop
                setIsOpen(false); // Close the dropdown
              }}
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
