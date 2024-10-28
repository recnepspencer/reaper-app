import { NextApiRequest, NextApiResponse } from 'next';
import { getGoalById, updateGoal, deleteGoal, createGoal, getAllGoals } from '../../../lib/db/goalFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const goalId = parseInt(id as string, 10);

  if (req.method === 'GET') {
    const goal = await getGoalById(goalId);
    return res.json(goal);
  } else if (req.method === 'PUT') {
    const data = req.body;
    const updatedGoal = await updateGoal(goalId, data);
    return res.json(updatedGoal);
  } else if (req.method === 'DELETE') {
    await deleteGoal(goalId);
    return res.status(204).end();
  }
}

// For getting all goals
export async function getGoalsHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const goals = await getAllGoals();
    return res.json(goals);
  }
}
