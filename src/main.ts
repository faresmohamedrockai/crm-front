import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
import { json, urlencoded } from 'express';
import { BigIntInterceptor } from './BigInterseptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ دعم body أكبر (مفيد لرفع الصور base64 أو ملفات form-data)
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  app.use(cookieParser());
  app.use(morgan('dev'));

 app.enableCors({
  origin: ['http://localhost:3000',
    'http://localhost:5174',
    'http://localhost:5173',
    'https://propai-crm-front-end.vercel.app',
    'https://propai-crm-front-end-1-coral.vercel.app',
  'https://propai-crm-front-end-1.vercel.app'],
  credentials: true,
  methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization,ngrok-skip-browser-warning',
});
app.useGlobalInterceptors(new BigIntInterceptor());
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
