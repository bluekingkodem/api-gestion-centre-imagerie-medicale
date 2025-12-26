const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { createExam, updateExam, deleteExam, getExam, getAllExam } = require('../controllers/examControllers')

// Route de creation d'examen
router.post('/create', auth, createExam) 

// Route de mise a jour des examens
router.put('/update/:id', auth, updateExam)

// Route pour supprimer un examen
router.delete('/delete/:id', auth, deleteExam)

// Route pour afficher un unique examen
router.get('/show/:id', auth, getExam)

// Route pour afficher tous les examens
router.get('/show_all', auth, getAllExam)

module.exports = router