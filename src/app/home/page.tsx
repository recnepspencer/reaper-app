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
import { title } from "process";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState(""); // State to control modal content
  const [modalText, setModalText] = useState("");

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
        <img src="/images/logo.svg" alt="logo" className="w-12 h-12 rounded-full object-cover inline-flex"/>
        <Message variant="secondary">
          <div className="flex items-center space-x-4">
            <span>Nice words for myself</span>
            <img src="/images/login.jpg" alt="login-photo" className="w-12 h-12 rounded-full object-cover" />
          </div>
        </Message>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-2 gap-4 m-4">
          <Card
            title="Streak Card"
            text="Card Text"
            type="YesNo"
            streakValue="7 Days"
            onOpenModal={handleOpen}
          />
          <Card
            title="Counter Card"
            text="Card Text"
            type="Counter"
            streakValue="7 Days"
            onOpenModal={handleOpen}
          />
          <Card
            title="Timer Card"
            text="Card Text"
            type="Timer"
            streakValue="7 Days"
            onOpenModal={handleOpen}
          />
        </div>
      </div>

      {/* Display modal if isOpen is true */}
      {isOpen && (
        <Modal title={modalTitle} text={modalText} variant="secondary" onClose={handleClose}>
          <TextInput label={modalTitle} value={modalTitle} onChange={handleChange} />
          <TextInput label={modalText} value={modalText} onChange={handleChange} />
          <TextInput label="Name" value={name} onChange={handleChange} />
          <Button variant="primary">Submit</Button>
        </Modal>
      )}

      <div className="flex justify-center items-center h-screen bg-background-black">
        <StreakDisplay bottomText="5 Days" type="Counter" />
        <StreakDisplay bottomText="Yes" type="YesNo" />
        <StreakDisplay timeSpentInHours={32} type="Timer" />
        
        {/* Button to open modal */}
        {/* <button onClick={() => handleOpen("New Goal")} className="btn-primary">
          Open Modal
        </button> */}
      </div>
    </>
  );
}
