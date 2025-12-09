const mongoose = require('mongoose')

const examTypeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    { timestamps: true }
)

const ExamTypeModel = mongoose.model('Exam_type', examTypeSchema);

module.exports = ExamTypeModel