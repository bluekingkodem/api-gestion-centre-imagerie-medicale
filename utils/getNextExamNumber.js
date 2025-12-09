const asyncHandler = require('express-async-handler')
const { findOneAndUpdate } = require('../models/examModel')

const getNextExamNumber = asyncHandler(async (req, res) => {
    const year = new Date().getFullYear().toString().slice(-2)

    const counter = await findOneAndUpdate(
         {key: `exam-${year}`},
         {$inc: {seq: 1}},
         {new: true, upsert: true}
    )

    const padded = String(counter.seq).padStart(6, '0')

    return `EX-${padded}-${year}`;
})

module.exports = getNextExamNumber