const asyncHandler = require('express-async-handler')
const Counter = require("../models/counterModel")

const getNextExamNumber = async () => {
    const year = new Date().getFullYear().toString().slice(-2)

    const counter = await Counter.findOneAndUpdate(
         {key: `exam-${year}`},
         {$inc: {seq: 1}},
         {new: true, upsert: true}
    )

    const padded = String(counter.seq).padStart(6, '0')

    return `EX-${padded}-${year}`;
}

module.exports = getNextExamNumber