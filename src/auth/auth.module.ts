import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';

@Module({
  imports: [],
  //A Classe Bcrypt foi registrada no array providers, pois se trata de uma Classe de Serviço.
  providers: [Bcrypt],
  controllers: [],
  //A Classe Bcrypt foi registrada no array exports, pois precisaremos utilizá-la no Módulo Usuario.
  exports: [Bcrypt],
})
export class AuthModule {}
