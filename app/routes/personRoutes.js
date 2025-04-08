const express = require('express');
const router = express.Router();
const personController = require('../controller/personController');

router.post('/pessoa', personController.createPerson);
router.get('/pessoa', personController.getPersons);
router.get('/pessoa/:id', personController.getPersonById);
router.put('/pessoa/:id', personController.updatePerson);
router.delete('/pessoa/:id', personController.deletePerson);

module.exports = router;