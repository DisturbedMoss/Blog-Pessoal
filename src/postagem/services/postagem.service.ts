import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

//indica que essa classe é um serviço e pode ser injetada em outros lugares
@Injectable()
export class PostagemService {
  // Injeção de dependência do repositório de Postagem
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  //indo no banco de dados, por isso o async. EX: pedir para o estagiário fazer algo enquanto você faz outra e o Javascript aguarda(await)
  //a Promise é uma promessa ele promete tentar concluir o pedido e se não conseguir ele rejeita(rejected)
  async findAll(): Promise<Postagem[]> {
    //find() equivale a SELECT * FROM tb_postagens
    return await this.postagemRepository.find();
  }

  async findById(id: number): Promise<Postagem> {
    //find() equivale a SELECT * FROM tb_postagens WHERE id = id
    const postagem = await this.postagemRepository.findOne({ where: { id } });

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      //ILike não diferencia maiúsculas de minúsculas e retorna qualquer postagem que contenha o título em qualquer parte do texto
      where: { titulo: ILike(`%${titulo}%`) },
    });
  }

  async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  async update(postagem: Postagem): Promise<Postagem> {
    //verifica se a postagem existe, usando findById
    await this.findById(postagem.id);

    //save() salva as alterações no banco de dados
    return await this.postagemRepository.save(postagem);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);

    return await this.postagemRepository.delete(id);
  }
}
