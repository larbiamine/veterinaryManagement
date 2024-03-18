import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaForeignKeyExceptionFilter } from './filters/prisma-foreign-key-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaForeignKeyExceptionFilter());
  await app.listen(3000);
}
bootstrap();
