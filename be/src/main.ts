import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      'http://localhost:3000',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.enableCors({
    origin: [
      'https://booking-app-1edf4.web.app',
      'http://localhost:3000',
      'http://192.169.101.137:3000',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
