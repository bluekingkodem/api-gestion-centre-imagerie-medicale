const mongoose = require('mongoose')

const examCategorySchema = new mongoose.Schema(
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

const ExamCategoryModel = mongoose.model('Exam_category', examCategorySchema);

module.exports = ExamCategoryModel