const express = require('express');
const router = express.Router()
const auth = require('../middlewares/authMiddleware')

const { createHealthT, updateHealthT, deleteHealthT, getHealthT, getAllHealthT } = require('../controllers/healthTrainingControllers');

// Route pour creer une formation sanitaire
router.post('/create', auth, createHealthT);

// Route pour modifier une formation sanitaire
router.put('/update', auth, updateHealthT);

// Route pour supprimer une formation sanitaire
router.delete('/delete', auth, deleteHealthT);

// Route pour afficher une seule formation sanitaire
router.get('/show/:id', auth, getHealthT)

// Route pour afficher toutes les formations sanitaires
router.get('/showAll', auth, getAllHealthT)

module.exports = router