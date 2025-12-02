// Create a connection to Prisma Client

// Planetscale database
// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';

// const prismaWithAccelerate = new PrismaClient().$extends(withAccelerate());

// const prisma = prismaWithAccelerate;

// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices

// Local database
// import { PrismaClient } from '@prisma/client';
// import { PrismaClient } from '@prisma-db-app/client';
import { PrismaClient } from '@/prisma/generated/prisma-db-app/client';
// import { PrismaClient } from '@prisma/prisma-db-app/client';
// import { withOptimize } from '@prisma/extension-optimize';

// const extendedPrisma = new PrismaClient().$extends(withOptimize());
// type PrismaClientExtended=ReturnType<typeof extendedPrisma>
// const prisma = new PrismaClient();
// export default prisma;

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });
};

declare const globalThis: {
  prismaAppGlobal: ReturnType<typeof prismaClientSingleton>;
  prismaAppInstances?: number;
} & typeof global;

if (!globalThis.prismaAppInstances) {
  globalThis.prismaAppInstances = 0;
}

globalThis.prismaAppInstances += 1;
console.log(`Prisma App instances created: ${globalThis.prismaAppInstances}`);

export const dbApp = globalThis.prismaAppGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaAppGlobal = dbApp;
