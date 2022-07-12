import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configure Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Closest Asteroid API')
    .setDescription(
      'API wrapper for the NASA NeoWs (Near Earth Object Web Service) API.',
    )
    .setVersion('1.0')
    .build();

  // Enable Swagger for testing/API docs
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
