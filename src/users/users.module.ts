import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { MyConfigModule } from 'src/config/config.module';
import { MyConfigService } from 'src/config/config.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), MyConfigModule],
  controllers: [UsersController],
  providers: [UsersService, MyConfigService],
  exports: [MyConfigService],
})
export class UsersModule {}
