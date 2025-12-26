const asyncHandler = require('express-async-handler')
const ExamReport = require('../models/examReportModel')
const ExamType = require('../models/examTypeModel')
const ExamCategory = require('../models/examCategoryModel')

const { generateCodeExamReport } = require('../utils/generateCodeExam')

// Creer un modele de compte rendu d'examen
const createExamReport = asyncHandler(async (req, res) => {
    const { name, indication, technical, result, conclusion, examType, examCategory } = req.body

    if (!name || !indication || !technical || !result || !conclusion || !examCategory || !examType) {
        res.status(400)
        throw new Error('Veuillez renseigner tous les champs obligatoires')
    }

    const nameUpper = name.toUpperCase()
    const nameExamReportExist = await ExamReport.findOne({ name: nameUpper })

    if (nameExamReportExist) {
        res.status(400)
        throw new Error(`Le modèle de compte rendu d'examen ${name} existe déja !`)
    }

    const category = await ExamCategory.findOne({ name: examCategory })
    const type = await ExamType.findOne({ name: examType })

    const code = await generateCodeExamReport()
    const codeExist = await ExamReport.findOne({ code: code })

    if (codeExist) {
        res.status(400)
        throw new Error("Ce code existe déja !")
    }

    const userId = req.user._id

    const examReport = await ExamReport.create(
        {
            code: code,
            name: nameUpper,
            indication,
            technical,
            result,
            conclusion,
            id_exam_category: category._id,
            id_exam_type: type._id,
            id_user: userId
        }
    )

    res.status(201).json({
        success: "Modèle de compte rendu d'examen créé avec succès",
        examReport
    })

})

// Mettre a jour un modele de compte rendu d'examen
const updateExamReport = asyncHandler(async (req, res) => {
    const { name, indication, technical, result, conclusion, examType, examCategory } = req.body

    if (!name || !indication || !technical || !result || !conclusion || !examCategory || !examType) {
        res.status(400)
        throw new Error('Veuillez renseigner tous les champs obligatoires')
    }

    const nameUpper = name.toUpperCase()
    const nameExamReportExist = await ExamReport.findOne({ name: nameUpper })
    if (nameExamReportExist) {
        res.status(400)
        throw new Error(`Le modèle de compte rendu d'examen ${name} existe déja !`)
    }

    const category = await ExamCategory.findOne({ name: examCategory })
    const type = await ExamType.findOne({ name: examType })

    const examReportUpdated = await ExamReport.findByIdAndUpdate(
        req.params.id,
        {
            name: nameUpper,
            indication,
            technical,
            result,
            conclusion,
            id_exam_category: category._id,
            id_exam_type: type._id
        },
        { new: true }
    )

    res.status(200).json({
        success: "Modèle de compte rendu d'examen modifié avec succès",
        examReportUpdated
    })

})

// Supprimer un modele d'examen
const deleteExamReport = asyncHandler(async (req, res) => {
    const examReportExist = await ExamReport.findById(req.params.id)

    if (!examReportExist) {
        res.status(400)
        throw new Error("Ce modèle n'existe pas")
    }

    const examReportDeleted = await ExamReport.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Modèle supprimé avec succès",
        examReportDeleted
    })

})

// Afficher un unique modele d'examen
const getExamReport = asyncHandler(async (req, res) => {
    const examReport = ExamReport.findById(req.params.id)

    if(!examReport)
    {
        res.status(404)
        throw new Error("Ce modèle d'examen n'est pas disponible !")
    }

    res.status(200).json({
        examReport
    })
})

// Afficher tous les modeles d'examen
const getAllExamReport = asyncHandler(async (req, res) => {
    const examReport = ExamReport.find()

    if(examReport.length === 0)
    {
        res.status(404)
        throw new Error("Aucun modèle d'examen disponible !")
    }

    res.status(200).json({
        examReport
    })
})

module.exports = {
    createExamReport,
    updateExamReport,
    deleteExamReport,
    getExamReport, 
    getAllExamReport
}