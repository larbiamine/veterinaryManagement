import { Prisma } from "@prisma/client";

export type PrismaOwner = Prisma.OwnerCreateInput;
export type PrismaUncheckedOwner = Prisma.OwnerUncheckedCreateInput;

export type PartialOwner = Pick<PrismaOwner, 'firstName' | 'lastName' | 'email'>;
