import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';
import { AnimalService } from 'src/animal/animal.service';
import {  AppointmentStatus } from '@prisma/client';
import {  PrismaAppointment, PrismaAppointmentWithInfo } from './entities/appointment.entity';
import { ReturnMessage } from 'src/Entities/global.entity';
import { addDays } from 'date-fns';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private readonly animalService: AnimalService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDTO) {
    const { status, ownerId, vetId, animalId, date, description, reason } =
      createAppointmentDto;

    const animal = await this.animalService.findOne(animalId);

    if (!animal) {
      throw new NotFoundException('Animal not found');
    }

    if (animal.ownerId !== ownerId) {
      throw new NotFoundException(
        'Animal does not belong to the specified owner ',
      );
    }
    if (animal.vetId !== vetId) {
      throw new NotFoundException(
        'Animal does not belong to the specified vet',
      );
    }

    const hasAppointment = await this.hasAppointment(vetId, date);

    if (hasAppointment) {
      throw new NotFoundException(
        'Vet already has an appointment at this time',
      );
    }

    const appointment = await this.prisma.appointment.create({
      data: {
        ownerId,
        vetId,
        animalId,
        date,
        description,
        reason,
        status,
      },
    });
    return appointment;
  }

  async findOne(id: number): Promise<PrismaAppointment | string> {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id,
      },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }
  async delete(id: number): Promise<ReturnMessage> {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    await this.prisma.appointment.delete({
      where: {
        id,
      },
    });

    return { message: 'Appointment deleted successfully' };
  }

  async getAppointmentsByDate(
    date: Date,
  ): Promise<PrismaAppointment[] | string> {
    const nextDay = addDays(date, 1);

    try {
      const appointments = await this.prisma.appointment.findMany({
        where: {
          date: {
            gte: date,
            lt: nextDay,
          },
        },
      });

      if (!appointments || appointments.length === 0) {
        throw new NotFoundException(
          'No appointments found for the specified date',
        );
      }

      return appointments;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAppointmentsByDateInterval(
    startDate: Date,
    endDate: Date,
    status: Array<AppointmentStatus>,
  ): Promise<PrismaAppointment[] | string> {
    if (status.length === 0) {
      status = Object.values(AppointmentStatus);
    }

    const endDatePlusOne = addDays(endDate, 1);

    try {
      const appointments = await this.prisma.appointment.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDatePlusOne,
          },
          status: {
            in: status,
          },
        },
      });

      if (!appointments) {
        throw new NotFoundException(
          'No appointments found for the specified date',
        );
      }

      return appointments;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAppointmentsByDateIntervalWithOwnerAndVet(
    startDate: Date,
    endDate: Date,
    status: Array<AppointmentStatus>,
  ): Promise<PrismaAppointmentWithInfo[]> {
    if (status.length === 0) {
      status = Object.values(AppointmentStatus);
    }

    const endDatePlusOne = addDays(endDate, 1);

    try {
      const appointments = await this.prisma.appointment.findMany({
        where: {
          date: {
            gte: startDate,
            lt: endDatePlusOne,
          },
          status: {
            in: status,
          },
        },
        include: {
            owner: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
            vet: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
      });
      
      if (!appointments) {
        throw new NotFoundException(
          'No appointments found for the specified date',
          );
        }
        return appointments;
        
    } catch (error) {
      throw new Error(error);
    }
  }

  async setStatus(appointmentId: number, status: AppointmentStatus) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    try {
      await this.prisma.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status,
        },
      });

      return { message: 'Appointment status updated successfully' };
    } catch (error) {
      return { message: 'Error occured while setting status' };
    }
  }

  async changeDate(appointmentId: number, date: Date) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    await this.prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        date,
      },
    });

    return { message: 'Appointment date updated successfully' };
  }

  async changeVet(appointmentId: number, vetId: number) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    await this.prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        vetId,
      },
    });

    return { message: 'Appointment vet updated successfully' };
  }

  async hasAppointment(vetId: number, date: Date) {
    const appointment = await this.prisma.appointment.findFirst({
      where: {
        vetId,
        date,
      },
    });

    console.log('🆘 || appointment:', appointment);
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
        vetId,
      },
    });

    return vetAppointments;
  }
  async getOwnerAppointments(ownerId: number) {
    const ownerAppointments = await this.prisma.appointment.findMany({
      where: {
        ownerId,
      },
    });

    return ownerAppointments;
  }
  async getAnimalAppointments(animalId: number) {
    const animalAppointments = await this.prisma.appointment.findMany({
      where: {
        animalId,
      },
    });

    return animalAppointments;
  }
  async getAppointmentsByStatus(status: AppointmentStatus) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        status,
      },
    });

    return appointments;
  }
}
