import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { MyJwtModule } from './jwt/jwt.module';
import { PrismaModule } from './prisma/prisma.module';


 
@Module({
  imports: [AuthModule, UsersModule, DbModule, MyJwtModule, PrismaModule, ],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {} 
