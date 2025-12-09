const express = require('express');
const router = express.Router()

const { createHealthT, updateHealthT, deleteHealthT } = require('../controllers/healthTrainingControllers');

router.post('/create', createHealthT);
router.put('/update', updateHealthT);
router.delete('/delete', deleteHealthT);

module.exports = router