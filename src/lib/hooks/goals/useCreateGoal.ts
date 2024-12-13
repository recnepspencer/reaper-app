// src/hooks/useCreateGoal.ts

import { useState } from 'react';
import { Goal, GoalType } from '@/lib/interfaces/goals.interface';
import * as GoalService from '@/lib/services/GoalService';

export function useCreateGoal(userId: string | undefined, setGoals: React.Dispatch<React.SetStateAction<Goal[]>>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createGoal = async (goalData: { title: string; description: string; type: GoalType }) => {
    if (!userId) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    try {
      const createdGoal = await GoalService.createGoal(userId, goalData);
      setGoals((prevGoals) => [...prevGoals, createdGoal]);
      setError(null);
    } catch (err) {
      console.error('Error creating goal:', err);
      setError('Failed to create goal');
    } finally {
      setLoading(false);
    }
  };

  return { createGoal, loading, error };
}
