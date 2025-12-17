const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const {createCategory, updateCategory, deleteCategory} = require('../controllers/examCategoryControllers')

router.post('/create', auth, createCategory)
router.put('/update/:id', auth, updateCategory)
router.delete('/delete/:id', auth, deleteCategory)

module.exports = router