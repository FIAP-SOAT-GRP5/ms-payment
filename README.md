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
git clone https://github.com/thegabslima/lunch-api.git
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

### Pedido(s)

#### Atualizar

Esta rota recebe o Id do pedido via webhook do mercado pago e atualiza o campo status_payment do pedido.

Endpoint: `POST /order/status/payment`

Exemplo de valor com id do pedido enviado pelo Mercado Pago:
```json
{
  "action": "payment.created",
  "api_version": "v1",
  "data": {
    "id": "62751724962"
  },
  "date_created": "2023-08-26T14:16:59Z",
  "id": 107253998802,
  "live_mode": true,
  "type": "payment",
  "user_id": "1455021943"
}
```
