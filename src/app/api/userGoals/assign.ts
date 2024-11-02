// api/user-goal/assign.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { assignGoalToUser } from '../../../lib/db/userGoalFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, goalId } = req.body;
    const assignment = await assignGoalToUser(userId, goalId);
    return res.status(201).json(assignment);
  }
}