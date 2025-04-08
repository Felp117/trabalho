const express = require('express');
const router = express.Router();
const { createUser, updateUser, deleteUser, getUsers } = require('../controllers/userController');

router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/users', getUsers);

module.exports = router;