# 🧾 FinTrack - Backend

Este é o backend do **FinTrack**, um aplicativo de controle financeiro pessoal.  
A API foi desenvolvida em **Node.js + Express + Prisma**, utilizando **JWT** para autenticação e **SQLite/PostgreSQL** como banco de dados.

---

## 🚀 Tecnologias

- **Node.js**
- **Express**
- **Prisma ORM**
- **JWT (autenticação)**
- **Multer** (upload de arquivos)
- **Swagger** (documentação)
- **Cors**

---

## ⚙️ Instalação

Clone o repositório e acesse a pasta do backend:

```bash
git clone https://github.com/meloluvert/fintrack-backend.git
cd fintrack-backend/
```

Instale as dependências:

```bash
npm install
```

Se ocorrerem conflitos de versão:

```bash
npm install --legacy-peer-deps
```

---

## 🧩 Configuração do Ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
DATABASE_URL="file:./dev.db"     # ou a URL do banco PostgreSQL
JWT_SECRET="sua_chave_secreta_aqui"
```
Crie um pasta `uploads/` em src, caso queria os arquivos

---

## 🗄️ Banco de Dados

Para criar o banco e aplicar as migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

Para visualizar o banco (SQLite):

```bash
npx prisma studio
```

---

## ▶️ Execução

### Ambiente de desenvolvimento:
```bash
npm run dev
```

### Ambiente de produção:
```bash
npm run build
npm start
```

A API rodará em:  
👉 `http://localhost:3333`

---

## 📚 Rotas principais

| Método | Rota | Descrição |
|:------:|:-----|:-----------|
| `POST` | `/users` | Cria um novo usuário |
| `POST` | `/auth` | Faz login e retorna token JWT |
| `GET`  | `/transactions` | Lista transações do usuário autenticado |
| `POST` | `/transactions` | Cria nova transação |
| `GET`  | `/files/:filename` | Retorna arquivo de upload |

---

## 🔒 Autenticação

Rotas protegidas exigem header:
```
Authorization: Bearer <token>
```
---

## 📄 Documentação Swagger

Após iniciar o servidor, acesse:
👉 `http://localhost:3333/api-docs`

---

## 📂 Estrutura de Pastas

```
backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── @types/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middlewares/
│   ├── utils/
│   ├── routes.ts
│   └── server.ts
├── uploads/
├── package.json
├── tsconfig.json
└── README.md
```

## 🧩 Repositórios Relacionados

- 📦 **Mobile:** [FinTrack Mobile](https://github.com/brenopz07/FinTrack)
