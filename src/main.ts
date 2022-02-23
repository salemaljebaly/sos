import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('SOS')
  .setDescription('The SOS API description')
  .setVersion('1.0')
  .addTag('sos')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  // add Global pipes to pass class validator
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT);
}
bootstrap();