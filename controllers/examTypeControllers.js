const asyncHandler = require('express-async-handler');
const ExamType = require('../models/examTypeModel')

const { generateCodeExamType } = require('../utils/generateCodeExam')

// Creer un type d'examen
const createType = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    let nameUpper = name.toUpperCase();

    const type = await ExamType.findOne({ name: nameUpper })

    if (type) {
        res.status(400)
        throw new Error(`le type d'examen ${type.name} existe deja`)
    }

    let code = await generateCodeExamType()
    const codeExist = await ExamType.findOne({ code: code })

    if (codeExist) {
        res.status(400)
        throw new Error('Ce code existe deja')
    }

    const userId = req.user._id

    const nameType = await ExamType.create(
        {
            name: nameUpper,
            code: code,
            id_user: userId
        }
    )

    if (nameType) {
        res.status(201).json({
            success: `Le type d'examen ${nameUpper} a été crée avec succès`,
            nameType
        })
    }
})

// Mettre a jour un type d'examen
const updateType = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    let nameUpper = name.toUpperCase();

    const type = await ExamType.findOne({ name: nameUpper })

    if (type) {
        res.status(400)
        throw new Error(`le type d'examen ${type.name} existe deja`)
    }

    const updatedType = await ExamType.findByIdAndUpdate(
        req.params.id,
        {
            name: nameUpper
        },
        { new: true }
    )

    res.status(200).json({
        success: "Type d'examen modifiée avec succès",
        type: updatedType
    })
})

// Supprimer un type d'examen
const deleteType = asyncHandler(async (req, res) => {
    const type = await ExamType.findById(req.params.id)

    if (!type) {
        res.status(400)
        throw new Error("Ce type d'examen n'existe pas")
    }

    const deletedType = await ExamType.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Type d'examen supprimé",
        categoryEx: deletedType
    })
})

// Afficher un unique type d'examen
const getExamType = asyncHandler(async (req, res) => {
    const examType = await ExamType.findById(req.params.id)

    if(!examType)
    {
        res.status(404)
        throw new Error("Type d'examen indisponible !")
    }

    res.status(200).json({
        examType
    })
})

// Afficher tous les types d'examen
const getAlltExamType = asyncHandler(async (req, res) => {
    const examType = await ExamType.find()

    if(examType.length === 0)
    {
        res.status(404)
        throw new Error("Aucun type d'examen disponible !")
    }

    res.status(200).json({
        examType
    })
})

module.exports = {
    createType,
    updateType,
    deleteType,
    getExamType,
    getAlltExamType
}