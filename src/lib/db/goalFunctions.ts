import prisma from './prisma';

// Create a new goal
export async function createGoal(title: string, description: string) {
  return await prisma.goal.create({ data: { title, description } });
}

// Get a goal by ID
export async function getGoalById(id: number) {
  return await prisma.goal.findUnique({ where: { id } });
}

// Update a goal
export async function updateGoal(id: number, data: { title?: string; description?: string }) {
  return await prisma.goal.update({
    where: { id },
    data,
  });
}

// Delete a goal
export async function deleteGoal(id: number) {
  return await prisma.goal.delete({ where: { id } });
}

// Get all goals
export async function getAllGoals() {
  return await prisma.goal.findMany();
}
