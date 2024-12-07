

"use client";

import React, { useState } from "react";
import DetailsButton from "./DetailsButton";
import StreakDisplay from "./StreakDisplay";
import Timer from "./Timer";
import Counter from "./Counter";
import YesNoButton from "./YesNoButton";
import EditModal from "../EditModal";
import DeleteAlert from "../DeleteAlert";

interface CardProps {
  title: string;
  text: string;
  type: "YESNO" | "TIMER" | "COUNTER";
  streakValue?: number;
  totalCount?: number;
  totalDuration?: number;
  goalId: number;
  onCancelTimer?: () => void;
  onYesNoUpdate: (goalId: number, isYes: boolean) => Promise<void>;
  onCounterUpdate: (goalId: number, countChange: number) => Promise<void>;
  onTimerUpdate: (
    goalId: number,
    duration: { hours: number; minutes: number }
  ) => Promise<void>;
  onOpenModal: () => void;
  className?: string;
  onEditGoal: (
    goalId: number,
    updatedData: { title: string; description: string; type: string }
  ) => void;
  onDeleteGoal: (goalId: number) => void;
}

const Card: React.FC<CardProps> = ({
  title,
  text,
  type,
  streakValue,
  totalCount,
  totalDuration,
  goalId,
  onCancelTimer,
  onYesNoUpdate,
  onCounterUpdate,
  onTimerUpdate,
  className,
  onOpenModal,
  onEditGoal,
  onDeleteGoal,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);

  const getPrompt = (cardType: string) => {
    switch (cardType) {
      case "COUNTER":
        return "Count progress for your goal today.";
      case "TIMER":
        return "How long did you spend on your goal today?";
      case "YESNO":
        return "Did you complete your goal today?";
      default:
        return "";
    }
  };

  const getTrackingValue = () => {
    switch (type) {
      case "YESNO":
        return `${streakValue || 0} Days`;
      case "TIMER":
        const timeInHours = (totalDuration || 0) / 60;
        return timeInHours;
      case "COUNTER":
        return `${totalCount || 0} Times`;
      default:
        return "";
    }
  };

  return (
    <div className={`relative bg-dark-gray p-4 rounded-lg ${className}`}>
      <div className="absolute top-1 right-2">
        <DetailsButton
          onOpenModal={() => setIsEditModalOpen(true)}
          onDelete={() => setIsDeleteAlertOpen(true)}
        />
      </div>

      <h2 className="text-white mt-4 text-card-title font-bold mb-0">
        {title}
      </h2>

      <p className="text-secondary-text text-card-subtitle mb-4">{text}</p>

      <p className="text-white text-card-text mb-4">{getPrompt(type)}</p>

      {type === "YESNO" && (
        <>
          <YesNoButton
            onYesClick={() => onYesNoUpdate(goalId, true)}
            onNoClick={() => onYesNoUpdate(goalId, false)}
          />
          <div className="flex justify-center mt-2">
            <StreakDisplay
              type="YesNo"
              bottomText={`${streakValue ?? 0} Days`}
            />
          </div>
        </>
      )}

      {type === "TIMER" && (
        <>
          <Timer onSubmit={(duration) => onTimerUpdate(goalId, duration)} />
          <div className="flex justify-center mt-2">
            <StreakDisplay
              type="Timer"
              timeSpentInHours={(totalDuration || 0) / 60} 
            />
          </div>
        </>
      )}
      {type === "COUNTER" && (
        <>
          <Counter
            count={totalCount ?? 0}
            onIncrement={() => onCounterUpdate(goalId, 1)}
            onDecrement={() => onCounterUpdate(goalId, -1)}
          />
          <div className="flex justify-center mt-2">
            <StreakDisplay
              type="Counter"
              bottomText={`${totalCount ?? 0} Times`}
            />
          </div>
        </>
      )}

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditGoal={onEditGoal}
        goal={{ id: goalId, title, description: text, type }}
      />
      <DeleteAlert
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
        onDelete={async () => {
          await onDeleteGoal(goalId); 
          console.log("Goal deleted successfully"); 
        }}
      />
    </div>
  );
};

export default Card;
