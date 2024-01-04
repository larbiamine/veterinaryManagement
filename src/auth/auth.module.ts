import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { MyConfigModule } from 'src/config/config.module';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { LocalStrategy } from '../jwt/local.strategy';
import { MyJwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [
    UsersModule,
    MyConfigModule,
    MyJwtModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    
  ], 
  // include UsersModule in the imports array
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
