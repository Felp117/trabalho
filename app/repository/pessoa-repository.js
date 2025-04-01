const { conexao } = require("../db/db");

exports.listAll = async () => {
    const { rows } = await conexao.query('SELECT * FROM pessoa');
    return rows;    
}

exports.findById = async (id) => {
    try{
        const { rows } = await conexao.query('SELECT * FROM pessoa WHERE id = $1', [id])
        return rows[0] ?? {};
    } catch (error) {
        console.error(error)
    }
}

exports.insert = async (pessoa) => {
    try {
        const { rows } = await conexao.query('INSERT INTO pessoa (login, senha) values ($1, $2)', [pessoa.login, pessoa.senha]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

exports.update = async(pessoaUpd) => {
    try {
        const { rows } = await conexao.query('UPDATE pessoa SET login = $1 WHERE id = $2', [pessoaUpd.login, pessoaUpd.id]);
        return rows[0] ?? {};
    } catch (error) {
        console.error(error);
    }
}

exports.delete = async(pessoaDelete) => {
    try {
        const { rows } = await conexao.query('DELETE FROM pessoa WHERE id = $1', [pessoaDelete]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}