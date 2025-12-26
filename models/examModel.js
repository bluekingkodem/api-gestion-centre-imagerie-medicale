const mongoose = require('mongoose')

const examSchema = new mongoose.Schema(
    {
        exam_number: {
            type: String,
            required: true,
            unique: true,
        },
        indication: {
            type: String,
            required: true,
            default: 'Bilan'
        },
        technical: {
            type: String,
            default: ""
        },
        result: {
            type: String,
            required: true,
        },
        conclusion: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['on hold', 'in progress', 'finished', 'canceled'],
            default: 'on hold'
        },
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        // id_exam_report: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Exam_report'
        // },
        // id_exam_category: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Exam_category'
        // },
        // id_exam_type: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Exam_type'
        // },
        // id_invoice: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Invoice'
        // },
    },
    { timestamps: true }
)

const ExamModel = mongoose.model('Exam', examSchema);

module.exports = ExamModel