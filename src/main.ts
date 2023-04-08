import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Express } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*', // Autoriser toutes les origines
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Autoriser toutes les méthodes
    // allowedHeaders: 'Content-Type, Accept, Authorization', // Autoriser certains en-têtes spécifiques
  });

  await app.listen(8080);
}
bootstrap();
//