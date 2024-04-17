import { AppointmentStatus, Prisma } from "@prisma/client";

export type PrismaAppointment = Prisma.AppointmentCreateInput;

export type changeDateInput = {
    date: Date;
}

export type setStatusInput = {
    status: AppointmentStatus;
}