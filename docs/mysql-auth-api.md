# API de autenticacao com token e MySQL

O app foi ajustado para trabalhar com estes endpoints:

- `POST /api/cadastro_de_usuario`
- `POST /api/login`
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

## Observacao

O React Native nao grava direto no MySQL. Ele envia para sua API, e a API e quem salva no banco.
