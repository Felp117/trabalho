const express = require('express');
const app = express();
const pessoaRepository = require('../Repository/user-repository')

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
