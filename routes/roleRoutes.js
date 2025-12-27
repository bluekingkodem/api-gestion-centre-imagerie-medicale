const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { createRole, updateRole, deleteRole, getRole, getAllRole } = require('../controllers/roleControllers')

// Route pour creer un role
router.post('/create', auth, createRole)

// Route pour modifier un role
router.put('/update', auth, updateRole)

// Route pour supprimer un role
router.delete('/delete', auth, deleteRole)

// Route pour afficher un seul role
router.get('/show/:id', auth, getRole)

// Route pour afficher tous les roles
router.get('/showAll', auth, getAllRole)

module.exports = router