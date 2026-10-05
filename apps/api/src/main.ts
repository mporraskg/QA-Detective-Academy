import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { env } from './config/env';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: env.CORS_ORIGIN, credentials: true });
  await app.listen(env.API_PORT);
  console.log(`API lista en http://localhost:${env.API_PORT}`);
}
bootstrap();
