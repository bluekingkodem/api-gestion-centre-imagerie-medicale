const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const {createType, updateType, deleteType} = require('../controllers/examTypeControllers')

router.post('/create', auth, createType)
router.put('/update/:id', auth, updateType)
router.delete('/delete/:id', auth, deleteType)

module.exports = router