// api/users/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserById, updateUser, deleteUser, getAllUsers } from '../../../lib/db/userFunctions';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const userId = id

  if (req.method === 'GET') {
    const user = await getUserById(userId as string);
    return res.json(user);
  } else if (req.method === 'PUT') {
    const data = req.body;
    const updatedUser = await updateUser(userId as any, data);
    return res.json(updatedUser);
  } else if (req.method === 'DELETE') {
    await deleteUser(userId as any);
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