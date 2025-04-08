const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123',
  port: 5432,
});

const createDatabase = async () => {
  const client = await pool.connect();
  
  try {
    const result = await client.query("SELECT 1 FROM pg_database WHERE datname = 'node2'");
    if (result.rowCount === 0) {
      console.log("Banco de dados 'node2' não encontrado. Criando...");
      await client.query("CREATE DATABASE node2");
      console.log("Banco de dados 'node2' criado com sucesso!");
    } else {
      console.log("Banco de dados 'node2' já existe.");
    }
  } catch (err) {
    console.error("Erro ao criar banco de dados: ", err);
  } finally {
    client.release();
  }
};

const createTables = async () => {
  const client = await pool.connect();

  try {
    const createUserTable = `
      CREATE TABLE IF NOT EXISTS usuario (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
    `;
    const createPersonTable = `
      CREATE TABLE IF NOT EXISTS pessoa (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL
      );
    `;
    
    await client.query(createUserTable);
    await client.query(createPersonTable);
    console.log("Tabelas 'usuario' e 'pessoa' criadas com sucesso.");
  } catch (err) {
    console.error("Erro ao criar tabelas: ", err);
  } finally {
    client.release();
  }
};

const initializeDatabase = async () => {
  try {
    await createDatabase();
    await createTables();
  } catch (err) {
    console.error("Erro durante a inicialização do banco de dados:", err);
  }
};

initializeDatabase();

module.exports = pool;