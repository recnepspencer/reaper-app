// lib/db/goalFunctions.ts

import { GoalData, UpdateGoalData, UserGoal } from '../interfaces/goals.interface';
import prisma from './prisma';

// Create a new goal
export async function createGoal(userId: string, data: GoalData) {
  try {
    const newGoal = await prisma.goal.create({
      data: {
        ...data,
        users: {
          create: {
            userId: userId,
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
export async function updateUserGoal(userId: string, goalId: number, action: string, data: any) {
  switch (action) {
    case 'yesno':
      return await handleYesNoUpdate(userId, goalId, data.isYes);
    case 'counter':
      return await handleCounterUpdate(userId, goalId, data.countChange);
    case 'timer':
      return await handleTimerUpdate(userId, goalId, data.duration);
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
    const allGoals = await prisma.goal.findMany({
      include: {
        users: {
          where: {
            userId: userId,
          },
          select: {
            goalId: true, // Necessary for joining purposes
            totalDuration: true,
            totalCount: true,
            streak: true,
          },
        },
      },
    });

    console.log('getting all users goals:', JSON.stringify(allGoals, null, 2));
    return allGoals;
  } catch (error) {
    console.error('Error fetching all goals with user data:', error);
    throw new Error('Failed to fetch goals with user data');
  }
}
