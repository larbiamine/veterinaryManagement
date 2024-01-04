import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { JwtModule } from './jwt/jwt.module';


 
@Module({
  imports: [AuthModule, UsersModule, DbModule, JwtModule, ],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {} 
