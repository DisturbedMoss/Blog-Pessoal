import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

//indica que essa classe é um serviço e pode ser injetada em outros lugares
@Injectable()
export class PostagemService {
  // Injeção de dependência do repositório de Postagem
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  async findAll(): Promise<Postagem[]> {
    //find() equivale a SELECT * FROM tb_postagens
    return await this.postagemRepository.find();
  }
}
