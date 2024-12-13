// src/hooks/useUpdateGoal.ts

import * as GoalService from '@/lib/services/GoalService';

export function useUpdateGoal(userId: string | undefined, reloadGoals: () => void) {
  const updateStreak = async (goalId: number, isYes: boolean) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }
    try {
      await GoalService.updateStreak(userId, goalId, isYes);
      reloadGoals();
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const updateCounter = async (goalId: number, countChange: number) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }
    try {
      await GoalService.updateCounter(userId, goalId, countChange);
      reloadGoals();
    } catch (error) {
      console.error('Error updating counter:', error);
    }
  };

  const updateTimer = async (goalId: number, duration: { hours: number; minutes: number }) => {
    if (!userId) {
      console.error('User not authenticated');
      return;
    }
    try {
      await GoalService.updateTimer(userId, goalId, duration);
      reloadGoals();
    } catch (error) {
      console.error('Error updating timer:', error);
    }
  };

  return { updateStreak, updateCounter, updateTimer };
}
