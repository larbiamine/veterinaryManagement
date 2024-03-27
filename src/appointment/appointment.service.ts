import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppointmentDTO } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentService {
    constructor(
        private prisma: PrismaService
    ) {}

    async create(createAppointmentDto: CreateAppointmentDTO) {
        const {ownerId, vetId, animalId, date, description, reason} = createAppointmentDto;
        const appointment = await this.prisma.appointment.create({
            data: {
                ownerId,
                vetId,
                animalId,
                date,
                description,
                reason,
            }
        });
        return appointment;
    }
}
