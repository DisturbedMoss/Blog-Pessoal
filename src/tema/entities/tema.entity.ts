import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

//Criando uma tabela com id gerado automaticamente e descricao
@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  //indica que tema estara do lado um para muitos
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  //Criando um array de objetos da classe postagem
  postagem: Postagem[];
}
//Ao final vou precisar enviar SEMPRE a entidade criada e a classe exportada no module para o app.module
