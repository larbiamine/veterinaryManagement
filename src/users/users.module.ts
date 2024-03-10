import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MyConfigModule } from 'src/config/config.module';
import { MyConfigService } from 'src/config/config.service';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [MyConfigModule, MyJwtModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, MyConfigService, PrismaService, JwtAuthGuard],
  exports: [MyConfigService],
})
export class UsersModule {}
