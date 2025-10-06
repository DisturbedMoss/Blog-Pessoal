/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //Cria a aplicação

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal')
    .setDescription('Projeto Blog Pessoal')
    .setContact(
      'Vitor Hugo',
      'dasilvavitorhugo713@gmail.com',
      'https://github.com/disturbedmoss',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe()); //Validação dos dados de entrada

  app.enableCors(); //assim consigo fazer o backend ser acessado pelo frontend

  await app.listen(process.env.PORT ?? 4000); //Fica rodando o projeto
}
bootstrap();
