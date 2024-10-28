import prisma from './prisma';

// Create a new user
export async function createUser(email: string, name?: string) {
  return await prisma.user.create({ data: { email, name } });
}

// Get a user by ID
export async function getUserById(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    include: { goals: true },
  });
}

// Update a user
export async function updateUser(id: number, data: { email?: string; name?: string }) {
  return await prisma.user.update({
    where: { id },
    data,
  });
}

// Delete a user
export async function deleteUser(id: number) {
  return await prisma.user.delete({ where: { id } });
}

// Get all users
export async function getAllUsers() {
  return await prisma.user.findMany();
}
