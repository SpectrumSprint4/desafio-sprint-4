<h1 align="center">
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" width="200" height="190" />
  <p align="center">Desafio Sprint 4 | Compass</p>
</h1>

<p>
  <img src="https://img.shields.io/badge/node-v16.13-brightgreen"/>
  <img src=" https://img.shields.io/badge/npm-8.1-green"/>
</p>

## Indice 
[Descrição](#Descrição)

[Funcionalidades](#Funcionalidades)

[Instalação](#Instalação)

[API-Funcionario](#Api-Funcionario)

[API-Produto](#Api-Produto)

[Tarefas em Aberto](#Tarefas-em-Aberto)


## Descrição

Api para gerenciar funcionarios e produtos de uma empresa, através do cadastro de funcionarios, podendo ocupar os cargos de gerente, caixa e vendedor, e cadastro de produtos.


## Funcionalidades

:heavy_check_mark: `Funcionalidade 1:` Realizar cadastro de funcionarios, sendo eles: gerente, caixa ou vendedor.

:heavy_check_mark: `Funcionalidade 2:` Cadastrar produtos, podendo ser cadastrado apenas pelo gerente

:heavy_check_mark: `Funcionalidade 3:` Listar cadastros realizados, podendo usar busca personalizada para encontrar o cadastro que deseja



## Instalação

No terminal, clone o projeto:

```bash
git clone https://github.com/SpectrumSprint4/desafio-sprint-4.git
```
 
Dentro da pasta do projeto, instale as dependencias

```bash
npm install
```

### Iniciando o Servidor 

No terminal inicie o servidor

```bash
npm start
```

### Ferramentas :wrench:

- [MongoDB](https://www.mongodb.com/pt-br)
- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Joi](https://joi.dev/)
- [Moment](https://momentjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [ESLint](https://eslint.org/)
- [Nodemon](https://www.npmjs.com/package/nodemon)

## API-Funcionario


### Cadastrar Funcionario
``/api/v1/employee/``

```bash
{
    "name": "nome do funcionario",
    "cpf": "12345678910",
    "office": "gerente",
    "birthday": "10/11/2000"
}
```
- Todos os Campos são Obrigatorios.
- Nome precisa ter no minino 5 caracteres.
- CPF precisa ser valido.
- Office precisa ser **gerente**, **caixa**, ou **vendedor**.
- Funcionario precisa ser maior de 16 anos.

### Atualizar Funcionario
``/api/v1/employee/:id``

```bash
{
    "situation": disabled
}
```

- Qualquer campo pode ser atualizado
- Nenhum campo é obrigatorio
- situation precisa ser **active** ou **disabled**

### Deletar Funcionario

``/api/v1/employee/:id``

### Buscar Funcionario

``/api/v1/employee`` <br>
``/api/vi/employee?query=value``

```bash
[{
      "_id": "6292eaed3f578ee8f24ca85a",
      "name": "funcionario",
      "cpf": "12345678910",
      "office": "caixa",
      "birthday": "1999-05-13T03:00:00.000Z",
      "situation": "active",
      "createdAt": "2022-05-29T03:39:25.459Z",
      "updatedAt": "2022-05-29T04:26:23.845Z",
      "__v": 0
    }]
```
## API-Produto

### Cadastrar Produto

``/api/v1/product``

```bash
{
    "name": "nome do produto",
    "category": "eletronico",
    "price": 100000,
    "employee_id": "6292d406890f7c8d83db5e33",
  }
```

- Todos os campos são obrigatorio
- employee_id deve ser um funcionario cadastrado como **active** ocupando a função de **gerente**

### Buscar Produto

``/api/v1/product`` <br>
``/api/v1/product?query=value``

```bash
[{
    "_id": "6292d4cf890f7c8d83db5e44",
    "name": "nome do produto",
    "category": "eletronico",
    "price": 100000,
    "employee_id": "6292d406890f7c8d83db5e33",
    "__v": 0
  }]
```

## Tarefas em aberto

- [ ] Paginação
