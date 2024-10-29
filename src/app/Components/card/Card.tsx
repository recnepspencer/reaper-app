"use client";

import React from "react";
import DetailsButton from "./DetailsButton";
import StreakDisplay from "./StreakDisplay";
import Timer from "./Timer";
import Counter from "./Counter";
import YesNoButton from "./YesNoButton";

interface CardProps {
  title: string;
  text: string;
  type: "YesNo" | "Timer" | "Counter";
  streakValue?: string; // For streak type to show the number of days (e.g., '7 Days')
  onSubmitTimer?: (duration: { hours: number; minutes: number }) => void; // Timer submit handler
  onCancelTimer?: () => void; // Timer cancel handler
  onOpenModal: () => void; // Modal open handler
  // onDelete?: () => void;
  className?: string; // Allowing className to be passed for width and other styling from container
}

const Card: React.FC<CardProps> = ({
  title,
  text,
  type,
  streakValue,
  onSubmitTimer,
  onCancelTimer,
  className,
  onOpenModal,
  // onDelete,
}) => {
  // Determine the text based on the type of card
  const getPrompt = (cardType: string) => {
    switch (cardType) {
      case "Counter":
        return "Count progress for your goal today.";
      case "Timer":
        return "How long did you spend on your goal today?";
      case "YesNo":
        return "Did you complete your goal today?";
      default:
        return "";
    }
  };

  return (
    <div className={`relative bg-dark-gray p-4 rounded-lg ${className}`}>
      {/* Details Button in the top right */}
      <div className="absolute top-1 right-2">
        <DetailsButton
          onOpenModal={() => {
            console.log("Details Button Clicked in Card");
            onOpenModal();
          }}
        />
      </div>

      {/* Card Title */}
      <h2 className="text-white mt-4 text-card-title font-bold mb-0">
        {title}
      </h2>

      {/* Card Text */}
      <p className="text-secondary-text text-card-subtitle mb-4">{text}</p>

      {/* Conditional text based on the card type */}
      <p className="text-white text-card-text mb-4">{getPrompt(type)}</p>

      {/* Type-specific content */}
      {type === "YesNo" && (
        <>
          {/* Yes/No Button for streak */}
          <YesNoButton />
          {/* Streak Display centered below the YesNoButton */}
          <div className="flex justify-center mt-2">
            <StreakDisplay type="YesNo" bottomText="5 Times" />
          </div>
        </>
      )}

      {type === "Timer" && (
        <>
          {/* Timer Component */}
          <Timer onSubmit={onSubmitTimer!} />
          <div className="flex justify-center mt-2">
            <StreakDisplay type="Timer" bottomText={streakValue || "0 Days"} />
          </div>
        </>
      )}

      {type === "Counter" && (
        <>
          {/* Counter Component */}
          <Counter />
          <div className="flex justify-center mt-2">
            <StreakDisplay
              type="Counter"
              bottomText={streakValue || "0 Days"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
