// lib/db/userFunctions.ts

import prisma from './prisma';
import { GoalData } from '../interfaces/goals.interface';

// Create a new user
export async function createUser(id: string, email: string, firstName?: string, lastName?: string) {
  return await prisma.user.create({
    data: {
      id,
      email,
      firstName: firstName || null,
      lastName: lastName || null,
    },
  });
}

// Get a user by ID
export async function getUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    include: { goals: true },
  });
}

// Update a user
export async function updateUser(id: string, data: { email?: string; firstName?: string; lastName?: string }) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

// Delete a user
export async function deleteUser(id: string) {
  return await prisma.user.delete({ where: { id } });
}

// Get all users
export async function getAllUsers() {
  return await prisma.user.findMany();
}
