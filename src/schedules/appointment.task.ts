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


  @Cron(CustomCronExpression.EVERY_SECOND)
  // @Cron(CustomCronExpression.THURSDAY_1600)
  async upcomingAppointments() {
    let today = new Date();
    let nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    const appointments =
      await this.appointmentService.getAppointmentsByDateIntervalWithOwnerAndVet(
        today,
        nextWeek,
        [AppointmentStatus.SCHEDULED, AppointmentStatus.RESCHEDULED],
      );

      const appointmentsWithRenamedEmails = appointments.map(appointment => ({
        ...appointment,
        ownerId: appointment.owner?.id,
        ownerFirstName: appointment.owner?.firstName,
        ownerLastName: appointment.owner?.lastName,
        ownerEmail: appointment.owner?.email,
        vetEmail: appointment.vet?.email,
        // Add other fields of the appointment entity as needed
      }));

    this.utilitiesService.customConsoleTable(appointments, 10);
    
  }
}