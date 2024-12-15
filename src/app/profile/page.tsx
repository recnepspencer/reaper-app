'use client';

import React from 'react';
import { useUser, SignOutButton, SignInButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; 

const ProfilePage = () => {
  const { user } = useUser();
  const router = useRouter(); 

  
  const handleSignOut = () => {
    router.push('/profile'); 
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="text-center p-6 bg-white shadow-lg rounded-xl max-w-lg mx-auto">
              <p className="text-2xl font-semibold text-gray-700 mb-4">
                Actually, try to log in :)
              </p>
              <p className="text-lg text-gray-500">
                We need you to log in to access this page. Please sign in to continue.
              </p>
              <div className="mt-6">
                {/* Use SignInButton from Clerk for signing in */}
                <SignInButton>
                  <button className="px-6 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none">
                    Login
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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        {user.imageUrl && (
          <img
            src={user.imageUrl}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mx-auto"
          />
        )}
        <h1 className="mt-4 text-xl font-semibold text-center">{user.fullName || "No Name"}</h1>
        <p className="mt-2 text-sm text-center text-gray-600">{user.emailAddress}</p>
        <div className="mt-6 text-center">
          {/* SignOutButton is already provided by Clerk */}
          <SignOutButton>
            <button className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;