import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: ['https://booking-app-1edf4.web.app', 'http://localhost:3000'],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
