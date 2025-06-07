    const express = require('express');
    const { MongoClient, ObjectId } = require('mongodb');

    const app = express();
    const port = 3001;
    const MONGO_URI = 'mongodb+srv://tiagoc:<db_password>@cluster0.rhvsbu0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    const DB_NAME = 'Académicos';


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
    })

    //Rota Alunos

    //Listar Alunos
    app.get('/Alunos', async (req, res) => {
        const alunos = await alunosCollection.find().toArray();
        console.log(alunos);
        res.json(alunos);
    });

    //Listar Aluno especifico por Id interno
    app.get('/Alunos/:id', async (req, res) => {
        console.log(req.paramns.id);
        const aluno = await alunosCollection.findOne({_id: new ObjectId (req.params.id) });
        console.log(aluno);
        res.json(aluno);
    });


    //Listar Aluno especifico por nome
    app.get('/Alunos/:nome', async (req, res) => {
        console.log(req.params.nome);
        const aluno = await alunosCollection.findOne({ nome: req.params.nome });
        console.log(aluno);
        res.json(aluno);
    });

    //Rotas Cursos

    //Listar Cursos
    app.get('/Cursos', async (req, res) => {
        const cursos = await cursosCollection.find().toArray();
        console.log(cursos);
        res.json(cursos);
    });


    //Listar curso especifico por Id interno
    app.get('/Cursos/:id', async (req, res) => {
        console.log(req.paramns.id);
        const curso = await cursosCollection.findOne({_id: parseInt(req.params.id) });

        if(!curso){
            res.status(404).json({ message: 'Curso não encontrado' });
        }else{
        console.log(aluno);
        res.json(aluno);
        }
    });