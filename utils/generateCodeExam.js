const ExamCategory = require('../models/examCategoryModel')
const ExamType = require('../models/examTypeModel')
const ExamReport = require('../models/examReportModel')

const generateCodeExamCategory = async () => {
    const countDoc = await ExamCategory.countDocuments()
    const codeCategory = String(countDoc + 1).padStart(4, '0')

    return codeCategory
}

const generateCodeExamType = async () => {
    const countDoc = await ExamType.countDocuments()
    const codeType = String(countDoc + 1).padStart(4, '0')

    return codeType
}

const generateCodeExamReport = async () => {
    const countDoc = await ExamReport.countDocuments()
    const codeExamReport = String(countDoc + 1).padStart(4, '0')

    return codeExamReport
}

module.exports = {
    generateCodeExamCategory,
    generateCodeExamType, 
    generateCodeExamReport
}