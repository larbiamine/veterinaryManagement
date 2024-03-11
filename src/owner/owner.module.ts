import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { ownerService } from './owner.service';
import { MyConfigModule } from 'src/config/config.module';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
    imports: [ MyConfigModule, MyJwtModule, PrismaModule ],
    controllers: [OwnerController],
    providers: [ownerService, PrismaService]
})
export class OwnerModule {}
