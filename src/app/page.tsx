'use client'
import Image from "next/image";
import FireIcon from '../src/images/fire.svg';
import Button from './components/Button';
import Message from './components/Message';
import YesNoButton from "./components/YesNoButton";
import StreakDisplay from "./components/StreakDisplay";

export default function Home() {
  return (
    <>
    
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Message variant="secondary">Primary Message <Button variant="secondary">X</Button></Message>
    </div>
    </>
    
  );
};