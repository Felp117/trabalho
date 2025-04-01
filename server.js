const express = require('express');
const app = express();
const pessoaRepository = require('./app/repository/pessoa-repository')
const userRepository = require('./app/repository/user-repository')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));

app.get('/pessoa', async(req, res) => {
    let resposta = await pessoaRepository.listAll();
    res.json(resposta);
});

app.get('/pessoa/:id', async (req, res) => {
    console.log(req.params.id)
    let resposta = await pessoaRepository.findById(req.params.id);
    console.log(resposta);
    res.json(resposta);
});

app.post('/pessoa', async (req, res) => {
    const pessoa = {
        login: req.body.login,
        senha: req.body.senha
    };
    let resposta = await pessoaRepository.insert(pessoa);
    res.json(resposta);
});

app.put('/pessoa/:id', async (req, res) => {

    const pessoaUpd = {
        id: req.params.id,
        login: req.body.login
    };
    let resposta = await pessoaRepository.update(pessoaUpd);
    res.json(resposta);
});

app.delete('/pessoa/:id', async (req, res) => {

    const pessoaDelete = {
        id: req.params.id
    };

    let resposta = await pessoaRepository.delete(pessoaDelete);
    res.json(resposta);
});

//-----------------------------------------------------------------------------


app.get('/usuario', async(req, res) => {
    let resposta = await userRepository.listAll();
    res.json(resposta);
})

app.get('/usuario/:id', async (req, res) => {
    let resposta = await userRepository.findById(req.params.id);
    res.json(resposta);  
});

app.post('/usuario', async (req, res) => {
    const usuarioIns = {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        cpf: req.body.cpf
    };
    let resposta = await userRepository.insert(usuarioIns);
    res.json(resposta);
})

app.delete('/usuario/:id', async (req, res) => {
    let resposta = await userRepository.delete(req.params.id);
    res.json(resposta);
})

app.put('/usuario/:id', async (req, res) => {
    
    const usuarioUpd = {
        id: req.params.id,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        cpf: req.body.cpf
    };
    let resposta = await userRepository.update(usuarioUpd);
    res.json(resposta);
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
