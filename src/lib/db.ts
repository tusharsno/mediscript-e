import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const db = globalThis.prismaGlobal ?? new PrismaClient();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
