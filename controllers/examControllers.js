const asyncHandler = require("express-async-handler")
const Exam = require("../models/examModel")

const User = require('../models/userModel')

const getNextExamNumber = require('../utils/getNextExamNumber')

// Creer un examen
const createExam = asyncHandler(async (req, res) => {
    const { indication, technical, result, conclusion } = req.body

    if (!indication || !technical || !result || !conclusion) {
        res.status(400)
        throw new Error("Veuillez remplir tous les champs obligatoires !")
    }

    const userId = req.user._id

    const examNumber = await getNextExamNumber()

    const status = 'finished'

    const exam = await Exam.create(
        {
            exam_number: examNumber,
            indication,
            technical,
            result,
            conclusion,
            status: status,
            id_user: userId,
        }
    )

    res.status(201).json(
        {
            success: "Examen terminé avec succès",
            exam
        }
    )
})

// Modifier des examens
const updateExam = asyncHandler(async (req, res) => {
    const { indication, technical, result, conclusion } = req.body

    if (!indication || !technical || !result || !conclusion) {
        res.status(400)
        throw new Error("Veuillez remplir tous les champs obligatoires !")
    }

    const userId = req.user._id

    const updatedExam = await Exam.findByIdAndUpdate(
        req.params.id,
        {
            indication,
            technical,
            result,
            conclusion,
            status: 'finished',
            id_user: userId
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json({
        sucess: "Examen modifié avec succès",
        updatedExam
    })
})

// Supprimer examen
const deleteExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id)

    if(!exam)
    {
        res.status(404)
        throw new Error("Cet examen n'existe pas !")
    }

    const deletedExam = await Exam.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success: "Examen supprimé avec succès",
        deletedExam
    })
})

// Recuperer un unique examen
const getExam = asyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id)

    if(!exam)
    {
        res.status(404)
        throw new Error("Cet examen n'existe pas !")
    }

    res.status(200).json({
        exam
    })
})

// Recuperer tous les examens
const getAllExam = asyncHandler(async (req, res) => {
    const exam = await Exam.find()

    if(exam.length === 0)
    {
        res.status(404)
        throw new Error("Aucun examen!")
    }

    res.status(200).json({
        exam
    })
})

module.exports = {
    createExam,
    updateExam,
    deleteExam,
    getExam,
    getAllExam
}
