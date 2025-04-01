const { Pool } = require("pg");

const conexao = new Pool({
    host: "localhost",
    user: "postgres",
    password: "123",
    database: "node2",
    port: 5432
});

conexao.connect()
    .then(() => {
        console.log("Conectado ao PostgreSQL!");
        inicializarBanco();
    })
    .catch(err => console.error("Error de conexão: ", err));

function inicializarBanco() {
    const querires = [
        `CREATE TABLE IF NOT EXISTS usuario (
            id SERIAL PRIMARY KEY,
            nome TEXT,
            email TEXT,
            telefone TEXT,
            cpf NUMERIC NOT NULL
        )`,
        `CREATE TABLE IF NOT EXISTS pessoa(
            id SERIAL PRIMARY KEY,
            nome TEXT,
            sobrenome TEXT
        )`,
        `TRUNCATE TABLE pessoa`,
        `TRUNCATE TABLE usuario`
    ];

    querires.forEach(query => {
        console.log(query);
        try {
            conexao.query(query);
            console.log("Tabelas criadas com sucesso!");
        } catch (error) {
            console.error("Error ao criar tabelas: ", error);
        }
    });
}

module.exports = { conexao }
