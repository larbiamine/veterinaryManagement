// config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyConfigService {
  constructor(private configService: ConfigService) {}

  getEncryptionKey(): string {
    return this.configService.get<string>('ENCRYPTION_KEY');
  }

}
