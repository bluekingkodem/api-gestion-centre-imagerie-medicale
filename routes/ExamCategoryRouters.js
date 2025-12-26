const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const {createCategory, updateCategory, deleteCategory, getExamCategory, getAllExamCategory} = require('../controllers/examCategoryControllers')

// route categorie d'examen
router.post('/create', auth, createCategory)

// Route modifier une categorie d'examen
router.put('/update/:id', auth, updateCategory)

// Route pour supprimer une categorie d'examen
router.delete('/delete/:id', auth, deleteCategory),

// Route pour afficher une seule categorie d'examen
router.get('/show/:id', auth, getExamCategory),

// Route pour afficher toutes les categories d'examen
router.get('showAll', auth, getAllExamCategory)

module.exports = router