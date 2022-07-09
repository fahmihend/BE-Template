import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT, () => {
    Logger.log(`Server running on port ${process.env.APP_PORT}`);
  });
}
bootstrap();

export const connections: Map<string, Connection> = new Map();