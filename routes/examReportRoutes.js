const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { createExamReport, updateExamReport, deleteExamReport } = require('../controllers/examReportControllers')

router.post('/create', auth, createExamReport)
router.put('/update/:id', auth, updateExamReport)
router.delete('/delete/:id', auth, deleteExamReport)

module.exports = router