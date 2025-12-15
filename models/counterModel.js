const mongoose = require('mongoose')

const counterSchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    seq: {
       type: Number,
       default: 0
    }
})

const CounterModel = mongoose.model('Counter', counterSchema)

module.exports = CounterModel