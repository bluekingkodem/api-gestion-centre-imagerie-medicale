const mongoose = require('mongoose')

const disciplineSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            // upsert: true, 
            // default: 'discipline non spécifiée'
        }
    },
    { timestamps: true }
)

const disciplineModel = mongoose.model('Discipline', disciplineSchema);

module.exports = disciplineModel