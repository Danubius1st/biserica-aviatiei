// Create a connection to Prisma Client

// Planetscale database
// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

// const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

// const prisma = prismaWithAccelerate;

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// import { PrismaClient } from '@prisma-db-auth/client';
import { PrismaClient } from '@/prisma/generated/prisma-db-auth/client';
// import { PrismaClient } from '@prisma/prisma-db-auth/client';
// import { PrismaPg } from '@prisma/adapter-pg';
// import { withOptimize } from '@prisma/extension-optimize';

// const extendedPrisma = new PrismaClient().$extends(withOptimize());
// type PrismaClientExtended=ReturnType<typeof extendedPrisma>
// const prisma = new PrismaClient();
// export default prisma;

// const connectionString = process.env.AUTH_DATABASE_URL!;
// const adapter = new PrismaPg({
//   connectionString
// });

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
};

declare const globalThis: {
  prismaAuthGlobal: ReturnType<typeof prismaClientSingleton>;
  prismaAuthInstances?: number;
} & typeof global;

if (!globalThis.prismaAuthInstances) {
  globalThis.prismaAuthInstances = 0;
}

globalThis.prismaAuthInstances += 1;
console.log(`Prisma Auth instances created: ${globalThis.prismaAuthInstances}`);

export const dbAuth = globalThis.prismaAuthGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaAuthGlobal = dbAuth;
