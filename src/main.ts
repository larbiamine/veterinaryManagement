import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaForeignKeyExceptionFilter } from './filters/prisma-foreign-key-exception.filter';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaForeignKeyExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
