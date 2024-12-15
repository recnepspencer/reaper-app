// src/app/home/page.tsx

"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/card/Card";
import AddGoalModal from "../components/AddGoalModal";
import { useUser } from "@clerk/nextjs";
import { useGoals } from "@/lib/hooks/goals/useGoals";
import { useCreateGoal } from "@/lib/hooks/goals/useCreateGoal";
import { useUpdateGoal } from "@/lib/hooks/goals/useUpdateGoal";
import { useEditGoal } from "@/lib/hooks/goals/useEditGoal";
import { useDeleteGoal } from "@/lib/hooks/goals/useDeleteGoal";

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { user } = useUser();

  const { goals, setGoals, loading, error, reloadGoals } = useGoals(user?.id);

  const { createGoal } = useCreateGoal(user?.id, setGoals);

  const { updateStreak, updateCounter, updateTimer } = useUpdateGoal(
    user?.id,
    reloadGoals
  );

  const {
    editGoal,
  } = useEditGoal(user?.id, reloadGoals);

  const {
    deleteGoal,
  } = useDeleteGoal(user?.id, reloadGoals);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="grid grid-cols-2 gap-4 m-4">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              title={goal.title}
              text={goal.description}
              type={goal.type}
              streakValue={goal.streak}
              totalCount={goal.totalCount}
              totalDuration={goal.totalDuration}
              goalId={goal.id}
              onYesNoUpdate={updateStreak}
              onCounterUpdate={updateCounter}
              onTimerUpdate={updateTimer}
              onOpenModal={() => {}}
              onEditGoal={editGoal}
              onDeleteGoal={deleteGoal}
            />
          ))}
        </div>
      </div>

      <AddGoalModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateGoal={(goalData) => createGoal(goalData)}
      />

      <Navbar onCreate={() => setIsCreateModalOpen(true)} />
    </>
  );
}
