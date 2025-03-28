const pessoaRepository = require('../repository/pessoa-repository')

app.get('/pessoa', async(req, res) => {
    let resposta = await pessoaRepository.listAll();
    res.json(resposta);
});

app.get('/pessoa/:id', async (req, res) => {
    let resposta = pessoaRepository.findById(req.params.id);
    res.json(resposta);  
});

app.post('/pessoa', async (req, res) => {

    const pessoa = {
        nome: req.body.login,
        senha: req.body.senha
    };
    
    let resposta = pessoaRepository.insert(pessoa);
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
