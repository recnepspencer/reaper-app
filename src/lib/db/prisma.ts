import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

const prisma = (global as any).prisma || new PrismaClient({
  log: ['query'],
});

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;
