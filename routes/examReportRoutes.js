const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { createExamReport, updateExamReport, deleteExamReport, getExamReport, getAllExamReport } = require('../controllers/examReportControllers')

// Route pour creer une modele d'examen
router.post('/create', auth, createExamReport)

// Route pour modifier un modele d'examen
router.put('/update/:id', auth, updateExamReport)

// Route pour supprimer in modele d'examen
router.delete('/delete/:id', auth, deleteExamReport)

// Route pour afficher un unique modele d'examen
router.get('/show/:id', auth, getExamReport)

// Route pour afficher tous les modeles d'examen
router.get('/showAll', auth, getAllExamReport)

module.exports = router