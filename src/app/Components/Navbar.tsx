// components/Navbar.tsx

'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link';
import Modal from './Modal';
import Button from './Button'; 

const Navbar: React.FC = () => {
  const [modalTitle, setModalTitle] = useState(""); // State to control modal content
  const [modalText, setModalText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const handleOpen = (title: string, text:any) => {
    setModalTitle(title);
    setModalText(text);
    setIsOpen(true);
  };

    const handleClose = () => {
    setIsOpen(false);
    setModalTitle("");
    setModalText("");
  };
  
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-dark-gray p-4">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href="/profile">
          <Image src="/images/user.svg" alt="User Icon" width={30} height={30} />
        </Link>

        <Link href="/home">
          <Image src="/images/home-2.svg" alt="Home Icon" width={30} height={32} />
        </Link>

        {/* Create button to open the modal */}
        <Link href='/create'>
          <Image src="/images/plus.svg" alt="Plus Icon" width={48} height={48} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
