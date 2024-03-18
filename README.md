# Lunch API

Este repositório contém um microsserviço dedicado ao gerenciamento de pedidos em um restaurante/lanchonete. O microsserviço permite a criação, atualização e consulta do status de pagamento dos pedidos além de cadastro de clientes. A API é documentada usando o Swagger, que fornece uma interface intuitiva para testar e explorar os endpoints.

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=FIAP-SOAT-GRP5_ms-order&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=FIAP-SOAT-GRP5_ms-order)

## Pré-requisitos

- Node.js
- Docker

## Começando

Siga as instruções abaixo para obter uma cópia do projeto localmente e executá-lo para fins de desenvolvimento e teste.

1. Faça o download do repositório do projeto:
```shell
git clone https://github.com/FIAP-SOAT-GRP5/ms-payment.git
```

2. Instale as dependências necessárias:
```shell
cd ms-payment
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes informações de banco de dados:

```
NODE_ENV="development"
TZ="America/São Paulo"
PORT="3000"

DB_TYPE="mysql"
DB_HOST="localhost"
DB_PORT="3306"
DB_USERNAME=""
DB_PASSWORD=""
DB_DATABASE="app"

MP_ACCESS_TOKEN=""

JWT_KEY=""

QUEUE_CREATE_ORDER_URL=""
QUEUE_UPDATE_ORDER_URL=""

AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION=""
```


Após o contêiner estar em execução, você poderá acessar a API em seu navegador usando os seguintes endereços:

- Para acessar o Swagger: http://localhost:8080/api
- Para acessar o phpMyAdmin: http://localhost:8081

## Documentação das rotas

### Cliente(s)

#### Cadastrar

Para cadastrar o(s) cliente(s) no Swagger, utilize o endpoint `/client` com método POST.
O cliente pode optar por não se identificar.

Cada produto deve conter os seguintes campos:

- `document`: string (documento do cliente)
- `name`: string (nome do cliente)
- `email`: string (e-mail do cliente)

Endpoint: `POST /client`

Exemplo de valor com identificação do cliente:
```json
{
  "document": "0000000000",
  "name": "FIAP",
  "email": "aluno@fiap.com.br"
}
```

Exemplo de valor sem identificação do cliente:
```json
{ }
```

#### Consultar

Utilize a rota abaixo para realizar consultas específicas de acordo com o documento do cliente.

Endpoint: `GET /client/{document}`

Lembre-se de substituir `{document}` pelo documento real do cliente.

#### Atualizar

Utilize a rota abaixo para realizar a proteção de dados do cliente.

Endpoint: `PUT /client/{id}`

Lembre-se de substituir `{id}` pelo id real do cliente.

Exemplo de valor retornado por esta rota:
```json
{
  "id": 1,
  "document": "12345678909",
  "name": "",
  "email": ""
}
```

### Pedido(s)

#### Criar

Para criar um pedido, enviar um pedido para a fila create_order_payment

Exemplo de como preencher os valores para cadastrar um pedido:
```json
{
  "id": 1,
  "status": "awaiting_payment",
  "orderItems": {
    "price": 1,
    "quantity": 2
    "item": {
      "id": 1
      "name": "test"
    }
  } 
}
```

#### Atualizar

Esta rota recebe o Id do pedido via webhook do mercado pago e atualiza o campo status_payment do pedido.

Endpoint: `POST /order/status/payment`

Exemplo de valor com id do pedido enviado pelo Mercado Pago:
```json
{
  "id": "62751724962"
}
```
