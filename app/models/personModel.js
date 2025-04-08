const pool = require('../db/connection');

const createPerson = async (name, age) => {
  const query = 'INSERT INTO person(name, age) VALUES($1, $2) RETURNING *';
  const result = await pool.query(query, [name, age]);
  return result.rows[0];
};

const getPersons = async () => {
  const query = 'SELECT * FROM person';
  const result = await pool.query(query);
  return result.rows;
};

const getPersonById = async (id) => {
  const query = 'SELECT * FROM person WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updatePerson = async (id, name, age) => {
  const query = 'UPDATE person SET name = $1, age = $2 WHERE id = $3 RETURNING *';
  const result = await pool.query(query, [name, age, id]);
  return result.rows[0];
};

const deletePerson = async (id) => {
  const query = 'DELETE FROM person WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createPerson,
  getPersons,
  getPersonById,
  updatePerson,
  deletePerson,
};