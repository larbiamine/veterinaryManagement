import { AppointmentStatus, Prisma } from "@prisma/client";

export type PrismaAppointment = Prisma.AppointmentUncheckedCreateInput;

export type changeDateInput = {
    date: Date;
}

export type setStatusInput = {
    status: AppointmentStatus;
}