const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const {createDisc, updateDisc, deleteDisc, getDisc, getAllDisc} = require('../controllers/disciplineControllers');

// Route pour creer une discipline
router.post('/create', auth, createDisc)

// Route pour modifier une discipline
router.put('/update', auth, updateDisc)

// Route pour supprimer une discipline
router.delete('/delete', auth, deleteDisc)

// Route pour afficher une seule discipline
router.get('/show/:id', auth, getDisc)

// Route pour afficher toutes les disciplines
router.get('/showAll', auth, getAllDisc)

module.exports = router