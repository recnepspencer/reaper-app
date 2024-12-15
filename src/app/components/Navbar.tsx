'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser, SignOutButton } from '@clerk/nextjs';

interface NavbarProps {
  onCreate: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCreate }) => {
  const { user } = useUser();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-dark-gray p-4">
      <div className="flex justify-between items-center max-w-md mx-auto">
        <Link href="/profile">
          <Image src="/images/user.svg" alt="User Icon" width={30} height={30} />
        </Link>

        {user && (
          <>
            <Link href="/home">
              <Image src="/images/home-2.svg" alt="Home Icon" width={30} height={32} />
            </Link>

            <button onClick={onCreate}>
              <Image src="/images/plus.svg" alt="Plus Icon" width={48} height={48} />
            </button>

            <SignOutButton afterSignOutUrl="/profile">
              <button className="px-4 py-2 ml-4 text-white bg-red-500 rounded hover:bg-red-600">
                Sign Out
              </button>
            </SignOutButton>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;