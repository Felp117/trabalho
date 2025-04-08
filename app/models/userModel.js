const pool = require('../db/connection');

const createUser = async (name, email) => {
  const query = 'INSERT INTO user(name, email) VALUES($1, $2) RETURNING *';
  const result = await pool.query(query, [name, email]);
  return result.rows[0];
};

const getUsers = async () => {
  const query = 'SELECT * FROM user';
  const result = await pool.query(query);
  return result.rows;
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM user WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateUser = async (id, name, email) => {
  const query = 'UPDATE user SET name = $1, email = $2 WHERE id = $3 RETURNING *';
  const result = await pool.query(query, [name, email, id]);
  return result.rows[0];
};

const deleteUser = async (id) => {
  const query = 'DELETE FROM user WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};