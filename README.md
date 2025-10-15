# Blog Pessoal

API REST construída com NestJS para um projeto de Blog Pessoal. O backend oferece endpoints para gerenciar usuários, temas e postagens, além de autenticação via JWT.

Este README foi escrito para ser útil tanto para iniciantes quanto para desenvolvedores experientes. Contém instruções de instalação, execução, variáveis de ambiente, exemplos de uso e detalhes dos principais endpoints.

## Tecnologias principais

- Node.js + NestJS (TypeScript)
- TypeORM (suporte a Postgres, MySQL, SQLite)
- JWT para autenticação (Passport + @nestjs/jwt)
- Swagger para documentação da API

## Requisitos

- Node.js (>= 18 recomendado)
- npm (ou yarn)
- Banco de dados compatível (projeto configurado para usar PostgreSQL em produção via `DATABASE_URL`)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/DisturbedMoss/Blog-Pessoal.git
cd Blog-Pessoal
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz (exemplo abaixo) ou configure variáveis de ambiente no seu ambiente de execução.

Exemplo mínimo de `.env` para desenvolvimento (SQLite ou Postgres conforme sua preferência):

```env
# Porta da aplicação (opcional, padrão 4000)
PORT=4000

# Exemplo para Postgres (Produção)
# DATABASE_URL=postgres://usuario:senha@host:5432/nome_do_banco

# Exemplo para SQLite (apenas para testes locais, não existe configuração pronta neste repositório,
# você pode adaptar o DevService caso queira usar sqlite)
```

Observação: o projeto por padrão carrega `ConfigModule.forRoot()` e usa um `ProdService` (em `src/data/services/prod.service.ts`) para conectar via `process.env.DATABASE_URL`. Em desenvolvimento você pode trocar a estratégia para um `DevService` ou configurar `DATABASE_URL` apontando para o seu banco.

## Scripts úteis

- npm run start: inicia a aplicação (modo padrão)
- npm run start:dev: inicia em modo de desenvolvimento (watch)
- npm run build: compila o projeto para `dist/`
- npm run start:prod: roda o build em produção (`node dist/main`)
- npm run test: executa os testes (Jest)
- npm run test:e2e: executa testes end-to-end

## Rodando a aplicação

```bash
# modo de desenvolvimento
npm run start:dev

# produção (após build)
npm run build
npm run start:prod
```

A API por padrão será exposta na porta definida em `process.env.PORT` ou `4000` (veja `src/main.ts`).

## Documentação (Swagger)

Ao iniciar a aplicação, a documentação Swagger estará disponível em:

http://localhost:4000/swagger

Lá você pode ver e testar os endpoints, além de inserir o token Bearer para endpoints protegidos.

## Endpoints principais

Observação: muitos endpoints requerem autenticação (Bearer token). Use o endpoint de login para obter o token.

Autenticação:

- POST /usuarios/logar : faz login. Recebe um JSON com { "usuario": "seu@email.com", "senha": "senha" } e retorna um objeto com `token`.

Usuários:

- POST /usuarios/cadastrar : cria um usuário (sem necessidade de token)
- GET /usuarios/all : retorna todos os usuários (protegido por JWT)
- GET /usuarios/:id : retorna usuário por id (protegido)
- PUT /usuarios/atualizar : atualiza usuário (protegido)

Temas:

- GET /temas : lista todos os temas (protegido)
- GET /temas/:id : retorna tema por id (protegido)
- GET /temas/descricao/:descricao : busca temas por parte da descrição (protegido)
- POST /temas : cria tema (protegido)
- PUT /temas : atualiza tema (protegido)
- DELETE /temas/:id : deleta tema (protegido)

Postagens:

- GET /postagens : lista todas as postagens (protegido)
- GET /postagens/:id : retorna postagem por id (protegido)
- GET /postagens/titulo/:titulo : busca postagens por título (protegido)
- POST /postagens : cria postagem (protegido)
- PUT /postagens : atualiza postagem (protegido)
- DELETE /postagens/:id : deleta postagem (protegido)

Exemplo de fluxo rápido (via curl)

1. Cadastrar usuário (sem token):

```bash
curl -X POST http://localhost:4000/usuarios/cadastrar \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Vitor","usuario":"email@teste.com","senha":"minhaSenha123","foto":"http://exemplo.com/foto.jpg"}'
```

2. Logar para obter token:

```bash
curl -X POST http://localhost:4000/usuarios/logar \
  -H 'Content-Type: application/json' \
  -d '{"usuario":"email@teste.com","senha":"minhaSenha123"}'
```

Resposta esperada contém `token`: copie o valor do campo `token` para usar nos próximos requests.

3. Usar token para acessar endpoint protegido:

```bash
curl -H "Authorization: Bearer <SEU_TOKEN_AQUI>" http://localhost:4000/temas
```

## Entidades (visão rápida)

- Usuario: { id, nome, usuario (email), senha, foto, postagem[] }
- UsuarioLogin: { usuario, senha }
- Tema: { id, descricao, postagem[] }
- Postagem: { id, titulo, texto, data, tema, usuario }

Campos importantes e validações (resumo):

- `Usuario.usuario` deve ser um email válido; `Usuario.senha` tem minlength = 8.
- `Postagem.titulo` e `Postagem.texto` são obrigatórios.
- `Tema.descricao` é obrigatório.

## Variáveis de ambiente

- PORT: porta onde o servidor roda (padrão 4000)
- DATABASE_URL: string de conexão para o banco (usado pelo `ProdService`). Exemplo:

  postgres://user:password@host:5432/database

Observação: o `ProdService` habilita SSL e é esperado para deployments em provedores que forneçam `DATABASE_URL`.

## Testes

O projeto usa Jest. Para rodar os testes:

```bash
npm run test
npm run test:e2e
npm run test:cov
```

## Boas práticas e notas

- Nunca comite segredos ou `DATABASE_URL` com credenciais no GitHub.
- Em produção, valide se `synchronize: true` em TypeORM é o comportamento desejado (ele altera o esquema automaticamente). Em muitas aplicações reais, recomenda-se migrations em vez de `synchronize`.
- As senhas são armazenadas/hashadas: o projeto usa um wrapper `Bcrypt` para comparar senhas (veja `src/auth/bcrypt/bcrypt.ts`).

## Contato

- Autor/Contato: Vitor Hugo — dasilvavitorhugo713@gmail.com
- Repositório original: https://github.com/DisturbedMoss/Blog-Pessoal
