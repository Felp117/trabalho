const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/usuario', userController.createUser);
router.get('/usuario', userController.getUsers);
router.get('/usuario/:id', userController.getUserById);
router.put('/usuario/:id', userController.updateUser);
router.delete('/usuario/:id', userController.deleteUser);

module.exports = router;