const asyncHandler = require('express-async-handler');
const Discipline = require('../models/disciplineModel')

// Creer discipline
const createDisc = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error("Veuillez remplir ce champ")
    }

    const discipline = await Discipline.findOne({ name: name })

    if (discipline) {
        res.status(409)
        throw new Error('Cette discipline existe deja !')
    }

    const newDiscipline = await Discipline.create({ name: name })

    if (newDiscipline) {
        res.status(201).json(
            {
                success: 'Discipline créé avec succès!',
                discipline: newDiscipline
            }
        )
    }
})

// Meettre a jour une discipline
const updateDisc = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    const disc = await Discipline.findById(req.params.id)

    if (!disc) {
        res.status(400)
        throw new Error("Cette discipline n'existe pas")
    }

    const updatedDisc = await Discipline.findByIdAndUpdate(
        req.params.id,
        {
            name,
        },
        { new: true }
    )

    res.status(200).json({
        success: 'Discipline modifiée avec succès',
        discipline: updatedDisc
    })
})

// Supprimer une discipline
const deleteDisc = asyncHandler(async (req, res) => {
    const disc = await Discipline.findById(req.params.id)

    if (!disc) {
        res.status(400)
        throw new Error("Cette discipline n'existe pas")
    }

    const deletedDisc = await Discipline.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Discipline supprimé",
        discipline: deletedDisc
    })
})

module.exports = {
    createDisc,
    updateDisc,
    deleteDisc
}