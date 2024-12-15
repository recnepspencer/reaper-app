'use client';

import React, { useEffect } from 'react';
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Button from '../components/Button';

const ProfilePage = () => {
  const { user } = useUser();
  const router = useRouter();

  
  useEffect(() => {
    if (!user) {
      router.push('/profile'); 
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto p-6">
          <div className="flex justify-center items-center h-screen bg-black">
            <div className="text-center p-6 bg-black shadow-lg rounded-xl max-w-lg mx-auto">
              <p className="text-2xl font-semibold text-primary-text mb-4">
                Please sign in :
              </p>
              <p className="text-lg text-gray-500">
              You need to log in to access this page. Sign in to continue.
              </p>
              <div className="mt-6">
                <SignInButton>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none">
                    Log in
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="w-full max-w-sm p-6 bg-card-background rounded-lg shadow-md">
        {user.imageUrl && (
          <img
            src={user.imageUrl}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mx-auto"
          />
        )}
        <h1 className="mt-4 text-xl font-semibold text-center">{user.fullName || "No Name"}</h1>
        <p className="mt-2 text-sm text-center text-primary-text">{user.emailAddresses[0].emailAddress}</p>
        <div className="mt-6 text-center">
          <SignOutButton>
            <Button variant="danger">
              Sign Out
            </Button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;