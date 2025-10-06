import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_postagens' })
export class Postagem {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @ApiProperty()
  @UpdateDateColumn()
  data: Date;

  @ApiProperty({ type: () => Tema })
  //indica que postagem estara do lado muitos para um
  @ManyToOne(() => Tema, (tema) => tema.postagem, { onDelete: 'CASCADE' })
  //criando um objeto na classe Tema, ele será associado ao objeto da classe postagem. o objeto representa a chave estrangeira da tb_postagens
  tema: Tema;
  //todos os relacionados serão apagados também
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
