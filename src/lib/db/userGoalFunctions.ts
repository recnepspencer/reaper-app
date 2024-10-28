import prisma from './prisma';

// Assign a goal to a user
export async function assignGoalToUser(userId: number, goalId: number) {
  return await prisma.userGoal.create({
    data: { userId, goalId },
  });
}

// Get all user-goal assignments
export async function getUserGoals(userId: number) {
  return await prisma.userGoal.findMany({
    where: { userId },
    include: { Goal: true },
  });
}

// Delete a user-goal assignment
export async function deleteUserGoalAssignment(userId: number, goalId: number) {
  return await prisma.userGoal.delete({
    where: { userId_goalId: { userId, goalId } },
  });
}
