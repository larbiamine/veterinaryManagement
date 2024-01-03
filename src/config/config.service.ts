// config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  getMongoDBURI(): string {
  return this.configService.get<string>('MONGODB_URI');

  }
  getEncryptionKey(): string {
    return this.configService.get<string>('ENCRYPTION_KEY');
  }
  getJWTKey(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

}
