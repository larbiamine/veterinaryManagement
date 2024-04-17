import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MyConfigModule } from 'src/config/config.module';
import { UsersService } from 'src/users/users.service';
import { LocalStrategy } from '../jwt/local.strategy';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [UsersModule, MyConfigModule, MyJwtModule],
  // include UsersModule in the imports array
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
