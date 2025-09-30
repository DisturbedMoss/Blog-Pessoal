import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem/entities/postagem.entity';
import { PostagemModule } from './postagem/postagem.modules';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';
import { AuthModule } from './auth/auth.module';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  //Decorator que define um módulo
  imports: [
    TypeOrmModule.forRoot({
      //conectando com o banco de dados
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      //Inserir as novas entidades aqui <--
      entities: [Postagem, Tema, Usuario],
      //no banco de dados entities são as tabelas
      synchronize: true,
      // por enquanto usuario e senha root
    }),
    //inserir o module exportado aqui <--
    PostagemModule,
    TemaModule,
    AuthModule,
    UsuarioModule,
  ],
  //é a configuração que liga com o banco de dados
  controllers: [],
  //é a controladora que recebe as requisições
  providers: [],
  //é onde tem a lógica do projeto
})
export class AppModule {}
