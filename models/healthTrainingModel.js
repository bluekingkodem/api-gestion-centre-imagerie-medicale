const mongoose = require('mongoose')

const healthTrainingSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            unique: true,
            // sparse: true, //permet d'avoir plusieurs null
            // default: 'formation sanitaire non spécifiée'
        },
        id_user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    },
    { timestamps: true }
)

const healthTrainingModel = mongoose.model('Health_training', healthTrainingSchema);

module.exports = healthTrainingModel