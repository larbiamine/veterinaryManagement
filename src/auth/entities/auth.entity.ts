import { Prisma } from "@prisma/client";

export type ReturnedUser = Omit<Prisma.UserCreateInput, 'password'>;