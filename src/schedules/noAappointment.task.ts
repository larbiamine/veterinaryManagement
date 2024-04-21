import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NOTAppointmentTasks {
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    console.log('This NOTAppointmentTasks will be executed every 30 seconds');
  }
}