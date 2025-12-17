const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { createHealthT, updateHealthT, deleteHealthT } = require('../controllers/healthTrainingControllers');

router.post('/create', auth, createHealthT);
router.put('/update', auth, updateHealthT);
router.delete('/delete', auth, deleteHealthT);

module.exports = router