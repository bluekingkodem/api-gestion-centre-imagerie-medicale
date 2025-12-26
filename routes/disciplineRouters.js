const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const {createDisc, updateDisc, deleteDisc, getDisc, getAllDisc} = require('../controllers/disciplineControllers');

router.post('/create', auth, createDisc)
router.put('/update', auth, updateDisc)
router.delete('/delete', auth, deleteDisc)
router.get('/show', auth, getDisc)
router.get('/showAll', auth, getAllDisc)

module.exports = router