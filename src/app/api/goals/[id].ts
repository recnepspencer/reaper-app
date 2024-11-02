// api/goals/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getGoalById, updateUserGoal, deleteGoal, createGoal, getAllGoals } from '../../../lib/db/goalFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const goalId = parseInt(id as string, 10);

  if (req.method === 'GET') {
    const goal = await getGoalById(goalId);
    return res.json(goal);
  } else if (req.method === 'PUT') {
    const { userId, action, ...data } = req.body;

    if (!userId || !action) {
      return res.status(400).json({ error: 'User ID and action are required' });
    }

    try {
      const updatedGoal = await updateUserGoal(userId, goalId, action, data);
      return res.json(updatedGoal);
    } catch (error) {
      console.error('Error updating user goal:', error);
      return res.status(500).json({ error: 'Failed to update user goal' });
    }
  } else if (req.method === 'DELETE') {
    await deleteGoal(goalId);
    return res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// For getting all goals
export async function getGoalsHandler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId ? String(req.query.userId) : null;
  if (!userId) return res.status(400).json({ error: 'User ID is required' });
  if (req.method === 'GET') {
    const goals = await getAllGoals(userId);
    return res.json(goals);
  }
}
