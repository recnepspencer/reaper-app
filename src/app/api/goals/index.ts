import { NextApiRequest, NextApiResponse } from 'next';
import { createGoal, getAllGoals } from '../../../lib/db/goalFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const goals = await getAllGoals();
    return res.json(goals);
  } else if (req.method === 'POST') {
    const { title, description } = req.body;
    const newGoal = await createGoal(title, description);
    return res.status(201).json(newGoal);
  }
}

// for listing goals