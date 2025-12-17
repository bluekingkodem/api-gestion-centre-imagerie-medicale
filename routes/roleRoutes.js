const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { createRole, updateRole, deleteRole } = require('../controllers/roleControllers')

router.post('/create', auth, createRole)
router.put('/update', auth, updateRole)
router.delete('/delete', auth, deleteRole)

module.exports = router