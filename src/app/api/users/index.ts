// api/users/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllUsers, createUser } from '../../../lib/db/userFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await getAllUsers();
    return res.json(users);
  } else if (req.method === 'POST') {
    const { email, name } = req.body;
    const newUser = await createUser(email, name);
    return res.status(201).json(newUser);
  }
}
