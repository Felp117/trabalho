const { conexao } = require("../db/db");

exports.listAll = async () => {
    const { rows } = await conexao.query('SELECT * FROM usuario');
    return rows;    
}

exports.findById = async (id) => {
    const { rows } = await conexao.query('SELECT * FROM usuario WHERE id = $1', [id])
    return rows;
}


exports.insert = async (nome, email, telefone, endereco, cpf) => {
    try {
        const { rows } = await conexao.query('INSERT INTO usuario (nome, email, telefone, endereco, cpf) values $1, $2, $3, $4, $5', [nome, email, telefone, endereco, cpf]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

exports.delete = async(id) => {
    try {
        const { rows } = await conexao.query('DELETE FROM usuario WHERE id = $1', [id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

exports.update = async(nome, id) => {
    try {
        const { rows } = await conexao.query('UPDATE usuario SET login = $1 WHERE id = $2', [nome, id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}

