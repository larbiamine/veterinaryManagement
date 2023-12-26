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
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UsersModule,
    MyConfigModule,
    JwtModule.registerAsync({
      imports: [MyConfigModule], 
      useFactory: async (configService: MyConfigService) => ({
        secret: configService.getJWTKey(),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [MyConfigService],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    
  ], 
  // include UsersModule in the imports array
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
