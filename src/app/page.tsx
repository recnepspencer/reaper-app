'use client';

import React, { useState } from "react";
import Image from "next/image";
import FireIcon from "../src/images/fire.svg";
import Button from "./components/Button";
import Message from "./components/Message";
import YesNoButton from "./components/card/YesNoButton";
import StreakDisplay from "./components/card/StreakDisplay";
import DetailsButton from "./components/card/DetailsButton";
import Counter from "./components/card/Counter";
import Timer from "./components/card/Timer";
import Card from "./components/card/Card";
import Modal from "./components/Modal";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); // State to control modal content

  const handleOpen = (title: string) => {
    setModalTitle(title);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setModalTitle("");
  };

  const handleTimerSubmit = (duration: { hours: number; minutes: number }) => {
    console.log("Submitted duration:", duration);
  };

  const [name, setName] = useState('');
  const handleTimerCancel = () => {
    console.log("Canceled");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <>
        <div className="flex items-center justify-center h-screen">
      <Image 
        src="/images/logo.svg" 
        alt="logo" 
        width={200}
        height={200}
        className="animate-fadeInScale"
      />
    </div>
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-5xl font-bold mb-0 animate-fadeInScale">Welcome to Reaper Goals</h2>
    </div>
    <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
  </>
  );
}
