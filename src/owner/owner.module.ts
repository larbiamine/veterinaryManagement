import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { ownerService } from './owner.service';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilitiesModule } from 'src/utilities/utilities.module';

@Module({
    imports: [ MyJwtModule, UtilitiesModule, PrismaModule ],
    controllers: [OwnerController],
    providers: [ownerService, PrismaService]
})
export class OwnerModule {}
