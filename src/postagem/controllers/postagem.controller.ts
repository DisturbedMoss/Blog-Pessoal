import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from '../services/postagem.service';

@Controller('/postagens')
export class PostagemController {
  //injetando o serviço no controlador
  constructor(private readonly postagemService: PostagemService) {}

  //Sempre que uma requisição GET for feita para /postagens, o método findAll() será chamado
  @Get()
  @HttpCode(HttpStatus.OK)
  //é Postagem[] porque ele vai receber mais de uma postagem
  findAll(): Promise<Postagem[]> {
    //esse return chama async do services
    return this.postagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  //retorna uma promessa<Postagem[]> que contém um array de objetos da classe postagem
  findAllByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.postagemService.findAllByTitulo(titulo);
  }

  //postando
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  //atualizando
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  //deletando
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
  }
}
