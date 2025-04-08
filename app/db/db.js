const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '123', 
  database: 'node2',
  port: 5432,
});

async function initializeDatabase() {
  try {
    const client = await pool.connect();
    await client.query(`
      CREATE TABLE IF NOT EXISTS "user" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
      );
      CREATE TABLE IF NOT EXISTS "person" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        age INT NOT NULL
      );
    `);
    console.log("Tabelas criadas ou já existem!");
    client.release();
  } catch (err) {
    console.error('Erro ao inicializar o banco de dados:', err);
  }
}

module.exports = { pool, initializeDatabase };