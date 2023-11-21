import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middlewares
  app.enableCors();
  app.use(helmet());

  app.setGlobalPrefix('api');

  // Validation pipelines
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // OpenAPI Specification
  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Nest.js x Auth')
      .setDescription('API Documentation for Auth, Organization & Post modules')
      .setVersion('2.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'JWT',
          bearerFormat: 'JWT',
          description: 'Enter JWT token',
          in: 'header',
        },
        'JWT-auth',
      )
      .build(),
  );

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.API_PORT || 3000);
}

bootstrap();
