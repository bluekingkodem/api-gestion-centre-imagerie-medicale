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
    },
    { timestamps: true }
)

const ExamCategoryModel = mongoose.model('Exam_category', examCategorySchema);

module.exports = ExamCategoryModel