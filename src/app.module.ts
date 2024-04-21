import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MyJwtModule } from './jwt/jwt.module';
import { PrismaModule } from './prisma/prisma.module';
import { OwnerModule } from './owner/owner.module';
import { VetModule } from './vet/vet.module';
import { UtilitiesModule } from './utilities/utilities.module';
import { AnimalModule } from './animal/animal.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SchedulesModule } from './schedules/schedules.module';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    MyJwtModule,
    PrismaModule,
    OwnerModule,
    VetModule,
    UtilitiesModule,
    AnimalModule,
    AppointmentModule,
    SchedulesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
