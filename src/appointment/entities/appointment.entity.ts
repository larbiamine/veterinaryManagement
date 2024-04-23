import { AppointmentStatus, Prisma } from "@prisma/client";
import { PartialOwner, PrismaOwner } from "src/owner/entities/owner.entity";
import { PartialVet, PrismaVet } from "src/vet/entities/vet.entity";

export type PrismaAppointment = Prisma.AppointmentUncheckedCreateInput;


export type PrismaAppointmentWithInfo = PrismaAppointment & {owner: PartialOwner, vet:PartialVet}

export type changeDateInput = {
    date: Date;
}

export type setStatusInput = {
    status: AppointmentStatus;
}