const { conexao } = require("../db/db");

exports.listAll = async () => {
    const { rows } = await conexao.query('SELECT * FROM usuario');
    return rows;    
}

exports.findById = async (id) => {
    const { rows } = await conexao.query('SELECT * FROM usuario WHERE id = $1', [id])
    return rows;
}


exports.insert = async (usuarioIns) => {
    try {
        const { rows } = await conexao.query('INSERT INTO usuario (nome, email, telefone, cpf) values ($1, $2, $3, $4)', [usuarioIns.nome, usuarioIns.email, usuarioIns.telefone, usuarioIns.cpf]);
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

exports.update = async(usuarioUpd) => {
    try {
        const { rows } = await conexao.query('UPDATE usuario SET nome = $1, email = $2, telefone = $3, cpf = $4  WHERE id =$5 ', [usuarioUpd.nome, usuarioUpd.email, usuarioUpd.telefone, usuarioUpd.cpf, usuarioUpd.id]);
        return rows;
    } catch (error) {
        console.error(error);
    }
}
