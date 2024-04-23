import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppointmentTasks } from './appointment.task';
import { NOTAppointmentTasks } from './noAappointment.task';
import { AppointmentService } from 'src/appointment/appointment.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnimalService } from 'src/animal/animal.service';
import { UtilitiesService } from 'src/utilities/utilities.service';

@Module({
    imports: [ 
        ScheduleModule.forRoot(), 
        PrismaModule
    ],
    providers: [
        UtilitiesService,
        AppointmentTasks, 
        NOTAppointmentTasks, 
        PrismaService,
        AnimalService,
        AppointmentService
    ],
})
export class SchedulesModule {}
