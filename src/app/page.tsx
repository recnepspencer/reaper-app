'use client';

import Message from "./components/Message";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex">
      <Image 
        src="/images/logo.svg" 
        alt="logo" 
        width={48} 
        height={48} 
        className="rounded-full object-cover inline-flex"
      />
      <Message variant="secondary">
        <div className="flex items-center space-x-4">
          <span>Nice words for myself</span>
          <Image 
            src="/images/login.jpg" 
            alt="login-photo" 
            width={48} 
            height={48} 
            className="rounded-full object-cover" 
          />
        </div>
      </Message>
    </div>
  );
}
