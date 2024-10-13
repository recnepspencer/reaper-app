"use client";
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

export default function Home() {
  const handleTimerSubmit = (duration: { hours: number; minutes: number }) => {
    console.log("Submitted duration:", duration);
  };

  const handleTimerCancel = () => {
    console.log("Canceled");
  };

  return (
    <>
      <div>
        <Button
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
        </Button>
      </div>
      <div className="flex justify-center items-center h-screen bg-dark-gray">
        <YesNoButton />
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <DetailsButton />
        <Counter />
        <Timer onSubmit={handleTimerSubmit} onCancel={handleTimerCancel} />
        <div className="grid grid-cols-2 gap-4 m-4">
        <Card
          title="Streak Card"
          text="Card Text"
          type="streak"
          streakValue="7 Days"
        />
                <Card
          title="Streak Card"
          text="Card Text"
          type="counter"
          streakValue="7 Days"
        />
                        <Card
          title="Streak Card"
          text="Card Text"
          type="timer"
          streakValue="7 Days"
        />
        </div>

      </div>
      <div className="flex justify-center items-center h-screen bg-background-black">
        <StreakDisplay bottomText="5 Days" type="Counter" />
        <StreakDisplay bottomText="Yes" type="YesNo" />

        <StreakDisplay timeSpentInHours={32} type="Timer" />
      </div>
    </>
  );
}
