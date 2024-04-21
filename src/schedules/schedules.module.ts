import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppointmentTasks } from './appointment.task';
import { NOTAppointmentTasks } from './noAappointment.task';

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [AppointmentTasks, NOTAppointmentTasks],
})
export class SchedulesModule {}
