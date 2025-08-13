import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Elimina propiedades no permitidas
      forbidNonWhitelisted: true, // Lanza error si hay propiedades extra
      transform: true,        // Convierte automáticamente el payload al tipo del DTO
      disableErrorMessages: false, // Muestra errores (útil en desarrollo)
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Sistema de Parqueo')
    .setDescription('API para registrar entradas y salidas de vehículos')
    .setVersion('1.0')
    .addTag('parking', 'Gestión de estacionamiento')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    // Opcional: incluir solo controladores del módulo parking
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('api-docs', app, document, {
    // Puedes personalizar la interfaz
    customSiteTitle: 'API - Sistema de Parqueo',
  });

  app.enableCors({
    origin: ['http://localhost:3001'],
    credentials: true,
  });

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();