const Person = require('../models/personModel');

const createPerson = async (req, res) => {
  const { name, age } = req.body;
  try {
    const person = await Person.createPerson(name, age);
    res.status(201).json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPersons = async (req, res) => {
  try {
    const persons = await Person.getPersons();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPersonById = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.getPersonById(id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePerson = async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;
  try {
    const person = await Person.updatePerson(id, name, age);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePerson = async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.deletePerson(id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person successfully deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPerson,
  getPersons,
  getPersonById,
  updatePerson,
  deletePerson,
};