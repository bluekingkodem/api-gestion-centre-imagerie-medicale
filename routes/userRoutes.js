const express = require('express');
const router = express.Router()
const { register, login, createUser, updateUser, deleteUser } = require('../controllers/userControllers')
const auth = require('../middlewares/authMiddleware')

router.post('/register', register)
router.post('/login', login)
router.post('/create', auth, createUser)
router.put('/update/:id', auth, updateUser)
router.delete('/delete/:id', auth, deleteUser)

module.exports = router