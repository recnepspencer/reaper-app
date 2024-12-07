// lib/services/GoalService.ts

import { Goal, GoalType } from '@/lib/interfaces/goals.interface';

export const fetchGoals = async (userId: string): Promise<Goal[]> => {
  try {
    const response = await fetch(`/api/goals?userId=${userId}`);
    if (!response.ok) throw new Error('Failed to fetch goals');
    return await response.json();
  } catch (error) {
    console.error('Error fetching goals:', error);
    throw error;
  }
};

export const createGoal = async (userId: string, goalData: { title: string; description: string; type: GoalType }): Promise<Goal> => {
  try {
    const response = await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...goalData, userId }),
    });
    if (!response.ok) throw new Error('Failed to create goal');
    return await response.json();
  } catch (error) {
    console.error('Error creating goal:', error);
    throw error;
  }
};

export const updateStreak = async (userId: string, goalId: number, isYes: boolean): Promise<void> => {
  try {
    const response = await fetch('/api/userGoals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, goalId, action: 'yesno', isYes }),
    });
    if (!response.ok) throw new Error('Failed to update streak');
  } catch (error) {
    console.error('Error updating streak:', error);
    throw error;
  }
};

export const updateCounter = async (userId: string, goalId: number, countChange: number): Promise<void> => {
  try {
    const response = await fetch('/api/userGoals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, goalId, action: 'counter', countChange }),
    });
    if (!response.ok) throw new Error('Failed to update counter');
  } catch (error) {
    console.error('Error updating counter:', error);
    throw error;
  }
};

export const updateTimer = async (userId: string, goalId: number, duration: { hours: number; minutes: number }): Promise<void> => {
  try {
    const totalMinutes = duration.hours * 60 + duration.minutes;
    const response = await fetch('/api/userGoals', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, goalId, action: 'timer', duration: totalMinutes }),
    });
    if (!response.ok) throw new Error('Failed to update timer');
  } catch (error) {
    console.error('Error updating timer:', error);
    throw error;
  }
};

export async function deleteGoal(goalId: number): Promise<void> {
  const response = await fetch(`/api/goals/${goalId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete goal");
  }
}

export async function updateGoal(
  userId: string,
  goalId: number,
  updatedData: { title: string; description: string; type: string }
): Promise<void> {
  const response = await fetch(`/api/goals/${goalId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      action: "update", // Assuming 'update' is the action you handle
      ...updatedData,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to update goal");
  }
}