const express = require('express');
const router = express.Router()
const { register, login, createUser, updateUser, deleteUser, getUser, getAllUser } = require('../controllers/userControllers')
const auth = require('../middlewares/authMiddleware')

// Route pour inscription utilisateur
router.post('/register', register)

// Route pour connexion utilisateur
router.post('/login', login)

// Route pour creer un utilisateur
router.post('/create', auth, createUser)

// Route pour modifier un utilisateur
router.put('/update/:id', auth, updateUser)

// Route pour supprimer un utilisateur
router.delete('/delete/:id', auth, deleteUser)

// Route pour afficher un seul utilisateur
router.get('/show/:id', auth, getUser)

// Route pour afficher tous les utilisateurs
router.get('/showAll', auth, getAllUser)

module.exports = router