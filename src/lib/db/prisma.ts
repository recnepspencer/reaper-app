import { PrismaClient } from "@prisma/client";

// Use a module-level variable for development environments
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({ log: ["query"] });
} else {
  const globalForPrisma = global as typeof global & { prisma?: PrismaClient };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ log: ["query"] });
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
