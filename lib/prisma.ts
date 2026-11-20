import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../app/generated/prisma/client";

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not configured");
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
};

type PrismaClientSingletonType = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as { prisma: PrismaClientSingletonType | undefined };


const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if(process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;