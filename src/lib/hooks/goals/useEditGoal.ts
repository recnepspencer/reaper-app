// src/hooks/goals/useEditGoal.ts

import { useState } from "react";
import * as GoalService from "@/lib/services/GoalService";

interface UseEditGoalProps {
  userId: string | undefined;
  reloadGoals: () => void;
}

export function useEditGoal(
  userId: string | undefined,
  reloadGoals: () => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editGoal = async (
    goalId: number,
    updatedData: { title: string; description: string; type: string }
  ) => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      await GoalService.updateGoal(userId, goalId, updatedData);
      setError(null);
      reloadGoals(); // Refresh the goals after editing
    } catch (err) {
      console.error("Error editing goal:", err);
      setError("Failed to edit goal");
    } finally {
      setLoading(false);
    }
  };

  return { editGoal, loading, error };
}
