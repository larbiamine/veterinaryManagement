import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AnimalService } from 'src/animal/animal.service';

@Module({
  imports: [ MyJwtModule, UtilitiesModule, PrismaModule ],

  controllers: [AppointmentController],
  providers: [AppointmentService, PrismaService, AnimalService]
})
export class AppointmentModule {}
