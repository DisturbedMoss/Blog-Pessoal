import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);//Cria a aplicação

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe());//Validação dos dados de entrada

  app.enableCors();//assim consigo fazer o backend ser acessado pelo frontend

  await app.listen(process.env.PORT ?? 4000);//Fica rodando o projeto
}
bootstrap();
