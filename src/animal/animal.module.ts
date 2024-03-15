import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilitiesModule } from 'src/utilities/utilities.module';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ MyJwtModule, UtilitiesModule, PrismaModule ],
  controllers: [AnimalController],
  providers: [AnimalService, PrismaService],
})
export class AnimalModule {}
