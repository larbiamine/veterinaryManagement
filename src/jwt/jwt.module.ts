
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MyConfigModule } from 'src/config/config.module';
import { MyConfigService } from 'src/config/config.service';
import { MyJwtService } from './jwt.service';

@Module({
  imports: [
    MyConfigModule,
    JwtModule.registerAsync({
        imports: [MyConfigModule], 
        useFactory: async (configService: MyConfigService) => ({
          secret: configService.getJWTKey(),
          signOptions: { expiresIn: '24h' },
        }),
        inject: [MyConfigService],
      }),
  ],
  providers: [MyJwtService],
  exports: [MyJwtService],
})
export class MyJwtModule {}