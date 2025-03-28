const { conexao } = require("../db/db");

exports.listAll = async () => {
    const { rows } = await conexao.query('SELECT * FROM pessoa');
    return rows;    
}

exports.findById = async (id) => {
    const { rows } = await conexao.query('SELECT * FROM pessoa WHERE id = $1', [id])
    return rows;
}

exports.insert = async (pessoa) => {


    try {
        const { rows } = await conexao.query('INSERT INTO pessoa (login, senha) values ($1, $2)', [pessoa.login, pessoa.senha]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

exports.delete = async(id) => {
    try {
        const { rows } = await conexao.query('DELETE FROM pessoa WHERE id = $1', [id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

exports.update = async(nome, id) => {
    try {
        const { rows } = await conexao.query('UPDATE pessoa SET login = $1 WHERE id = $2', [nome, id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}