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
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    { timestamps: true }
)

const ExamTypeModel = mongoose.model('Exam_type', examTypeSchema);

module.exports = ExamTypeModel