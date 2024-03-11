import { Module } from '@nestjs/common';
import { VetController } from './vet.controller';
import { VetService } from './vet.service';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilitiesModule } from 'src/utilities/utilities.module';
@Module({
  imports: [MyJwtModule, UtilitiesModule, PrismaModule ],
  controllers: [VetController],
  providers: [VetService, PrismaService]
})
export class VetModule {}
