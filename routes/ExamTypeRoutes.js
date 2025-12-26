const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const {createType, updateType, deleteType, getExamType, getAlltExamType} = require('../controllers/examTypeControllers')

// Route pour creer un type d'examen
router.post('/create', auth, createType)

// Route pour modifier un type d'examen
router.put('/update/:id', auth, updateType)

// Route pour supprimer un type d'examen
router.delete('/delete/:id', auth, deleteType)

// Route pour afficher un unique type examen
router.get('/show/:id', auth, getExamType)

// Route pour afficher tous les type d'examen
router.get('showAll', auth, getAlltExamType)

module.exports = router