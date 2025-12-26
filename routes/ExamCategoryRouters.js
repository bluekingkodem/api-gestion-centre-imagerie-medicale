const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const {createCategory, updateCategory, deleteCategory, getExamCategory, getAllExamCategory} = require('../controllers/examCategoryControllers')

router.post('/create', auth, createCategory)
router.put('/update/:id', auth, updateCategory)
router.delete('/delete/:id', auth, deleteCategory),
router.get('/show', auth, getExamCategory),
router.get('showAll', auth, getAllExamCategory)

module.exports = router