// src/hooks/useGoals.ts

import { useState, useEffect } from 'react';
import { Goal } from '@/lib/interfaces/goals.interface';
import * as GoalService from '@/lib/services/GoalService';

export function useGoals(userId: string | undefined) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGoals = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const data = await GoalService.fetchGoals(userId);
      setGoals(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching goals:', err);
      setError('Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadGoals();
    }
  }, [userId]);

  return { goals, setGoals, loading, error, reloadGoals: loadGoals };
}
