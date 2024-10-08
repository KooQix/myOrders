import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();

    // Enable validation using Dto. Return an error if error
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
