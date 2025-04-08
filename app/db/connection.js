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
        `CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS "pessoa" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL
    )`,
    `TRUNCATE TABLE "pessoa"`,
    `TRUNCATE TABLE "user"`
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

module.exports = { conexao, inicializarBanco }
