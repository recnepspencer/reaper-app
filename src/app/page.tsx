'use client'
import Image from "next/image";
import FireIcon from '../src/images/fire.svg';
import Button from './components/Button';
import YesNoButton from "./components/YesNoButton";
import StreakDisplay from "./components/StreakDisplay";

export default function Home() {
  return (
    <>
    
    <div>
      <Button variant="primary" onClick={() => console.log('Primary clicked')}>
        Primary Button
      </Button>
      <Button variant="secondary" onClick={() => console.log('Secondary clicked')}>
        Secondary Button
      </Button>
    </div>
    <div className="flex justify-center items-center h-screen bg-dark-gray">
      <YesNoButton />
    </div>

    <div className="flex justify-center items-center h-screen bg-background-black">
    <StreakDisplay 
        topText="Streak:" 
        bottomText="7 Days" 
        iconSrc="images/fire.svg"
        altText="Fire Icon"
      />
    </div>
    </>
    
  );
};