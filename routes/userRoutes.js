const express = require('express');
const router = express.Router()
const { register, login, createUser, updateUser, deleteUser } = require('../controllers/userControllers')

router.post('/register', register);
router.post('/login', login);
router.post('/create', createUser);
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router