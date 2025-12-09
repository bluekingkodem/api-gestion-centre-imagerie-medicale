const asyncHandler = require('express-async-handler');
const HealthTraining = require('../models/healthTrainingModel')

const createHealthT = asyncHandler(async (req, res) => {
    const {name} = req.body

    if(!name)
    {
        return res.status(400).json({error: 'Veuillez remplir ce champ'})
    }

    const healthTrainingExist = await HealthTraining.findOne({name: name})

    if(healthTrainingExist)
    {
        return res.status(409).json({error: 'Cette formation sanitaire existe deja!'})
    }

    const nameHealthTraining = await HealthTraining.create({name: name})
    
    if(nameHealthTraining)
    {
        res.status(201).json(
            {
                success: 'Formation sanitaire créé avec succès!'
            }
        )
    }
})

const updateHealthT = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Veuillez remplir ce champ' });
    }

    const healthT = await HealthTraining.findById(req.params.id)

    if (!healthT) {
        return res.status(400).json({ error: "Cette formation sanitaire n'existe pas" })
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

const deleteHealthT = asyncHandler(async (req, res) => {
    const healthT = await HealthTraining.findById(req.params.id)

    if (!healthT) {
        return res.status(400).json({ error: "Cette formation sanitaire n'existe pas" })
    }

    const deletedHealthT = await HealthTraining.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Formation sanitaire supprimée",
        health_training: deletedHealthT
    })
})

module.exports = {
    createHealthT,
    updateHealthT,
    deleteHealthT
}