import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { AnimalService } from 'src/animal/animal.service';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentService {
    constructor(
        private prisma: PrismaService,
        private readonly animalService: AnimalService,
    ) {}

    async create(createAppointmentDto: CreateAppointmentDTO) {
        const {status, ownerId, vetId, animalId, date, description, reason} = createAppointmentDto;

        const animal = await this.animalService.findOne(animalId);

        if (!animal) {
            throw new NotFoundException('Animal not found');
        }

        if (animal.ownerId !== ownerId) {
            throw new NotFoundException('Animal does not belong to the specified owner ');
        }
        if ( animal.vetId !== vetId) {
            throw new NotFoundException('Animal does not belong to the specified vet');
        }

        const hasAppointment = await this.hasAppointment(vetId, date);

        if (hasAppointment) {
            throw new NotFoundException('Vet already has an appointment at this time');

        }

        const appointment = await this.prisma.appointment.create({
            data: {
                ownerId,
                vetId,
                animalId,
                date,
                description,
                reason,
                status
            }
        });
        return appointment;
    }

    async setStatus(appointmentId: number, status: AppointmentStatus) {
        
        const appointment = await this.prisma.appointment.findUnique({
            where: {
                id: appointmentId
            }
        });

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        try {
            
            await this.prisma.appointment.update({
                where: {
                    id: appointmentId
                },
                data: {
                    status
                }
            });
    
            return { message: 'Appointment status updated successfully' };
        } catch (error) {
            return { message: 'Error occured while setting status' };
        }

    }

    async changeDate(appointmentId: number, date: Date) {
        const appointment = await this.prisma.appointment.findUnique({
            where: {
                id: appointmentId
            }
        });

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        await this.prisma.appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                date
            }
        });

        return { message: 'Appointment date updated successfully' };
    }

    async changeVet(appointmentId: number, vetId: number) {
    
        const appointment = await this.prisma.appointment.findUnique({
            where: {
                id: appointmentId
            }
        });

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        await this.prisma.appointment.update({
            where: {
                id: appointmentId
            },
            data: {
                vetId
            }
        });

        return { message: 'Appointment vet updated successfully' };
    }

    async hasAppointment(vetId: number, date: Date) {

        const appointment = await this.prisma.appointment.findFirst({
            where: {
                vetId,
                date
            }
        });

        console.log("🆘 || appointment:", appointment)
        if (appointment) {


            return true;
        } else {
            return false;
        }
    }

    async getAll() {
        const appointments = await this.prisma.appointment.findMany();
        return appointments;
    }
    async getVetAppointments(vetId: number) {

        const vetAppointments = await this.prisma.appointment.findMany({
            where: {
                vetId
            }
        });

        return vetAppointments;
    }
}
