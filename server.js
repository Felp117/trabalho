const express = require('express');
const app = express();
const pessoaRepository = require('./app/repository/pessoa-repository')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));

app.get('/pessoa', async(req, res) => {
    let resposta = await pessoaRepository.listAll();
    res.json(resposta);
    
});

app.get('/pessoa', async(req, res) => {
    let resposta = await pessoaRepository.listAll();
    res.json(resposta);
});

app.get('/pessoa/:id', async (req, res) => {
    let resposta = pessoaRepository.findById(req.params.id);
    res.json(resposta);  
});

app.post('/pessoa', async (req, res) => {
    let resposta = pessoaRepository.insert();
    res.json(resposta);
});

app.delete('/pessoa/:id', async (req, res) => {
    let resposta = pessoaRepository.delete();
    res.json(resposta);
});

app.put('/pessoa/:id', async (req, res) => {
    let resposta = pessoaRepository.update();
    res.json(resposta);
});

app.get('/usuario', async(req, res) => {
    let resposta = await pessoaRepository.listAll();
    res.json(resposta);
})

app.get('/usuario/:id', async (req, res) => {
    let resposta = pessoaRepository.findById(req.params.id);
    res.json(resposta);  
});

app.post('/usuario', async (req, res) => {
    let resposta = pessoaRepository.insert();
    req.json(resposta);
})

app.delete('/usuario/:id', async (req, res) => {
    let resposta = pessoaRepository.delete(req.params.id);
    res.json(resposta);
})

app.put('/usuario/:id', async (req, res) => {
    let resposta = pessoaRepository.update(req.params.id);
    res.json(resposta);
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
