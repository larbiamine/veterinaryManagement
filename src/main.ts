import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaForeignKeyExceptionFilter } from './filters/prisma-foreign-key-exception.filter';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: ['error', 'warn', 'fatal']
  });
  app.useGlobalFilters(new PrismaForeignKeyExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    skipMissingProperties: false // Ensure validation of all properties
  }));
  await app.listen(3000);
}
bootstrap();
