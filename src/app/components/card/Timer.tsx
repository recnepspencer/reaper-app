"use client";
import React, { useState } from "react";
import Button from "../Button"; // Assuming Button component is in the same directory

interface TimerProps {
  onSubmit: (duration: { hours: number; minutes: number }) => void;
}

const Timer: React.FC<TimerProps> = ({ onSubmit }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isEditing, setIsEditing] = useState(false);


  const handleSubmit = () => {
    onSubmit({ hours, minutes });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {/* Timer display */}
      <div
        className="bg-light-gray text-white text-4xl p-4 rounded-lg text-center cursor-pointer"
        onClick={() => setIsEditing(!isEditing)}
      >
        {`${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`}
      </div>

      {/* Duration selection popup */}
      {isEditing && (
        <div
          className="absolute bg-medium-gray p-4 rounded-lg shadow-lg mt-2 w-[300px] z-10"
          style={{ left: "50%", transform: "translateX(-50%)" }} // Center it
        >
          <div className="flex w-full justify-center mb-4">
            {/* Hour Selector */}
            <div className="flex justify-between mb-4">
              {/* Hour Selector */}
              <div className="flex flex-col items-center mr-2">
                <label htmlFor="hours" className="block text-sm text-white">
                  Hours
                </label>
                <input
                  id="hours"
                  type="number"
                  value={hours}
                  onChange={(e) =>
                    setHours(Math.max(0, Math.min(23, Number(e.target.value))))
                  } // Ensure valid range
                  className="bg-lighter-gray border-none p-2 rounded text-center w-16"
                  min={0}
                  max={23}
                />
              </div>

              {/* Minute Selector */}
              <div className="flex flex-col items-center ml-2">
                <label htmlFor="minutes" className="block text-sm text-white">
                  Minutes
                </label>
                <input
                  id="minutes"
                  type="number"
                  value={minutes}
                  onChange={(e) =>
                    setMinutes(
                      Math.max(0, Math.min(59, Number(e.target.value)))
                    )
                  } // Ensure valid range
                  className="bg-lighter-gray border-none p-2 rounded text-center w-16"
                  min={0}
                  max={59}
                />
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between">
            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              variant="primary"
              className="w-full mr-2"
            >
              Submit
            </Button>
            {/* Cancel button */}
            <Button
              onClick={handleCancel}
              variant="secondary"
              className="w-full ml-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
