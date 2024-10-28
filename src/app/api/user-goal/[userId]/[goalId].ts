import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserGoalAssignment, getUserGoals } from '../../../../lib/db/userGoalFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, goalId } = req.query;
  
  if (req.method === 'GET') {
    const userGoals = await getUserGoals(parseInt(userId as string, 10));
    return res.json(userGoals);
  } else if (req.method === 'DELETE') {
    await deleteUserGoalAssignment(parseInt(userId as string, 10), parseInt(goalId as string, 10));
    return res.status(204).end();
  }
}