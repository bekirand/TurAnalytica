import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

// Create the connection pool with pg
const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({
    connectionString,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
});
const adapter = new PrismaPg(pool);

/** Singleton Prisma Client — предотвращает создание лишних подключений в dev-режиме */
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
