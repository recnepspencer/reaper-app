// src/hooks/goals/useDeleteGoal.ts

import { useState } from "react";
import * as GoalService from "@/lib/services/GoalService";

export function useDeleteGoal(
  userId: string | undefined,
  reloadGoals: () => void
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteGoal = async (goalId: number) => {
    if (!userId) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    try {
      await GoalService.deleteGoal(goalId);
      setError(null);
      reloadGoals(); // Refresh the goals after deletion
    } catch (err) {
      console.error("Error deleting goal:", err);
      setError("Failed to delete goal");
    } finally {
      setLoading(false);
    }
  };

  return { deleteGoal, loading, error };
}
