const asyncHandler = require('express-async-handler');
const Discipline = require('../models/disciplineModel')

const createDisc = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Veuillez remplir ce champ' })
    }

    const disciplineExist = await Discipline.findOne({ name: name })

    if (disciplineExist) {
        return res.status(409).json({ error: 'Ce role existe deja!' })
    }

    const nameDiscipline = await Discipline.create({ name: name })

    if (nameDiscipline) {
        res.status(201).json(
            {
                success: 'Discipline créé avec succès!'
            }
        )
    }
})

const createRole = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Veuillez remplir ce champ' })
    }

    const roleExist = await Role.findOne({ name: name })

    if (roleExist) {
        return res.status(409).json({ error: 'Ce role existe deja!' })
    }

    const nameRole = await Role.create({ name: name })

    if (nameRole) {
        return res.status(201).json(
            {
                success: 'Role créé avec succès!'
            }
        )
    }
})

const updateDisc = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        return res.status(400).json({ error: 'Veuillez remplir ce champ' });
    }

    const disc = await Discipline.findById(req.params.id)

    if (!disc) {
        return res.status(400).json({ error: "Cette discipline n'existe pas" })
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
        role: updatedRole
    })
})

const deleteDisc = asyncHandler(async (req, res) => {
    const disc = await Discipline.findById(req.params.id)

    if (!disc) {
        return res.status(400).json({ error: "Cette discipline n'existe pas" })
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