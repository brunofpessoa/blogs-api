# Projeto Blogs API - Arquitetura MSC com Sequelize

## Contexto
Esta é uma API para gerenciamento de um blog, na qual é possível buscar, criar, editar e deletar postagens. foi desenvolvida durante meus estudos de Back-end na __Trybe__ com o objetivo de consolidar os estudos de __API rest com Sequelize e Json Web Token__. A API foi desenvolvida com __NodeJs__ e utiliza a arquitetura MSC: Model, Service e Controller. Cada rota possui validações específicas do corpo da requisição e também das permissões do usuário.

Todos os códigos dos diretórios models, services, controllers, middlewares, migrations, seeders, utils e routers foram desenvolvidos por mim. Os arquivos de configuração do sequelize, eslint e docker foram fornecidos pela __trybe__.

## Diagrama de entidade relacionamento do banco de dados

![diagrama entidade relacionamento](./images/diagrama-er.png)

## Rotas

A relação de rotas e suas respectivas descrições podem ser visualizadas nas tabelas abaixo.

### Login
|Método|Rota|Descrição|
|-|-|-|
|POST|/login|faz login de um usuário|

<details>
<summary>Como utilizar a rota</summary>

1. Login de um usuário já cadastrado

  - O corpo da requisição deverá seguir o formato abaixo:
  
  ```js
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```

  - Caso não haja erro de validação o retorno deve ser um json web token.
  ```js
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
</details>

> Importante: O token deve estar na chave Authentication no HTTP Headers.

### User
|Método|Rota|Descrição|
|-|-|-|
|GET|/user|retorna todos os usuários registrados|
|GET|/user/:id|retorna o usuário do id especificado|
|POST|/user|registra um novo usuário|

> As rotas get requerem que o usuário esteja devidamente conectado (possua um token válido).

<details>
<summary>Como utilizar as rotas que possuem body</summary>

1. Registro de novo user

  - O corpo da requisição deverá seguir o formato abaixo:
  
  ```js
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    // a imagem não é obrigatória
  }
  ```

  - Caso não haja erro de validação o retorno deve ser um json web token.
  ```js
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```

</details>

### Blog Posts
|Método|Rota|Descrição|
|-|-|-|
|GET|/post|retorna todos os posts|
|GET|/post/:id|retorna o post especificado|
|POST|/post|registra um novo post|
|PUT|/post/:id|atualiza um post|

> Essas rotas são acessíveis apenas caso o usuários esteja conectado e tenha a permissão adequada (possua um token válido).

<details>
<summary>Como utilizar as rotas que possuem body</summary>

1. Registro de novo post

  - O corpo da requisição deverá seguir o formato abaixo:
  
  ```js
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

  - Caso não haja erro de validação o resultado esperado deve ser algo como:
  ```js
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```

2. Atualização de post
  - O corpo da requisição deverá seguir o formato abaixo:
  
  ```js
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

  - Caso não haja erro de validação o resultado esperado deve ser algo como:

  ```js
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "published": "2022-05-18T18:00:01.000Z",
    "updated": "2022-05-18T18:07:32.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      },
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
  ```
</details>

### Categories
|Método|Rota|Descrição|
|-|-|-|
|GET|/categories|retorna todas as categorias registradas|
|POST|/categories|registra uma nova categoria|

> Essas rotas são acessíveis apenas caso o usuários esteja conectado (possua um token válido).

<details>
<summary>Como utilizar as rotas que possuem body</summary>

1. Registro de nova categoria

  - O corpo da requisição deverá seguir o formato abaixo:
  
  ```js
  {
    "name": "Typescript"
  }
  ```

  - Caso não haja erro de validação o retorno deve ser:
  ```js
  {
    "id": 3,
    "name": "Typescript"
  }
  ```

</details>

## Técnologias utilizadas
- Desenvolvido com: __NodeJs__, __Express__, __Sequelize__
- Banco de dados: __MySQL__
- Validações: __Jason Web Token, JOI__

## Instalação

O repositório conta com um arquivo docker-compose já configurado para maior comodidade e replicabilidade.

Siga os passos a seguir para ter a aplicação rodando em sua máquina.

1. Clonando o repositório
  ```sh
    git clone git@github.com:brunofpessoa/blogs-api.git
  ```
2. Instalando as dependências
  ```sh
    cd blogs-api
  ```
  ```sh
    npm install
  ```
3. Subindo os containers
No diretório raiz do projeto execute o seguinte comando para inicializar os containers
  ```sh
    docker-compose up -d
  ```
4. Criando e populando o banco de dados
  ```sh
    docker exec -it blogs_api bash
  ```
  ```sh
    npm run prestart
  ```
5. Inicializando o servidor
  ``` sh
    npm run debug
  ```
> Você pode configurar as variáveis de ambiente conforme o arquivo .env.exemple se desejar utilizar outras credenciais, portas etc.

A aplicação está no ar! utilize o navegador ou um outro cliente como Thunder Client para acesse as rotas conforme descrito na seção _Rotas_ deste documento.

## Contribua com o projeto
Se você tiver uma sugestão para melhorar isso, faça um fork do repositório e faça um _pull request_. Você também pode simplesmente abrir um problema com a tag "enhancement". Não se esqueça de dar uma estrela ao projeto! Obrigado novamente!

1. Faça um Fork do projeto
2. Cria sua Feature Branch (git checkout -b feature/AmazingFeature)
3. Confirme suas alterações (git commit -m 'Add some AmazingFeature')
4. Publique sua branch (git push origin feature/AmazingFeature)
5. Abra o Pull Request

## Contato

Email: `brunofernpessoa@gmail.com`

[LinkedIn](https://www.linkedin.com/in/brunofpessoa/)

[GitHub](https://github.com/brunofpessoa/)