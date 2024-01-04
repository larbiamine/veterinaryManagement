import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { MyConfigModule } from 'src/config/config.module';
import { MyConfigService } from 'src/config/config.service';
import { MyJwtService } from 'src/jwt/jwt.service';
import { MyJwtModule } from 'src/jwt/jwt.module';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth/jwt-auth.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MyConfigModule, MyJwtModule ],
  controllers: [UsersController],
  providers: [UsersService, MyConfigService, JwtAuthGuard],
  exports: [MyConfigService],
})
export class UsersModule {}
