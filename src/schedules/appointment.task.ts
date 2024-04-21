import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppointmentTasks {
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    console.log('This AppointmentTasks will be executed every 30 seconds');
  }
}