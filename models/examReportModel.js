const mongoose = require('mongoose')

const examReportSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        indication: {
            type: String,
            required: true,
        },
        technical: {
            type: String,
            required: true,
        },
        result: {
            type: String,
            required: true,
        },
        conclusion: {
            type: String,
            required: true,
        },
        id_exam_category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam_category'
        },
        id_exam_type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exam_type'
        }
    },
    { timestamps: true }
)

const ExamReportModel = mongoose.model('Exam_report', examReportSchema);

module.exports = ExamReportModel