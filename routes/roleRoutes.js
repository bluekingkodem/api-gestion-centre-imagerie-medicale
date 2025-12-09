const express = require('express');
const router = express.Router()
const { createRole, updateRole, deleteRole } = require('../controllers/roleControllers')

router.post('/create', createRole)
router.put('/update', updateRole)
router.delete('/delete', deleteRole)

module.exports = router