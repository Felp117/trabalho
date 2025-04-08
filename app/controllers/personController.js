const { pool } = require('../db/db');

async function createPerson(req, res) {
  const { name, age } = req.body;
  try {
    const result = await pool.query('INSERT INTO "person" (name, age) VALUES ($1, $2) RETURNING *', [name, age]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updatePerson(req, res) {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "person" SET name = $1, age = $2 WHERE id = $3 RETURNING *',
      [name, age, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function deletePerson(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM "person" WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.status(200).json({ message: 'Person deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getPeople(req, res) {
  try {
    const result = await pool.query('SELECT * FROM "person"');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createPerson, updatePerson, deletePerson, getPeople };