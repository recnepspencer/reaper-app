'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

interface NavbarProps {
  onCreate: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreate }) => {
  const { user } = useUser();

  if (!user) return null; // Hide the navbar if the user is not authenticated

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-dark-gray p-4">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href="/profile">
          <Image src="/images/user.svg" alt="User Icon" width={30} height={30} />
        </Link>

        <Link href="/home">
          <Image src="/images/home-2.svg" alt="Home Icon" width={30} height={32} />
        </Link>

        <button onClick={onCreate}>
          <Image src="/images/plus.svg" alt="Plus Icon" width={48} height={48} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
