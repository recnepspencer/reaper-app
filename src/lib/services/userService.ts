import prisma from '../prisma';
import { User } from '../interfaces/user.interface';

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    throw new Error('Error fetching users');
  }
}
