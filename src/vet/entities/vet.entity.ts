import { Prisma } from "@prisma/client";

export type PrismaVet = Prisma.VetCreateInput;


export type PartialVet = Pick<PrismaVet, 'firstName' | 'lastName' | 'email'>;