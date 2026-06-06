import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Validates incoming request bodies against your DTOs.
  // whitelist strips properties not in the DTO.
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true }),
  );
  await app.listen(3000);
  console.log('Todo API running on http://localhost:3000');
}
bootstrap();
