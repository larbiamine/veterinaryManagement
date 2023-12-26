import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MyConfigService } from 'src/config/config.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { MyConfigModule } from 'src/config/config.module';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UsersController } from 'src/users/users.controller';

@Module({

  imports: [UsersModule, JwtModule,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MyConfigModule], // include UsersModule in the imports array
  controllers: [UsersController, AuthController],
  providers: [AuthService, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
