import { CronExpression } from '@nestjs/schedule';

enum MyCronExpression {
  THURSDAY_1600 = "0 16 * * 4", // Example custom expression
}

export const CustomCronExpression = Object.assign({}, MyCronExpression, CronExpression);
