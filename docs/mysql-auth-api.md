# API de autenticacao com token e MySQL

O app foi ajustado para trabalhar com estes endpoints:

- `POST /api/cadastro_usuario`
- `GET /api/login_novo`
- `GET /api/validar_token`

## Resposta esperada no cadastro

```json
{
  "message": "Usuario cadastrado com sucesso",
  "token": "SEU_TOKEN_AQUI",
  "user": {
    "id": 1,
    "nome": "Gustavo",
    "email": "gustavo@gmail.com"
  }
}
```

## Resposta esperada no login

```json
{
  "message": "Login realizado com sucesso",
  "token": "SEU_TOKEN_AQUI",
  "user": {
    "id": 1,
    "nome": "Gustavo",
    "email": "gustavo@gmail.com"
  }
}
```

## Resposta esperada ao validar token

```json
{
  "valid": true,
  "user": {
    "id": 1,
    "nome": "Gustavo",
    "email": "gustavo@gmail.com"
  }
}
```

## Exemplo de tabela no MySQL

```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  nascimento DATE NOT NULL,
  genero VARCHAR(30) NOT NULL,
  token VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Fluxo esperado no backend

1. No cadastro, salvar o usuario no MySQL.
2. Gerar um token.
3. Retornar o token e os dados do usuario.
4. No login, validar email e senha no banco.
5. Retornar token e usuario.
6. Em `GET /api/validar_token`, ler o token `Bearer` e confirmar se ele e valido.

## Codigo de validacao do cadastro

Antes de enviar o cadastro para a API, o app valida um codigo local definido em `services/validationCode.js`.
O codigo atual e `123456`.

## Endpoints de clima

Para salvar clima no banco, o app espera estas rotas:

- `POST /api/salva_clima`
- `GET /api/todos_climas`
- `PUT /api/altera_clima`
- `DELETE /api/deletar_clima`

As rotas de clima recebem `token`. Por isso o app exige que o usuario esteja logado antes de salvar, listar, alterar ou deletar clima no banco.

Campos enviados no cadastro/alteracao:

```json
{
  "token": "TOKEN_DO_USUARIO",
  "cidade": "Sao Paulo",
  "estado": "SP",
  "temperatura": "27",
  "condicao": "Ensolarado",
  "umidade": "61",
  "vento": "12",
  "data": "2026-05-26",
  "observacao": "Ceu limpo durante a maior parte do dia."
}
```

Exemplo de tabela:

```sql
CREATE TABLE climas (
  id_clima INT AUTO_INCREMENT PRIMARY KEY,
  cidade VARCHAR(120) NOT NULL,
  estado VARCHAR(2) NOT NULL,
  temperatura VARCHAR(10) NOT NULL,
  condicao VARCHAR(120) NOT NULL,
  umidade VARCHAR(10) NOT NULL,
  vento VARCHAR(10) NOT NULL,
  data DATE NOT NULL,
  observacao TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Observacao

O React Native nao grava direto no MySQL. Ele envia para sua API, e a API e quem salva no banco.
