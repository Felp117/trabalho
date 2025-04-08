const express = require('express');
const router = express.Router();
const { createPerson, updatePerson, deletePerson, getPeople } = require('../controllers/personController');

router.post('/persons', createPerson);
router.put('/persons/:id', updatePerson);
router.delete('/persons/:id', deletePerson);
router.get('/persons', getPeople);

module.exports = router;