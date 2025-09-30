import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
  async criptografarSenha(senha: string): Promise<string> {
    //a criptografia funcina da seguinte forma, a senha é criptografada depois a criptografia
    //é criptografada e por ai vai, até o número minimo decidido por você (10 saltos)
    //quanto mais saltos mais tempo rodando (20 travou o site de teste)
    const saltos: number = 10;
    //hash() aplica a criptografia com saltos
    return await bcrypt.hash(senha, saltos);
  }

  async compararSenhas(
    senhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    return await bcrypt.compare(senhaDigitada, senhaBanco);
  }
}
