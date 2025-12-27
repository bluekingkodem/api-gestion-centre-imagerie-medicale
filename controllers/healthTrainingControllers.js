const asyncHandler = require('express-async-handler');
const HealthTraining = require('../models/healthTrainingModel')

const getNextHealthTrainingNumber = require('../utils/getNextHealthTrainingNumber')

// Creer une formation sanitaire
const createHealthT = asyncHandler(async (req, res) => {
    const {name} = req.body

    if(!name)
    {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    const healthTraining = await HealthTraining.findOne({name: name})

    if(healthTraining)
    {
        res.status(409)
        throw new Error(`La formation sanitaire ${healthTraining.name} existe déja !`)
    }

    const code = await getNextHealthTrainingNumber()

    const userId = req.user._id

    const nameHealthTraining = await HealthTraining.create(
        {
            code: code,
            name: name,
            id_user: userId
        }
    )
    
    if(nameHealthTraining)
    {
        res.status(201).json(
            {
                success: 'Formation sanitaire créé avec succès!',
                nameHealthTraining
            }
        )
    }
})

// Mettre a jour une formation sanitaire
const updateHealthT = asyncHandler(async (req, res) => {
    const { name } = req.body

   if(!name)
    {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    const healthT = await HealthTraining.findById(req.params.id)

    if (!healthT) {
        res.status(400)
        throw new Error(`La formation sanitaire ${healthT.name} n'existe pas !`)
    }

    const updatedHealthT = await HealthTraining.findByIdAndUpdate(
        req.params.id,
        {
            name,
        },
        { new: true }
    )

    res.status(200).json({
        success: 'Formation sanitaire modifiée avec succès',
        health_training: updatedHealthT
    })
})

// Supprimer une formation sanitaire
const deleteHealthT = asyncHandler(async (req, res) => {
    const healthT = await HealthTraining.findById(req.params.id)

    if (!healthT) {
        res.status(400)
        throw new Error("Cette formation sanitaire n'existe pas")
    }

    const deletedHealthT = await HealthTraining.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Formation sanitaire supprimée",
        health_training: deletedHealthT
    })
})

// Afficher une unique formation sanitaire
const getHealthT = asyncHandler(async (req, res) => {
    const health_training = HealthTraining.findByIdAndDelete(req.params.id)

    if(!health_training)
    {
        res.status(404)
        throw new Error("Formation sanitaire indisponible")
    }

    res.status(200).json({
        health_training
    })
})

// Afficher toutes les formations sanitaires
const getAllHealthT = asyncHandler(async (req, res) => {
    const health_training = HealthTraining.find()

    if(!health_training.length === 0)
    {
        res.status(404)
        throw new Error("Aucune formation sanitaire")
    }

    res.status(200).json({
        health_training
    })
})

module.exports = {
    createHealthT,
    updateHealthT,
    deleteHealthT,
    getHealthT,
    getAllHealthT
}