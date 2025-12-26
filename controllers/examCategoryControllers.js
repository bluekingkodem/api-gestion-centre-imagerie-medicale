const asyncHandler = require('express-async-handler');
const ExamCategory = require('../models/examCategoryModel')

const { generateCodeExamCategory } = require('../utils/generateCodeExam') //generation automatique du code d'examen

// Creer une categorie d'examen
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    let nameUpper = name.toUpperCase();

    const category = await ExamCategory.findOne({ name: nameUpper })

    if (category) {
        res.status(400)
        throw new Error(`${category.name} existe deja`)
    }

    let code = await generateCodeExamCategory()
    const codeExist = await ExamCategory.findOne({code: code})

    if(codeExist)
    {
        res.status(400)
        throw new Error('Ce code existe deja')
    }

    const userId = req.user._id

    const nameCategory = await ExamCategory.create(
        {
            name: nameUpper,
            code: code,
            id_user: userId
        }
    )

    if (nameCategory) {
        res.status(201).json({ 
            success: `Categorie d'examen ${nameUpper} crée avec succès`,
            category: nameCategory
        })
    }
})

// Modifier une categorie d'examen
const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body

    if (!name) {
        res.status(400)
        throw new Error('Veuillez remplir ce champ')
    }

    let nameUpper = name.toUpperCase();

    const category = await ExamCategory.findOne({ name: nameUpper })

    if (category) {
        res.status(400)
        throw new Error(`${category.name} existe deja`)
    }

    const updatedCategory = await ExamCategory.findByIdAndUpdate(
        req.params.id,
        {
            name: nameUpper
        },
        { new: true }
    )

    res.status(200).json({
        success: 'Categorie modifiée avec succès',
        category: updatedCategory
    })
})

const deleteCategory = asyncHandler(async (req, res) => {
    const category = await ExamCategory.findById(req.params.id)

    if (!category) {
        res.status(400)
        throw new Error("Cette categorie d'examen n'existe pas")
    }

    const deletedCategory = await ExamCategory.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Categorie supprimée",
        categoryEx: deletedCategory
    })
})

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}