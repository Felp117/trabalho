const { pool } = require('../db/db');

async function createUser(req, res) {
  const { name, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO "user" (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "user" SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [name, email, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM "user" WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getUsers(req, res) {
  try {
    const result = await pool.query('SELECT * FROM "user"');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createUser, updateUser, deleteUser, getUsers };