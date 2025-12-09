const express = require('express');
const router = express.Router()

const {createDisc, updateDisc, deleteDisc} = require('../controllers/disciplineControllers');

router.post('/create', createDisc)
router.put('/update', updateDisc)
router.delete('/delete', deleteDisc)

module.exports = router