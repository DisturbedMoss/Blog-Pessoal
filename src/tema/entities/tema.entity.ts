import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';
import { ApiProperty } from '@nestjs/swagger';

//Criando uma tabela com id gerado automaticamente e descricao
@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  descricao: string;

  @ApiProperty()
  //indica que tema estara do lado um para muitos
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  //Criando um array de objetos da classe postagem
  postagem: Postagem[];
}
//Ao final vou precisar enviar SEMPRE a entidade criada e a classe exportada no module para o app.module
