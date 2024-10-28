import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, updateUser, deleteUser, getAllUsers, createUser } from '../../../lib/db/userFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userId = parseInt(id as string, 10);

  if (req.method === 'GET') {
    const user = await getUserById(userId);
    return res.json(user);
  } else if (req.method === 'PUT') {
    const data = req.body;
    const updatedUser = await updateUser(userId, data);
    return res.json(updatedUser);
  } else if (req.method === 'DELETE') {
    await deleteUser(userId);
    return res.status(204).end();
  }
}

// For getting all users
export async function getUsersHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await getAllUsers();
    return res.json(users);
  }
}