"use client";
import React, { useState } from "react";
import Image from "next/image";
import FireIcon from "../src/images/fire.svg";
import Button from "../components/Button";
import Message from "../components/Message";
import YesNoButton from "../components/card/YesNoButton";
import StreakDisplay from "../components/card/StreakDisplay";
import DetailsButton from "../components/card/DetailsButton";
import Counter from "../components/card/Counter";
import Timer from "../components/card/Timer";
import Card from "../components/card/Card";
import { TextField } from "@mui/material";
import TextInput from "../components/input/TextInput";
import Modal from "../components/Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleOpen = () => {
    setIsOpen(true);
  }
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
      <div className="flex">
        {/* <Button
          variant="primary"
          onClick={() => console.log("Primary clicked")}
        >
          Primary Button
        </Button>
        <Button
          variant="secondary"
          onClick={() => console.log("Secondary clicked")}
        >
          Secondary Button
        </Button> */}
        <img src="/images/logo.svg" alt="logo" className="w-12 h-12 rounded-full object-cover inline-flex"/>
        <Message variant="secondary">
          <div className="flex items-center space-x-4">
            <span>Nice words for myself</span>
            <img src="/images/login.jpg" alt="login-photo" className="w-12 h-12 rounded-full object-cover" />
          </div>
        </Message>

      </div>
      <div className="flex justify-center items-center h-screen bg-dark-gray">
        <YesNoButton />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <DetailsButton />
        <Counter />
        <Timer onSubmit={handleTimerSubmit} />
        <div className="grid grid-cols-2 gap-4 m-4">
        <div className="p-4">
      <h1 className="text-white">Fill out your information</h1>
      <TextInput
        label="Name"
        value={name}
        onChange={handleChange}
      />
            <div className="text-white mt-4">
        <strong>Current Value:</strong> {name}
      </div>
    </div>
        <Card
          title="Streak Card"
          text="Card Text"
          type="YesNo"
          streakValue="7 Days"
        />
                <Card
          title="Streak Card"
          text="Card Text"
          type="Counter"
          streakValue="7 Days"
        />
                        <Card
          title="Streak Card"
          text="Card Text"
          type="Timer"
          streakValue="7 Days"
        />
        </div>

      </div>
      <div className="flex justify-center items-center h-screen bg-background-black">
        <StreakDisplay bottomText="5 Days" type="Counter" />
        <StreakDisplay bottomText="Yes" type="YesNo" />

        <StreakDisplay timeSpentInHours={32} type="Timer" />
      <div>
            {/* Button to open the modal */}
            <button onClick={() => setIsOpen(true)} className="btn-primary">
                Open Modal
            </button>

            {/* Conditional rendering of the modal */}
            {isOpen && (
                <Modal title="New Goal" variant="secondary" onClose={handleClose}>
                    <Button variant="primary">Submit </Button>
                </Modal>
            )}
        </div>
      </div>
    </>
  );
}
