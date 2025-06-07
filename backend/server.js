const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3001;
const MONGO_URI = 'mongodb+srv://tiagoc:123@cluster0.rhvsbu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = 'Académicos';

app.use(cors()); // Permite CORS
app.use(express.json()); // Para parsear JSON no body

// Configuração do Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Acadêmicos',
    version: '1.0.0',
    description: 'Documentação da API Acadêmicos',
  },
  servers: [
    {
      url: 'https://twt1restapi-tiagocastro05-1.onrender.com', // URL da sua API no Render
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./server.js'], // Vai ler os comentários deste arquivo
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

let db, alunosCollection, cursosCollection;

MongoClient.connect(MONGO_URI)
  .then(client => {
    db = client.db(DB_NAME);
    alunosCollection = db.collection('Alunos');
    cursosCollection = db.collection('Cursos');

    app.listen(port, () => {
      console.log(`Servidor a correr em http://localhost:${port}`);
    });
  })
  .catch(err => console.error(err));

app.get('/', async (req, res) => {
  res.send('<h1>Olá TW ECGM</h1>');
});

/**
 * @swagger
 * /Alunos:
 *   get:
 *     summary: Retorna a lista de alunos
 *     responses:
 *       200:
 *         description: Lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nome:
 *                     type: string
 *                   apelido:
 *                     type: string
 *                   cursoID:
 *                     type: string
 */
app.get('/Alunos', async (req, res) => {
  const alunos = await alunosCollection.find().toArray();
  res.json(alunos);
});

/**
 * @swagger
 * /Alunos/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID interno
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 apelido:
 *                   type: string
 *                 cursoID:
 *                   type: string
 *       404:
 *         description: Aluno não encontrado
 */
app.get('/Alunos/:id', async (req, res) => {
  try {
    const aluno = await alunosCollection.findOne({_id: new ObjectId(req.params.id)});
    if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
    res.json(aluno);
  } catch (error) {
    res.status(400).json({ message: 'ID inválido' });
  }
});

/**
 * @swagger
 * /Alunos/nome/{nome}:
 *   get:
 *     summary: Retorna um aluno pelo nome
 *     parameters:
 *       - in: path
 *         name: nome
 *         schema:
 *           type: string
 *         required: true
 *         description: Nome do aluno
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nome:
 *                   type: string
 *                 apelido:
 *                   type: string
 *                 cursoID:
 *                   type: string
 *       404:
 *         description: Aluno não encontrado
 */
app.get('/Alunos/nome/:nome', async (req, res) => {
  const aluno = await alunosCollection.findOne({ nome: req.params.nome });
  if (!aluno) return res.status(404).json({ message: 'Aluno não encontrado' });
  res.json(aluno);
});

/**
 * @swagger
 * /Cursos:
 *   get:
 *     summary: Retorna a lista de cursos
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   nomeCurso:
 *                     type: string
 */
app.get('/Cursos', async (req, res) => {
  const cursos = await cursosCollection.find().toArray();
  res.json(cursos);
});

/**
 * @swagger
 * /Cursos/{id}:
 *   get:
 *     summary: Retorna um curso pelo ID interno
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 nomeCurso:
 *                   type: string
 *       404:
 *         description: Curso não encontrado
 */
app.get('/Cursos/:id', async (req, res) => {
  try {
    const curso = await cursosCollection.findOne({_id: new ObjectId(req.params.id)});
    if (!curso) return res.status(404).json({ message: 'Curso não encontrado' });
    res.json(curso);
  } catch (error) {
    res.status(400).json({ message: 'ID inválido' });
  }
});
