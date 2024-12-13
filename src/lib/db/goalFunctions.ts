// lib/db/goalFunctions.ts
 
import { GoalData,  } from '../interfaces/goals.interface';
import prisma from './prisma';

import { GoalType } from '../interfaces/goals.interface';

// Create a new goal
export async function createGoal(userId: string, data: GoalData) {
  try {
    const newGoal = await prisma.goal.create({
      data: {
        ...data,
        users: {
          create: {
            userId: userId as string,
            streak: 0,
            totalCount: 0,
            totalDuration: 0,
          },
        },
      },
      include: {
        users: true,
      },
    });
    return newGoal;
  } catch (error) {
    console.error('Error creating goal:', error);
    throw new Error('Failed to create goal');
  }
}
 
// Retrieve a goal by ID
export async function getGoalById(id: number) {
  try {
    return await prisma.goal.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Error fetching goal by ID:', error);
    throw new Error('Failed to fetch goal');
  }
}
 
// Update a goal
interface YesNoData {
  isYes: boolean;
}

interface CounterData {
  countChange: number;
}

interface TimerData {
  duration: number;
}

type UpdateUserGoalData = YesNoData | CounterData | TimerData;

export async function updateUserGoal(userId: string, goalId: number, action: string, data: UpdateUserGoalData) {
  switch (action) {
    case 'yesno':
      return await handleYesNoUpdate(userId, goalId, (data as YesNoData).isYes);
    case 'counter':
      return await handleCounterUpdate(userId, goalId, (data as CounterData).countChange);
    case 'timer':
      return await handleTimerUpdate(userId, goalId, (data as TimerData).duration);
    default:
      throw new Error('Invalid action');
  }
}
 
async function handleYesNoUpdate(userId: string, goalId: number, isYes: boolean) {
  const userGoal = await prisma.userGoal.findUnique({
    where: { userId_goalId: { userId, goalId } },
  });
 
  if (!userGoal) throw new Error('UserGoal not found');
 
  const newStreak = isYes ? (userGoal.streak ?? 0) + 1 : 0;
 
  return await prisma.userGoal.update({
    where: { userId_goalId: { userId, goalId } },
    data: { streak: newStreak },
  });
}
 
async function handleCounterUpdate(userId: string, goalId: number, countChange: number) {
  const userGoal = await prisma.userGoal.findUnique({
    where: { userId_goalId: { userId, goalId } },
  });
 
  if (!userGoal) throw new Error('UserGoal not found');
 
  const newTotalCount = (userGoal.totalCount ?? 0) + countChange;
 
  return await prisma.userGoal.update({
    where: { userId_goalId: { userId, goalId } },
    data: { totalCount: newTotalCount },
  });
}
 
async function handleTimerUpdate(userId: string, goalId: number, duration: number) {
  const userGoal = await prisma.userGoal.findUnique({
    where: { userId_goalId: { userId, goalId } },
  });
 
  if (!userGoal) throw new Error('UserGoal not found');
 
  const newTotalDuration = (userGoal.totalDuration ?? 0) + duration;
 
  return await prisma.userGoal.update({
    where: { userId_goalId: { userId, goalId } },
    data: { totalDuration: newTotalDuration },
  });
}
 
// Delete a goal
export async function deleteGoal(id: number) {
  try {
    return await prisma.goal.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Error deleting goal:', error);
    throw new Error('Failed to delete goal');
  }
}
 
// Retrieve all goals
export async function getAllGoals(userId: string) {
  try {
    const userGoals = await prisma.userGoal.findMany({
      where: {
        userId: userId,
      },
      include: {
        Goal: {
          select: {
            id: true,
            title: true,
            description: true,
            type: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
 
    // Format the response if needed to only return goal data along with user-specific fields
    const formattedGoals = userGoals.map((userGoal) => ({
      ...userGoal.Goal,
      totalDuration: userGoal.totalDuration,
      totalCount: userGoal.totalCount,
      streak: userGoal.streak,
    }));
 
    console.log('getting all user-specific goals:', JSON.stringify(formattedGoals, null, 2));
    return formattedGoals;
  } catch (error) {
    console.error('Error fetching user-specific goals:', error);
    throw new Error('Failed to fetch user-specific goals');
  }
}


export async function updateGoal(
  goalId: number,
  updatedData: { title: string; description: string; type: GoalType }
) {
  try {
    return await prisma.goal.update({
      where: { id: goalId },
      data: updatedData,
    });
  } catch (error) {
    console.error("Error updating goal:", error);
    throw new Error("Failed to update goal");
  }
}

