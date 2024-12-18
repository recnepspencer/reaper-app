"use client";

import React from "react";

export type ModalProps = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ children, title, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative w-full max-w-md p-6 bg-dark-gray rounded-lg shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-primary-text"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary-text">{title}</h2>
        <div className="text-primary-text">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
