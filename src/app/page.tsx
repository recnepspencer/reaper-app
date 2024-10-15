'use client'
import React, { useState } from "react";
import Image from "next/image";
import FireIcon from '../src/images/fire.svg';
import Button from './components/Button';
import Message from './components/Message';
import YesNoButton from "./components/YesNoButton";
import StreakDisplay from "./components/StreakDisplay";
import Modal from "./components/Modal";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleOpen = () => {
    setIsOpen(true);
  }
  return (
    <>
    
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Message variant="secondary">Primary Message <Button variant="secondary">X</Button></Message>
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
};