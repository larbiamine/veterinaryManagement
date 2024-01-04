import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MyConfigModule } from 'src/config/config.module';
import { MyConfigService } from 'src/config/config.service';

@Module({
  imports: [
    MyConfigModule,
    MongooseModule.forRootAsync({
      imports: [MyConfigModule],
      useFactory: async (configService: MyConfigService) => ({
        uri: configService.getMongoDBURI(),
      }),
      inject: [MyConfigService],
    }),
  ],
})
export class DbModule {}