# TW2425CLASS - Trabalho 1 REST API

**Autor:** Tiago Castro nº31456

---

## Publicação

- **Frontend:** [https://twt1restapi-tiago-castro05-4bkpc51uk.vercel.app](https://twt1restapi-tiago-castro05-4bkpc51uk.vercel.app)
- **Backend/API:** [https://twt1restapi-tiagocastro05-1.onrender.com](https://twt1restapi-tiagocastro05-1.onrender.com)
- **Swagger (Documentação da API):** [https://twt1restapi-tiagocastro05-1.onrender.com/api-docs](https://twt1restapi-tiagocastro05-1.onrender.com/api-docs)

---

## Instalação e Execução Local

### Pré-requisitos

- Node.js (v18+ recomendado)
- npm
- Conta MongoDB Atlas (ou MongoDB local)

### Instalar dependências

```sh
cd backend
npm install
```

### Configurar ligação à base de dados

No ficheiro `backend/server.js`, altere a variável `MONGO_URI` para a sua connection string do MongoDB Atlas.

### Correr o backend

```sh
npm start
```

O servidor ficará disponível em `http://localhost:3001`.

---

## Descrição da Base de Dados

A base de dados chama-se **Académicos** e tem duas coleções principais:

- **Alunos**
  - `id` (string)
  - `nome` (string)
  - `apelido` (string)
  - `cursoID` (string)
  - `anoCurricular` (string, opcional)

- **Cursos**
  - `id` (string)
  - `nomeCurso` (string)

---

## Descrição da API (Principais Rotas RESTful)

| Método | Rota                       | Descrição                                 |
|--------|----------------------------|-------------------------------------------|
| GET    | /Alunos                    | Lista todos os alunos                     |
| GET    | /Alunos/:id                | Lista aluno por ID                        |
| GET    | /Alunos/nome/:nome         | Lista aluno por nome                      |
| POST   | /Alunos                    | Cria novo aluno                           |
| PUT    | /Alunos/:id                | Atualiza aluno por ID                     |
| DELETE | /Alunos/:id                | Remove aluno por ID                       |
| GET    | /Cursos                    | Lista todos os cursos                     |
| GET    | /Cursos/:id                | Lista curso por ID                        |
| POST   | /Cursos                    | Cria novo curso                           |
| PUT    | /Cursos/:id                | Atualiza curso por ID                     |
| DELETE | /Cursos/:id                | Remove curso por ID                       |

Para mais detalhes e exemplos, consulte a [documentação Swagger](https://twt1restapi-tiagocastro05-1.onrender.com/api-docs).

---

## Descrição do Frontend

- Aplicação simples em HTML, CSS e JavaScript.
- Permite listar, pesquisar, criar, editar e remover Alunos e Cursos.
- Consome a API RESTful publicada no Render.
- Pesquisa por nome de aluno e curso.
- Interface responsiva e intuitiva.

---

## Outros Conteúdos Relevantes

- Estrutura do backend segue o padrão MVC (Model-View-Controller) usando Express e MongoDB (com Mongoose sugerido para bónus).
- A API está documentada com Swagger.
- O projeto pode ser facilmente adaptado para outros sistemas de base de dados MongoDB.

---