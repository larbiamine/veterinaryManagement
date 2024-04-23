import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentStatus } from '@prisma/client';
import { AppointmentService } from 'src/appointment/appointment.service';
import { UtilitiesService } from 'src/utilities/utilities.service';
import { CustomCronExpression } from './custom-cron-expressions.enum';

@Injectable()
export class AppointmentTasks {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly utilitiesService: UtilitiesService,
  ) {}


  // @Cron(CustomCronExpression.EVERY_SECOND)
  @Cron(CustomCronExpression.THURSDAY_1600)
  async upcomingAppointments() {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    const  status = [
      AppointmentStatus.SCHEDULED, 
      AppointmentStatus.RESCHEDULED
    ]
    const appointments =
      await this.appointmentService.getAppointmentsByDateIntervalWithOwnerAndVet(
        today,
        nextWeek,
        status,
      );

      const appointmentsWithRenamedEmails = appointments.map((appointment) => {
        const { owner, vet, ...appointmentWithoutOwnerAndVet } = appointment;
        return {
          ...appointmentWithoutOwnerAndVet,
          ownerFirstName: appointment.owner?.firstName,
          ownerLastName: appointment.owner?.lastName,
          vetFirstName: appointment.vet?.firstName,
          vetLastName: appointment.vet?.lastName,
          ownerEmail: appointment.owner?.email,
          vetEmail: appointment.vet?.email,
          // Add other fields of the appointment entity as needed
        };
      });

    this.utilitiesService.customConsoleTable(appointmentsWithRenamedEmails, 5);
    
  }
}